import { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";

type TenantLayoutProps = {
  children: ReactNode;
};

export default function TenantLayout({ children }: TenantLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AppHeader />
      <main className="mx-auto max-w-2xl p-8">{children}</main>
    </div>
  );
}