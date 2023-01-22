import { MarkerType } from "@prisma/client";
import z from "zod";

export const addMarkerSchema = z.object({
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
  diedDate: z.date(),
  contractStarted: z.date().nullish(),
  contractEnd: z.date().nullish(),
  lng: z.number(),
  lat: z.number(),
  markerType: z.nativeEnum(MarkerType),
  apartmentRow: z.string().nullable(),
  apartmentColumn: z.string().nullable(),
  familyNumber: z.string().nullable(),
  familyAddress: z.string().nullable(),
  contactName: z.string().nullable(),
});

export const updateMarkerSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  middleName: z.string().nullable(),
  lastName: z.string(),
  diedDate: z.date(),
  contractStarted: z.date().nullish(),
  contractEnd: z.date().nullish(),
  lng: z.number(),
  lat: z.number(),
  markerType: z.nativeEnum(MarkerType),
  apartmentRow: z.string().nullable(),
  apartmentColumn: z.string().nullable(),
  familyNumber: z.string().nullable(),
  familyAddress: z.string().nullable(),
  contactName: z.string().nullable(),
  status: z.boolean().nullable(),
});

export const deleteMarkerSchema = z.object({
  id: z.number(),
});

export const searchMarkerSchema = z.object({
  searchInput: z.string().nullable(),
});

export type AddMarkerInput = z.TypeOf<typeof addMarkerSchema>;

export type UpdateMarkerInput = z.TypeOf<typeof updateMarkerSchema>;

export type DeleteMarkerInput = z.TypeOf<typeof deleteMarkerSchema>;

export type SearchMarkerInput = z.TypeOf<typeof searchMarkerSchema>;
