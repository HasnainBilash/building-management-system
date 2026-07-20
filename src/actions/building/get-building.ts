"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getBuilding(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.building.findFirst({
    where: {
      id,
      ownerId: session.user.id,
      deletedAt: null,
    },
    include: {
      floors: true,
      notices: true,
    },
  });
}