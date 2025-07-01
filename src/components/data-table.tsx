"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/data-table-pagination";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  fetchDataAction: (
    page: number,
    size?: number,
    query?: string,
  ) => Promise<{ data: TData[]; total: number }>;
  refreshKey: number;
};

export function DataTable<TData, TValue>({
  columns,
  fetchDataAction,
  refreshKey,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [tblData, setTblData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);

  const [isPending, startTransition] = useTransition();

  const loadData = useCallback(
    async (pageIndex: number, pageSize: number) => {
      startTransition(async () => {
        const { data, total } = await fetchDataAction(pageIndex + 1, pageSize);
        setTblData(data);
        setTotal(total);
      });
    },
    [fetchDataAction, setTblData, setTotal],
  );

  useEffect(() => {
    loadData(pageIndex, pageSize);
  }, [pageIndex, pageSize, refreshKey, loadData]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: tblData,
    columns,
    pageCount: total,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <>
      <div className="w-full overflow-hidden grow flex rounded-md">
        <div className="border w-full h-fit rounded-md">
          <Table>
            <TableHeader className="bg-black/20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isPending ? "Loading..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </>
  );
}
