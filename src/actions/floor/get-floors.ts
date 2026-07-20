"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getFloors(buildingId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return prisma.floor.findMany({
    where: {
      buildingId,
      deletedAt: null,
      building: {
        ownerId: session.user.id,
      },
    },
    orderBy: {
      floorNumber: "asc",
    },
    include: {
      flats: {
        where: {
          deletedAt: null,
        },
        select: {
          status: true,
        },
      },
    },
  });
}
