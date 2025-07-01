import { DataTable } from "@/components/data-table";
import { ServerLinkButton } from "@/components/ui/server-link-button";
import { clientColumns } from "@/constants/table-columns/client-columns";
import { actionGetAllClients } from "@/server/actions/client/action-get-all-clients";
import { appRoutes } from "@/utils/appRoutes";

export default async function ClientPage() {
  const refreshKey = Date.now();

  return (
    <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start grow">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold ">Client Directory</span>
        <ServerLinkButton href={appRoutes.client.create}>
          Add new
        </ServerLinkButton>
      </div>
      <DataTable
        columns={clientColumns}
        fetchDataAction={actionGetAllClients}
        refreshKey={refreshKey}
      />
    </div>
  );
}
