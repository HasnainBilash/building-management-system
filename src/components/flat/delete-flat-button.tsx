"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteFlat } from "@/actions/flat/delete-flat";

import { Button } from "@/components/ui/button";

type DeleteFlatButtonProps = {
  flatId: string;
  buildingId: string;
  floorId: string;
};

export function DeleteFlatButton({
  flatId,
  buildingId,
  floorId,
}: DeleteFlatButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flat?\n\nThis action can be reversed later by an administrator."
    );

    if (!confirmed) return;

    setIsPending(true);

    const result = await deleteFlat(flatId);

    setIsPending(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    router.replace(
      `/dashboard/buildings/${buildingId}/floors/${floorId}/flats`
    );
  }

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete Flat"}
    </Button>
  );
}
