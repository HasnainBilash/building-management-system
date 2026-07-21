import { notFound } from "next/navigation";

import { getBuilding } from "@/actions/building/get-building";
import { quickSetupBuilding } from "@/actions/quick-setup/quick-setup-building";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BackLink } from "@/components/ui/back-link";
import { QuickSetupForm } from "@/components/building/quick-setup-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuickSetupPage({ params }: PageProps) {
  const { id } = await params;

  const building = await getBuilding(id);

  if (!building) {
    notFound();
  }

  async function setupAction(formData: FormData) {
    "use server";

    await quickSetupBuilding(id, formData);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Buildings", href: "/dashboard/buildings" },
            { label: building.name, href: `/dashboard/buildings/${id}` },
            { label: "Quick Setup" },
          ]}
        />

        <BackLink
          href={`/dashboard/buildings/${id}`}
          label={building.name}
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Quick Setup</h1>

        <p className="text-muted-foreground">
          Generate floors and flats for {building.name} all at once.
        </p>
      </div>

      <QuickSetupForm action={setupAction} />
    </div>
  );
}