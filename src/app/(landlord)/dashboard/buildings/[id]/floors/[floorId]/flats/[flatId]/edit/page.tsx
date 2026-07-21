import { notFound } from "next/navigation";

import { getFlat } from "@/actions/flat/get-flat";
import { updateFlat } from "@/actions/flat/update-flat";

import { FlatForm } from "@/components/flat/flat-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";

type PageProps = {
  params: Promise<{
    id: string;
    floorId: string;
    flatId: string;
  }>;
};

export default async function EditFlatPage({ params }: PageProps) {
  const { id, floorId, flatId } = await params;

  const flat = await getFlat(flatId);

  if (!flat || flat.floorId !== floorId || flat.floor.buildingId !== id) {
    notFound();
  }

  const floorLabel = flat.floor.name || `Floor ${flat.floor.floorNumber}`;

  async function updateAction(formData: FormData) {
    "use server";

    await updateFlat(flatId, id, floorId, formData);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings", href: "/dashboard/buildings" },
            { label: flat.floor.building.name, href: `/dashboard/buildings/${id}` },
            { label: "Floors", href: `/dashboard/buildings/${id}/floors` },
            {
              label: floorLabel,
              href: `/dashboard/buildings/${id}/floors/${floorId}`,
            },
            {
              label: "Flats",
              href: `/dashboard/buildings/${id}/floors/${floorId}/flats`,
            },
            {
              label: `Flat ${flat.flatNumber}`,
              href: `/dashboard/buildings/${id}/floors/${floorId}/flats/${flatId}`,
            },
            { label: "Edit" },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}/floors/${floorId}/flats/${flatId}`}
          label={`Flat ${flat.flatNumber}`}
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Edit Flat</h1>

        <p className="text-muted-foreground">
          Update the flat information for {floorLabel}.
        </p>
      </div>

      <FlatForm
        action={updateAction}
        submitText="Save Changes"
        defaultValues={{
          flatNumber: flat.flatNumber,
          bedrooms: flat.bedrooms,
          bathrooms: flat.bathrooms,
          monthlyRent: Number(flat.monthlyRent),
          status: flat.status,
        }}
      />
    </div>
  );
}
