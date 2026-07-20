"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import {
  registerUser,
  type RegisterState,
} from "@/actions/register";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: RegisterState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={pending}
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

export function RegisterForm() {
  const router = useRouter();

  const [state, formAction] = useActionState(
    registerUser,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      {state.errors?.general && (
        <p className="text-sm text-red-500">
          {state.errors.general[0]}
        </p>
      )}

      {state.success && (
        <p className="text-sm text-green-600 font-medium">
          {state.message}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>

        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state.values?.name}
          required
        />

        {state.errors?.name && (
          <p className="text-sm text-red-500">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          defaultValue={state.values?.email}
          required
        />

        {state.errors?.email && (
          <p className="text-sm text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          required
        />

        {state.errors?.password && (
          <p className="text-sm text-red-500">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
        />

        {state.errors?.confirmPassword && (
          <p className="text-sm text-red-500">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Account Type</Label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="LANDLORD"
              defaultChecked={state.values?.role !== "TENANT"}
            />
            <span>Landlord</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="TENANT"
              defaultChecked={state.values?.role === "TENANT"}
            />
            <span>Tenant</span>
          </label>
        </div>

        {state.errors?.role && (
          <p className="text-sm text-red-500">
            {state.errors.role[0]}
          </p>
        )}
      </div>

      <SubmitButton />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}