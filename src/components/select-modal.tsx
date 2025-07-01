"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

type FetchDataAction<T> = (
  page: number,
  size?: number,
  query?: string,
) => Promise<{ data: T[]; total: number }>;

type SelectModalProps<T> = {
  trigger: ReactNode;
  title: string;
  description?: string;
  fetchDataAction: FetchDataAction<T>;
  onSelectAction: (data: T) => void;
  primaryLabelKey?: keyof T;
  secondaryLabelKey?: keyof T;
};

export function SelectModal<
  T extends { id: string | number; [key: string]: unknown },
>({
  trigger,
  title,
  description,
  fetchDataAction,
  onSelectAction,
  primaryLabelKey = "name",
  secondaryLabelKey = "email",
}: SelectModalProps<T>) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  const loadItems = useCallback(
    (page: number, size: number, query = "") => {
      startTransition(() => {
        fetchDataAction(page, size, query)
          .then((res) => {
            setData(res.data);
            setTotalPages(res.total);
          })
          .catch(console.error);
      });
    },
    [fetchDataAction, setData, setTotalPages],
  );

  useEffect(() => {
    if (open) {
      loadItems(page, 10, query);
    } else {
      setData([]);
      setSelectedItem(null);
      setQuery("");
      setPage(1);
      setConfirming(false);
    }
  }, [open, page, query, loadItems]);

  useEffect(() => {
    if (open) {
      loadItems(page, 10, query);
    }
  }, [open, page, query, loadItems]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
    loadItems(1, 10, e.target.value);
  };

  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setConfirming(true);
  };

  const confirmSelection = () => {
    if (selectedItem) {
      onSelectAction(selectedItem);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          <Input
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            className="mb-2"
          />
          <ScrollArea className="h-64 pr-2">
            <div className="space-y-2">
              {data.length > 0 ? (
                data.map((item) => (
                  <Button
                    key={item.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleSelect(item)}
                  >
                    {`${String(item[primaryLabelKey])} ${String(item[secondaryLabelKey])}`}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  {isPending ? "Loading..." : "No items found."}
                </p>
              )}
            </div>
          </ScrollArea>
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || isPending}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || isPending}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title="Confirm Selection"
        item={selectedItem}
        renderMessage={(item) => {
          if (!item) return null;
          return (
            <p>
              Are you sure you want to select
              <strong>
                {`${String(item[primaryLabelKey])} ${String(item[secondaryLabelKey])}`}
              </strong>
              ?
            </p>
          );
        }}
        onCancel={() => setConfirming(false)}
        onConfirm={confirmSelection}
      />
    </>
  );
}
