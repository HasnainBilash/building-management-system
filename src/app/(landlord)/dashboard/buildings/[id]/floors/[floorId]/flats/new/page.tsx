import { notFound } from "next/navigation";

import { getFloor } from "@/actions/floor/get-floor";
import { createFlat } from "@/actions/flat/create-flat";
import { createFlatsBulk } from "@/actions/flat/create-flats-bulk";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";
import { FlatCreateForm } from "@/components/flat/flat-create-form";

type PageProps = {
  params: Promise<{
    id: string;
    floorId: string;
  }>;
};

export default async function NewFlatPage({ params }: PageProps) {
  const { id, floorId } = await params;

  const floor = await getFloor(floorId);

  if (!floor || floor.buildingId !== id) {
    notFound();
  }

  const floorLabel = floor.name || `Floor ${floor.floorNumber}`;

  async function createAction(formData: FormData) {
    "use server";

    await createFlat(id, floorId, formData);
  }

  async function bulkAction(formData: FormData) {
    "use server";

    await createFlatsBulk(id, floorId, formData);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings", href: "/dashboard/buildings" },
            { label: floor.building.name, href: `/dashboard/buildings/${id}` },
            { label: "Floors", href: `/dashboard/buildings/${id}/floors` },
            {
              label: floorLabel,
              href: `/dashboard/buildings/${id}/floors/${floorId}`,
            },
            {
              label: "Flats",
              href: `/dashboard/buildings/${id}/floors/${floorId}/flats`,
            },
            { label: "Add Flat" },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}/floors/${floorId}/flats`}
          label="Flats"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Add Flat</h1>

        <p className="text-muted-foreground">
          Add one flat, or create several at once, to {floorLabel}.
        </p>
      </div>

      <FlatCreateForm
        singleAction={createAction}
        bulkAction={bulkAction}
      />
    </div>
  );
}