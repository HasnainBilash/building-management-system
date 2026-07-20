import Link from "next/link";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          BMS
        </h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">

        <Link
          href="/dashboard"
          className="rounded-lg px-3 py-2 hover:bg-muted"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/buildings"
          className="rounded-lg px-3 py-2 hover:bg-muted"
        >
          Buildings
        </Link>

        <Link
          href="/dashboard/flats"
          className="rounded-lg px-3 py-2 hover:bg-muted"
        >
          Flats
        </Link>

        <Link
          href="/dashboard/tenants"
          className="rounded-lg px-3 py-2 hover:bg-muted"
        >
          Tenants
        </Link>

        <Link
          href="/dashboard/payments"
          className="rounded-lg px-3 py-2 hover:bg-muted"
        >
          Payments
        </Link>

      </nav>
    </aside>
  );
}