"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { ActionResult } from "@/types/action-result";

export async function deleteFloor(id: string): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
      errors: {},
    };
  }

  const result = await prisma.floor.updateMany({
    where: {
      id,
      deletedAt: null,
      building: {
        ownerId: session.user.id,
      },
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "Floor not found.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Floor deleted successfully.",
    errors: {},
  };
}
