"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import { FlatForm } from "./flat-form";
import { FlatBulkForm } from "./flat-bulk-form";

type FlatCreateFormProps = {
  singleAction: (formData: FormData) => void | Promise<void>;
  bulkAction: (formData: FormData) => void | Promise<void>;
};

export function FlatCreateForm({
  singleAction,
  bulkAction,
}: FlatCreateFormProps) {
  return (
    <Card className="shadow-xl">
      <CardContent className="p-8">
        <Tabs defaultValue="single" className="gap-6">
          <TabsList className="mx-auto h-9 rounded-full bg-muted p-1">
            <TabsTrigger value="single" className="rounded-full px-5">
              Single
            </TabsTrigger>

            <TabsTrigger value="multiple" className="rounded-full px-5">
              Multiple
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <FlatForm action={singleAction} submitText="Create Flat" />
          </TabsContent>

          <TabsContent value="multiple">
            <FlatBulkForm action={bulkAction} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}