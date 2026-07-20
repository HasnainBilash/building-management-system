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
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";

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
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings", href: "/dashboard/buildings" },
            { label: building.name },
          ]}
        />

        <BackLink href="/dashboard/buildings" label="Buildings" />
      </div>

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
          <Link href={`/dashboard/buildings/${building.id}/floors`}>
            <Button variant="outline">
              Manage Floors
            </Button>
          </Link>

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

            <Link
              href={`/dashboard/buildings/${building.id}/floors`}
              className="font-semibold hover:underline"
            >
              {building.floors.length}
            </Link>
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