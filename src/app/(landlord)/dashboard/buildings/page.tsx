import Link from "next/link";

import { getBuildings } from "@/actions/building/get-buildings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";
import { BuildingList } from "@/components/building/building-list";

export default async function BuildingsPage() {
  const buildings = await getBuildings();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings" },
          ]}
        />

        <BackLink href="/dashboard" label="Dashboard" />
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Buildings</h1>
        <Link href="/dashboard/buildings/new">
          <Button>
            Add Building
          </Button>
        </Link>
      </div>

      {buildings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            You haven't created any buildings yet.
          </CardContent>
        </Card>
      ) : (
        <BuildingList buildings={buildings} />
      )}
    </div>
  );
}