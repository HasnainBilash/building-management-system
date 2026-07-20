import { notFound } from "next/navigation";

import { getBuilding } from "@/actions/building/get-building";
import { updateBuilding } from "@/actions/building/update-building";

import { BuildingForm } from "@/components/building/building-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBuildingPage({
  params,
}: PageProps) {
  const { id } = await params;

  const building = await getBuilding(id);

  if (!building) {
    notFound();
  }

  async function updateAction(formData: FormData) {
    "use server";

    await updateBuilding(id, formData);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Building
        </h1>

        <p className="text-muted-foreground">
          Update the building information.
        </p>
      </div>

      <BuildingForm
        action={updateAction}
        submitText="Save Changes"
        defaultValues={{
          name: building.name,
          address: building.address,
          city: building.city,
          postcode: building.postcode,
          country: building.country,
          description: building.description,
        }}
      />
    </div>
  );
}