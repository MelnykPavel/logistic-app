import { DataTable } from "@/components/data-table";
import { ServerLinkButton } from "@/components/ui/server-link-button";
import { myOrderColumns } from "@/constants/table-columns/my-orders-columns";
import { actionGetAllOrdersFull } from "@/server/actions/order/action-get-all-orders";
import { appRoutes } from "@/utils/appRoutes";

export default function MyOrdersPage() {
  const refreshKey = Date.now();
  return (
    <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start grow">
      <div className="flex w-full items-center justify-between">
        <span className="font-bold ">My Orders Directory</span>
        <ServerLinkButton href={appRoutes.order.create}>
          Add new
        </ServerLinkButton>
      </div>
      <DataTable
        columns={myOrderColumns}
        fetchDataAction={actionGetAllOrdersFull}
        refreshKey={refreshKey}
      />
    </div>
  );
}
