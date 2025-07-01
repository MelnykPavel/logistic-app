"use server";

import CardWrapper from "@/components/card-wrapper";
import ClientForm from "@/components/forms/client-form";

export default async function CreateClientPage() {
  return (
    <CardWrapper title="Create New Client">
      <ClientForm type={"create"} />
    </CardWrapper>
  );
}
