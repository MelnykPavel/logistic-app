import { ServerLinkButton } from "@/components/ui/server-link-button";

import { DataTable } from "@/components/data-table";
import { warehouseColumns } from "@/constants/table-columns/warehouse-columns";
import { actionGetAllWarehouses } from "@/server/actions/warehouse/action-get-all-warehouses";
import { appRoutes } from "@/utils/appRoutes";

export default async function WarehousePage() {
  const refreshKey = Date.now();
  return (
    <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start grow">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold ">Warehouse Directory</span>
        <ServerLinkButton href={appRoutes.warehouse.create}>
          Add new
        </ServerLinkButton>
      </div>
      <DataTable
        columns={warehouseColumns}
        fetchDataAction={actionGetAllWarehouses}
        refreshKey={refreshKey}
      />
    </div>
  );
}
