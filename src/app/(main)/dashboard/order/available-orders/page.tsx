import { DataTable } from "@/components/data-table";
import { availableOrderColumns } from "@/constants/table-columns/available-orders-columns";
import { actionGetAvailableOrders } from "@/server/actions/order/action-get-all-orders";

export default async function MyOrdersPage() {
  const refreshKey = Date.now();
  return (
    <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start grow">
      <div className="flex w-full items-center justify-start">
        <span className="font-bold ">Available Orders Directory</span>
      </div>
      <DataTable
        columns={availableOrderColumns}
        fetchDataAction={actionGetAvailableOrders}
        refreshKey={refreshKey}
      />
    </div>
  );
}
