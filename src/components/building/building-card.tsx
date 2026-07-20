import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BuildingCardProps = {
  building: {
    id: string;
    name: string;
    address: string;
    city: string;
  };
};

export function BuildingCard({ building }: BuildingCardProps) {
  return (
    <Link href={`/dashboard/buildings/${building.id}`}>
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <CardTitle>{building.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>{building.address}</p>

          <p className="text-muted-foreground">
            {building.city}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}