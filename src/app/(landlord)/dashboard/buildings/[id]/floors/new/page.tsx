import { notFound } from "next/navigation";

import { getBuilding } from "@/actions/building/get-building";
import { createFloor } from "@/actions/floor/create-floor";
import { createFloorsBulk } from "@/actions/floor/create-floors-bulk";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";
import { FloorCreateForm } from "@/components/floor/floor-create-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewFloorPage({ params }: PageProps) {
  const { id } = await params;

  const building = await getBuilding(id);

  if (!building) {
    notFound();
  }

  async function createAction(formData: FormData) {
    "use server";

    await createFloor(id, formData);
  }

  async function bulkAction(formData: FormData) {
    "use server";

    await createFloorsBulk(id, formData);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings", href: "/dashboard/buildings" },
            { label: building.name, href: `/dashboard/buildings/${id}` },
            { label: "Floors", href: `/dashboard/buildings/${id}/floors` },
            { label: "Add Floor" },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}/floors`}
          label="Floors"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Add Floor</h1>

        <p className="text-muted-foreground">
          Add one floor, or create several at once, to {building.name}.
        </p>
      </div>

      <FloorCreateForm
        singleAction={createAction}
        bulkAction={bulkAction}
      />
    </div>
  );
}