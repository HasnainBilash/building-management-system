"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createFlatSchema } from "@/lib/validations/flat";

import { ActionResult } from "@/types/action-result";

export async function updateFlat(
  id: string,
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

  const values = {
    flatNumber: formData.get("flatNumber"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    monthlyRent: formData.get("monthlyRent"),
    status: formData.get("status") || "VACANT",
  };

  const parsed = createFlatSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  let result;

  try {
    result = await prisma.flat.updateMany({
      where: {
        id,
        deletedAt: null,
        floor: {
          building: {
            ownerId: session.user.id,
          },
        },
      },
      data: {
        flatNumber: parsed.data.flatNumber,
        bedrooms: parsed.data.bedrooms,
        bathrooms: parsed.data.bathrooms,
        monthlyRent: parsed.data.monthlyRent,
        status: parsed.data.status,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "A flat with this number already exists on this floor.",
        errors: {
          flatNumber: ["This flat number is already in use."],
        },
      };
    }

    throw error;
  }

  if (result.count === 0) {
    return {
      success: false,
      message: "Flat not found.",
      errors: {},
    };
  }

  redirect(
    `/dashboard/buildings/${buildingId}/floors/${floorId}/flats/${id}`
  );
}
