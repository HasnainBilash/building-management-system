import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type BackLinkProps = {
  href: string;
  label?: string;
};

export function BackLink({ href, label = "Back" }: BackLinkProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" size="sm">
        <ArrowLeft />
        {label}
      </Button>
    </Link>
  );
}
