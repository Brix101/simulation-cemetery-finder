import {
  addMarkerSchema,
  deleteMarkerSchema,
  updateMarkerSchema,
} from "@/schema/marker.schema";
import * as trpc from "@trpc/server";
import { publicProcedure, router } from "../trpc";

export const markerRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.marker.findMany({
      orderBy: {
        lastName: "asc",
      },
    });
  }),
  addMarker: publicProcedure
    .input(addMarkerSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          apartmentColumn,
          apartmentRow,
          bornDate,
          diedDate,
          firstName,
          lastName,
          lat,
          lng,
          markerType,
          middleName,
        } = input;

        const newMarker = await ctx.prisma.marker.create({
          data: {
            firstName: firstName ?? "",
            middleName: middleName ?? "",
            lastName: lastName ?? "",
            bornDate: bornDate,
            diedDate: diedDate,
            lng: lng,
            lat: lat,
            markerType: markerType,
            apartmentColumn: apartmentColumn,
            apartmentRow: apartmentRow,
          },
        });

        return newMarker;
      } catch (e) {
        console.log(e);

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  updateMarker: publicProcedure
    .input(updateMarkerSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const {
          id,
          apartmentColumn,
          apartmentRow,
          bornDate,
          diedDate,
          firstName,
          lastName,
          lat,
          lng,
          markerType,
          middleName,
        } = input;

        const updatedMarker = await ctx.prisma.marker.update({
          where: {
            id: id,
          },
          data: {
            firstName: firstName ?? "",
            middleName: middleName ?? "",
            lastName: lastName ?? "",
            bornDate: bornDate,
            diedDate: diedDate,
            lng: lng,
            lat: lat,
            markerType: markerType,
            apartmentColumn: apartmentColumn,
            apartmentRow: apartmentRow,
          },
        });

        return updatedMarker;
      } catch (e) {
        console.log(e);

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  deleteMarker: publicProcedure
    .input(deleteMarkerSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.prisma.marker.delete({
          where: {
            id: id,
          },
        });

        return { msd: "Delete success" };
      } catch (e) {
        console.log(e);

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
