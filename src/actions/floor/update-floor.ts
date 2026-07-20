"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createFloorSchema } from "@/lib/validations/floor";

import { ActionResult } from "@/types/action-result";

export async function updateFloor(
  id: string,
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

  const values = {
    floorNumber: formData.get("floorNumber"),
    name: formData.get("name"),
  };

  const parsed = createFloorSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  let result;

  try {
    result = await prisma.floor.updateMany({
      where: {
        id,
        deletedAt: null,
        building: {
          ownerId: session.user.id,
        },
      },
      data: {
        floorNumber: parsed.data.floorNumber,
        name: parsed.data.name || null,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "A floor with this number already exists in this building.",
        errors: {
          floorNumber: ["This floor number is already in use."],
        },
      };
    }

    throw error;
  }

  if (result.count === 0) {
    return {
      success: false,
      message: "Floor not found.",
      errors: {},
    };
  }

  redirect(`/dashboard/buildings/${buildingId}/floors/${id}`);
}
