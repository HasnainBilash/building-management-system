import { z } from "zod";

export const tenantProfileSchema = z.object({
  occupation: z
    .string()
    .trim()
    .max(100, "Occupation is too long.")
    .optional()
    .or(z.literal("")),

  nationalId: z
    .string()
    .trim()
    .max(50, "National ID is too long.")
    .optional()
    .or(z.literal("")),

  emergencyContact: z
    .string()
    .trim()
    .max(100, "Emergency contact is too long.")
    .optional()
    .or(z.literal("")),
});

export type TenantProfileInput = z.infer<typeof tenantProfileSchema>;