import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Card className="shadow-xl">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
}