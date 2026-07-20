import { ReactNode } from "react";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-muted/30">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}