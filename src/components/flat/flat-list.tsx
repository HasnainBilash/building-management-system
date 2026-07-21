import { FlatCard } from "./flat-card";

type Flat = {
  id: string;
  flatNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number | string;
  status: "VACANT" | "OCCUPIED" | "MAINTENANCE";
};

type FlatListProps = {
  buildingId: string;
  floorId: string;
  flats: Flat[];
};

export function FlatList({ buildingId, floorId, flats }: FlatListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {flats.map((flat) => (
        <FlatCard
          key={flat.id}
          buildingId={buildingId}
          floorId={floorId}
          flat={flat}
        />
      ))}
    </div>
  );
}
