"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { FloorForm } from "./floor-form";
import { FloorBulkForm } from "./floor-bulk-form";

type FloorCreateFormProps = {
  singleAction: (formData: FormData) => void | Promise<void>;
  bulkAction: (formData: FormData) => void | Promise<void>;
};

export function FloorCreateForm({
  singleAction,
  bulkAction,
}: FloorCreateFormProps) {
  return (
    <Tabs defaultValue="single">
      <TabsList>
        <TabsTrigger value="single">Single Floor</TabsTrigger>
        <TabsTrigger value="multiple">Multiple Floors</TabsTrigger>
      </TabsList>

      <TabsContent value="single" className="pt-4">
        <FloorForm action={singleAction} submitText="Create Floor" />
      </TabsContent>

      <TabsContent value="multiple" className="pt-4">
        <FloorBulkForm action={bulkAction} />
      </TabsContent>
    </Tabs>
  );
}