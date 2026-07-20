import { createBuilding } from "@/actions/building/create-building";

import { BuildingForm } from "@/components/building/building-form";

export default function NewBuildingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Building
        </h1>

        <p className="text-muted-foreground">
          Add a new building to your portfolio.
        </p>
      </div>

      <BuildingForm
        action={createBuilding}
        submitText="Create Building"
      />
    </div>
  );
}