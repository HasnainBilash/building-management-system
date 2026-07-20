"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteFloor } from "@/actions/floor/delete-floor";

import { Button } from "@/components/ui/button";

type DeleteFloorButtonProps = {
  floorId: string;
  buildingId: string;
};

export function DeleteFloorButton({
  floorId,
  buildingId,
}: DeleteFloorButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this floor?\n\nThis action can be reversed later by an administrator."
    );

    if (!confirmed) return;

    setIsPending(true);

    const result = await deleteFloor(floorId);

    setIsPending(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.replace(`/dashboard/buildings/${buildingId}/floors`);
  }

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete Floor"}
    </Button>
  );
}
