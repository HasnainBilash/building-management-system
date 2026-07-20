"use server";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { createBuildingSchema } from "@/lib/validations/building";

import { ActionResult } from "@/types/action-result";

export async function createBuilding(
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
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postcode: formData.get("postcode"),
    country: formData.get("country"),
    description: formData.get("description"),
  };

  const parsed = createBuildingSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const building = await prisma.building.create({
    data: {
      name: parsed.data.name,
      address: parsed.data.address,
      city: parsed.data.city,
      postcode: parsed.data.postcode || null,
      country: parsed.data.country,
      description: parsed.data.description || null,
      ownerId: session.user.id,
    },
  });

  redirect(`/dashboard/buildings/${building.id}`);
}