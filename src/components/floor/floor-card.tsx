import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FloorCardProps = {
  floor: {
    id: string;
    buildingId: string;
    floorNumber: number;
    name: string | null;
    flats: {
      status: "VACANT" | "OCCUPIED" | "MAINTENANCE";
    }[];
  };
};

export function FloorCard({ floor }: FloorCardProps) {
  const totalFlats = floor.flats.length;

  const occupied = floor.flats.filter(
    (flat) => flat.status === "OCCUPIED"
  ).length;

  const vacant = floor.flats.filter(
    (flat) => flat.status === "VACANT"
  ).length;

  const maintenance = floor.flats.filter(
    (flat) => flat.status === "MAINTENANCE"
  ).length;

  return (
    <Link
      href={`/dashboard/buildings/${floor.buildingId}/floors/${floor.id}`}
    >
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>
            {floor.name || `Floor ${floor.floorNumber}`}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {totalFlats} {totalFlats === 1 ? "Flat" : "Flats"}
          </Badge>

          {totalFlats > 0 && (
            <>
              <Badge variant="outline">{occupied} Occupied</Badge>
              <Badge variant="outline">{vacant} Vacant</Badge>

              {maintenance > 0 && (
                <Badge variant="outline">{maintenance} Maintenance</Badge>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
