import { BuildingCard } from "./building-card";

type Building = {
  id: string;
  name: string;
  address: string;
  city: string;
};

type BuildingListProps = {
  buildings: Building[];
};

export function BuildingList({
  buildings,
}: BuildingListProps) {
  return (
    <div className="grid gap-6">
      {buildings.map((building) => (
        <BuildingCard
          key={building.id}
          building={building}
        />
      ))}
    </div>
  );
}