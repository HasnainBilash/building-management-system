"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createFlatsBulkSchema } from "@/lib/validations/flat";

import { ActionResult } from "@/types/action-result";

const MAX_BULK_FLATS = 100;

export async function createFlatsBulk(
  buildingId: string,
  floorId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
      errors: {},
    };
  }

  const floor = await prisma.floor.findFirst({
    where: {
      id: floorId,
      deletedAt: null,
      building: {
        id: buildingId,
        ownerId: session.user.id,
      },
    },
  });

  if (!floor) {
    return {
      success: false,
      message: "Floor not found.",
      errors: {},
    };
  }

  const values = {
    fromFlatNumber: formData.get("fromFlatNumber"),
    toFlatNumber: formData.get("toFlatNumber"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    monthlyRent: formData.get("monthlyRent"),
    status: formData.get("status") || "VACANT",
  };

  const parsed = createFlatsBulkSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    fromFlatNumber,
    toFlatNumber,
    bedrooms,
    bathrooms,
    monthlyRent,
    status,
  } = parsed.data;

  const flatCount = toFlatNumber - fromFlatNumber + 1;

  if (flatCount > MAX_BULK_FLATS) {
    return {
      success: false,
      message: `You can create at most ${MAX_BULK_FLATS} flats at once.`,
      errors: {
        toFlatNumber: ["This range is too large."],
      },
    };
  }

  const flatNumbers = Array.from({ length: flatCount }, (_, index) =>
    String(fromFlatNumber + index)
  );

  await prisma.flat.createMany({
    data: flatNumbers.map((flatNumber) => ({
      flatNumber,
      bedrooms,
      bathrooms,
      monthlyRent,
      status,
      floorId,
    })),
    skipDuplicates: true,
  });

  redirect(`/dashboard/buildings/${buildingId}/floors/${floorId}/flats`);
}