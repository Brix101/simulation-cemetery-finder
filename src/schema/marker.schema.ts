import { MarkerType } from "@prisma/client";
import z from "zod";

export const addMarkerSchema = z.object({
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  bornDate: z.date(),
  diedDate: z.date(),
  lng: z.number(),
  lat: z.number(),
  markerType: z.nativeEnum(MarkerType),
  apartmentRow: z.number().nullable(),
  apartmentColumn: z.number().nullable(),
});

export const updateMarkerSchema = z.object({
  id: z.number(),
  firstName: z.string().nullable(),
  middleName: z.string().nullable(),
  lastName: z.string().nullable(),
  bornDate: z.date(),
  diedDate: z.date(),
  lng: z.number(),
  lat: z.number(),
  markerType: z.nativeEnum(MarkerType),
  apartmentRow: z.number().nullable(),
  apartmentColumn: z.number().nullable(),
});

export const deleteMarkerSchema = z.object({
  id: z.number(),
});

export type AddMarkerInput = z.TypeOf<typeof addMarkerSchema>;

export type UpdateMarkerInput = z.TypeOf<typeof updateMarkerSchema>;

export type DeleteMarkerInput = z.TypeOf<typeof deleteMarkerSchema>;
