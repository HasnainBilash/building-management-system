"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createFloorSchema } from "@/lib/validations/floor";

import { ActionResult } from "@/types/action-result";

export async function createFloor(
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

  let floor;

  try {
    floor = await prisma.floor.create({
      data: {
        floorNumber: parsed.data.floorNumber,
        name: parsed.data.name || null,
        buildingId,
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

  redirect(`/dashboard/buildings/${buildingId}/floors/${floor.id}`);
}
