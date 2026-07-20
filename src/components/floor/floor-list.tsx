import { FloorCard } from "./floor-card";

type Floor = {
  id: string;
  buildingId: string;
  floorNumber: number;
  name: string | null;
  flats: {
    status: "VACANT" | "OCCUPIED" | "MAINTENANCE";
  }[];
};

type FloorListProps = {
  floors: Floor[];
};

export function FloorList({ floors }: FloorListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {floors.map((floor) => (
        <FloorCard key={floor.id} floor={floor} />
      ))}
    </div>
  );
}
