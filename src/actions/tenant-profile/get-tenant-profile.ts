"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getTenantProfile() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "TENANT") {
    return null;
  }

  return prisma.tenantProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });
}