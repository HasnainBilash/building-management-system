"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { upsertTenantProfile } from "@/actions/tenant-profile/upsert-tenant-profile";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ActionResult, initialActionState } from "@/types/action-result";

type TenantProfileFormProps = {
  defaultValues: {
    occupation: string;
    nationalId: string;
    emergencyContact: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Saving..." : "Save Profile"}
    </Button>
  );
}

export function TenantProfileForm({
  defaultValues,
}: TenantProfileFormProps) {
  const [state, formAction] = useActionState(
    async (_prevState: ActionResult, formData: FormData) =>
      upsertTenantProfile(formData),
    initialActionState
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <p
          className={
            state.success
              ? "text-sm font-medium text-green-600"
              : "text-sm text-red-500"
          }
        >
          {state.message}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation</Label>

        <Input
          id="occupation"
          name="occupation"
          placeholder="Software Engineer"
          defaultValue={defaultValues.occupation}
        />

        {state.errors?.occupation && (
          <p className="text-sm text-red-500">
            {state.errors.occupation[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationalId">National ID</Label>

        <Input
          id="nationalId"
          name="nationalId"
          placeholder="National ID number"
          defaultValue={defaultValues.nationalId}
        />

        {state.errors?.nationalId && (
          <p className="text-sm text-red-500">
            {state.errors.nationalId[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyContact">Emergency Contact</Label>

        <Input
          id="emergencyContact"
          name="emergencyContact"
          placeholder="Name and phone number"
          defaultValue={defaultValues.emergencyContact}
        />

        {state.errors?.emergencyContact && (
          <p className="text-sm text-red-500">
            {state.errors.emergencyContact[0]}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}