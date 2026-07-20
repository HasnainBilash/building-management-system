import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteBuildingButton } from "@/components/building/delete-building-button";
import { getBuilding } from "@/actions/building/get-building";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BuildingDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const building = await getBuilding(id);

  if (!building) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {building.name}
          </h1>

          <p className="text-muted-foreground">
            {building.address}, {building.city}
          </p>
        </div>

        <div className="flex gap-3">
          <Link href={`/dashboard/buildings/${building.id}/edit`}>
            <Button>
              Edit Building
            </Button>
          </Link>

          <DeleteBuildingButton
            buildingId={building.id}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <p className="font-semibold">
              {building.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Floors
            </p>

            <p className="font-semibold">
              {building.floors.length}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Notices
            </p>

            <p className="font-semibold">
              {building.notices.length}
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}