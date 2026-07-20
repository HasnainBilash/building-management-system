"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { ActionResult } from "@/types/action-result";

export async function deleteBuilding(
  id: string
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
      errors: {},
    };
  }

  const result = await prisma.building.updateMany({
    where: {
      id,
      ownerId: session.user.id,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      message: "Building not found.",
      errors: {},
    };
  }

  return {
    success: true,
    message: "Building deleted successfully.",
    errors: {},
  };
}