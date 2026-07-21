"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { quickSetupSchema } from "@/lib/validations/quick-setup";

import { ActionResult } from "@/types/action-result";

const MAX_FLOORS = 100;
const MAX_TOTAL_FLATS = 500;

export async function quickSetupBuilding(
  buildingId: string,
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

  const building = await prisma.building.findFirst({
    where: {
      id: buildingId,
      ownerId: session.user.id,
      deletedAt: null,
    },
  });

  if (!building) {
    return {
      success: false,
      message: "Building not found.",
      errors: {},
    };
  }

  const values = {
    fromFloor: formData.get("fromFloor"),
    toFloor: formData.get("toFloor"),
    flatsPerFloor: formData.get("flatsPerFloor"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    monthlyRent: formData.get("monthlyRent"),
    status: formData.get("status") || "VACANT",
  };

  const parsed = quickSetupSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    fromFloor,
    toFloor,
    flatsPerFloor,
    bedrooms,
    bathrooms,
    monthlyRent,
    status,
  } = parsed.data;

  const floorCount = toFloor - fromFloor + 1;

  if (floorCount > MAX_FLOORS) {
    return {
      success: false,
      message: `You can generate at most ${MAX_FLOORS} floors at once.`,
      errors: {
        toFloor: ["This range is too large."],
      },
    };
  }

  if (floorCount * flatsPerFloor > MAX_TOTAL_FLATS) {
    return {
      success: false,
      message: `This would create ${
        floorCount * flatsPerFloor
      } flats, above the ${MAX_TOTAL_FLATS} limit for a single Quick Setup. Try a smaller floor range or fewer flats per floor.`,
      errors: {
        flatsPerFloor: ["Too many flats would be generated."],
      },
    };
  }

  const floorNumbers = Array.from(
    { length: floorCount },
    (_, index) => fromFloor + index
  );

  await prisma.$transaction(async (tx) => {
    for (const floorNumber of floorNumbers) {
      const floor = await tx.floor.upsert({
        where: {
          buildingId_floorNumber: {
            buildingId,
            floorNumber,
          },
        },
        update: {},
        create: {
          buildingId,
          floorNumber,
        },
      });

      const flatNumbers = Array.from(
        { length: flatsPerFloor },
        (_, index) => String(floorNumber * 100 + index + 1)
      );

      await tx.flat.createMany({
        data: flatNumbers.map((flatNumber) => ({
          flatNumber,
          bedrooms,
          bathrooms,
          monthlyRent,
          status,
          floorId: floor.id,
        })),
        skipDuplicates: true,
      });
    }
  });

  redirect(`/dashboard/buildings/${buildingId}/floors`);
}