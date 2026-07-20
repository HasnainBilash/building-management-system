import { z } from "zod";

export const createFloorSchema = z.object({
  floorNumber: z.coerce
    .number()
    .int("Floor number must be a whole number.")
    .min(-5, "Floor number is too low.")
    .max(200, "Floor number is too high."),

  name: z
    .string()
    .trim()
    .max(100, "Floor name is too long.")
    .optional()
    .or(z.literal("")),
});

export type CreateFloorInput = z.infer<typeof createFloorSchema>;

export const createFloorsBulkSchema = z
  .object({
    fromFloor: z.coerce
      .number()
      .int("From floor must be a whole number.")
      .min(-5, "Floor number is too low.")
      .max(200, "Floor number is too high."),

    toFloor: z.coerce
      .number()
      .int("To floor must be a whole number.")
      .min(-5, "Floor number is too low.")
      .max(200, "Floor number is too high."),
  })
  .refine((data) => data.toFloor >= data.fromFloor, {
    message: "The ending floor must be greater than or equal to the starting floor.",
    path: ["toFloor"],
  });

export type CreateFloorsBulkInput = z.infer<typeof createFloorsBulkSchema>;
