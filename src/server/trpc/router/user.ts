import {
  createUserSchema,
  deleteUserSchema,
  searchUserSchema,
  updateUserSchema,
} from "@/schema/user.schema";
import { hashPassword } from "@/utils/passwordUtils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  getAll: publicProcedure
    .input(searchUserSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: input.name ?? "" } },
            { middleName: { contains: input.name ?? "" } },
            { lastName: { contains: input.name ?? "" } },
          ],
        },
        orderBy: {
          lastName: "asc",
        },
      });
    }),
  addUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          birthDate,
          contactNo,
          email,
          firstName,
          lastName,
          middleName,
          password,
          userType,
          address,
        } = input;

        const newUser = await ctx.prisma.user.create({
          data: {
            address,
            birthDate,
            contactNo,
            email,
            firstName,
            lastName,
            middleName,
            userType,
            password: await hashPassword({ password }),
          },
        });

        return newUser;
      } catch (e) {
        console.log(e);
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }
        }
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          id,
          birthDate,
          contactNo,
          email,
          firstName,
          lastName,
          middleName,
          userType,
          address,
        } = input;

        const updatedUser = await ctx.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            address,
            birthDate,
            contactNo,
            email,
            firstName,
            lastName,
            middleName,
            userType,
          },
        });

        return updatedUser;
      } catch (e) {
        console.log(e);
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  deleteUser: publicProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.prisma.user.delete({
          where: {
            id: id,
          },
        });

        return { message: "Delete success" };
      } catch (e) {
        console.log(e);

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
