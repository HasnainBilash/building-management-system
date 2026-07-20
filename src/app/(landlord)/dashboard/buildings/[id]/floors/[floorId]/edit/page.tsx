import { notFound } from "next/navigation";

import { getFloor } from "@/actions/floor/get-floor";
import { updateFloor } from "@/actions/floor/update-floor";

import { FloorForm } from "@/components/floor/floor-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";

type PageProps = {
  params: Promise<{
    id: string;
    floorId: string;
  }>;
};

export default async function EditFloorPage({ params }: PageProps) {
  const { id, floorId } = await params;

  const floor = await getFloor(floorId);

  if (!floor || floor.buildingId !== id) {
    notFound();
  }

  const floorLabel = floor.name || `Floor ${floor.floorNumber}`;

  async function updateAction(formData: FormData) {
    "use server";

    await updateFloor(floorId, id, formData);
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
            { label: "Edit" },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}/floors/${floorId}`}
          label={floorLabel}
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Edit Floor</h1>

        <p className="text-muted-foreground">
          Update the floor information for {floor.building.name}.
        </p>
      </div>

      <FloorForm
        action={updateAction}
        submitText="Save Changes"
        defaultValues={{
          floorNumber: floor.floorNumber,
          name: floor.name,
        }}
      />
    </div>
  );
}