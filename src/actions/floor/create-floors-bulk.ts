"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createFloorsBulkSchema } from "@/lib/validations/floor";

import { ActionResult } from "@/types/action-result";

const MAX_BULK_FLOORS = 100;

export async function createFloorsBulk(
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
  };

  const parsed = createFloorsBulkSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { fromFloor, toFloor } = parsed.data;
  const floorCount = toFloor - fromFloor + 1;

  if (floorCount > MAX_BULK_FLOORS) {
    return {
      success: false,
      message: `You can create at most ${MAX_BULK_FLOORS} floors at once.`,
      errors: {
        toFloor: ["This range is too large."],
      },
    };
  }

  const floorNumbers = Array.from(
    { length: floorCount },
    (_, index) => fromFloor + index
  );

  await prisma.floor.createMany({
    data: floorNumbers.map((floorNumber) => ({
      floorNumber,
      buildingId,
    })),
    skipDuplicates: true,
  });

  redirect(`/dashboard/buildings/${buildingId}/floors`);
}
