"use server";

import CardWrapper from "@/components/card-wrapper";
import ClientForm from "@/components/forms/client-form";
import getById from "@/server/actions/client/action-get-one-client";
import { redirect } from "next/navigation";

export default async function ViewClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getById(id);
  if (!client) redirect("/");

  return (
    <CardWrapper title="View Client Information">
      <ClientForm type={"view"} client={client} />
    </CardWrapper>
  );
}
