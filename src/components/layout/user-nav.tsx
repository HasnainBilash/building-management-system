"use client";

import { signOut } from "next-auth/react";

interface UserNavProps {
  name: string;
  role: string;
}

export function UserNav({
  name,
  role,
}: UserNavProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold">
          {name}
        </p>

        <p className="text-xs text-muted-foreground">
          {role}
        </p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
      >
        Logout
      </button>
    </div>
  );
}