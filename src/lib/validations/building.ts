import { z } from "zod";

export const createBuildingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Building name must be at least 2 characters.")
    .max(100, "Building name is too long."),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .max(255, "Address is too long."),

  city: z
    .string()
    .trim()
    .min(2, "City is required.")
    .max(100, "City name is too long."),

  postcode: z
    .string()
    .trim()
    .max(20, "Postcode is too long.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .default("Bangladesh"),

  description: z
    .string()
    .trim()
    .max(1000, "Description is too long.")
    .optional()
    .or(z.literal("")),
});

export type CreateBuildingInput = z.infer<typeof createBuildingSchema>;