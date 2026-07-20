"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getFloor(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.floor.findFirst({
    where: {
      id,
      deletedAt: null,
      building: {
        ownerId: session.user.id,
      },
    },
    include: {
      building: true,
      flats: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          flatNumber: "asc",
        },
      },
    },
  });
}
