import Link from "next/link";
import { notFound } from "next/navigation";

import { getFlat } from "@/actions/flat/get-flat";
import { DeleteFlatButton } from "@/components/flat/delete-flat-button";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    floorId: string;
    flatId: string;
  }>;
};

const statusVariant = {
  VACANT: "outline",
  OCCUPIED: "default",
  MAINTENANCE: "secondary",
} as const;

export default async function FlatDetailsPage({ params }: PageProps) {
  const { id, floorId, flatId } = await params;

  const flat = await getFlat(flatId);

  if (!flat || flat.floorId !== floorId || flat.floor.buildingId !== id) {
    notFound();
  }

  const floorLabel = flat.floor.name || `Floor ${flat.floor.floorNumber}`;

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
            { label: `Flat ${flat.flatNumber}` },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}/floors/${floorId}/flats`}
          label="Flats"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Flat {flat.flatNumber}</h1>
          <Badge variant={statusVariant[flat.status]}>{flat.status}</Badge>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/buildings/${id}/floors/${floorId}/flats/${flat.id}/edit`}
          >
            <Button>Edit Flat</Button>
          </Link>

          <DeleteFlatButton
            flatId={flat.id}
            buildingId={id}
            floorId={floorId}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Bedrooms</p>
            <p className="font-semibold">{flat.bedrooms}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Bathrooms</p>
            <p className="font-semibold">{flat.bathrooms}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Monthly Rent</p>
            <p className="font-semibold">
              ${Number(flat.monthlyRent).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-semibold">{flat.status}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
