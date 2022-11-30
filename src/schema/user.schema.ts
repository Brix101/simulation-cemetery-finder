import { UserType } from "@prisma/client";
import z from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  contactNo: z.string().nullable(),
  address: z.string().nullish(),
  birthDate: z.date(),
  userType: z.nativeEnum(UserType),
});

export const searchUserSchema = z.object({
  name: z.string().optional(),
});

export const updateUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  contactNo: z.string(),
  address: z.string(),
  birthDate: z.date(),
  userType: z.nativeEnum(UserType),
});

export const deleteUserSchema = z.object({
  id: z.number(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export type SearchUserInput = z.TypeOf<typeof searchUserSchema>;

export type UpdateUserInput = z.TypeOf<Omit<typeof updateUserSchema, "id">>;

export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>;

export type ChangePasswordInput = z.TypeOf<typeof changePasswordSchema>;
