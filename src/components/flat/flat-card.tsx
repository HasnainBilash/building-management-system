import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FlatCardProps = {
  buildingId: string;
  floorId: string;
  flat: {
    id: string;
    flatNumber: string;
    bedrooms: number;
    bathrooms: number;
    monthlyRent: number | string;
    status: "VACANT" | "OCCUPIED" | "MAINTENANCE";
  };
};

const statusVariant = {
  VACANT: "outline",
  OCCUPIED: "default",
  MAINTENANCE: "secondary",
} as const;

export function FlatCard({ buildingId, floorId, flat }: FlatCardProps) {
  return (
    <Link
      href={`/dashboard/buildings/${buildingId}/floors/${floorId}/flats/${flat.id}`}
    >
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Flat {flat.flatNumber}</CardTitle>

          <Badge variant={statusVariant[flat.status]}>{flat.status}</Badge>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>
            {flat.bedrooms} bed · {flat.bathrooms} bath
          </span>

          <span>·</span>

          <span>${Number(flat.monthlyRent).toFixed(2)}/mo</span>
        </CardContent>
      </Card>
    </Link>
  );
}
