"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { ActionResult } from "@/types/action-result";

export async function deleteFlat(id: string): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
      errors: {},
    };
  }

  const result = await prisma.flat.updateMany({
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
      deletedAt: new Date(),
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "Flat not found.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Flat deleted successfully.",
    errors: {},
  };
}
