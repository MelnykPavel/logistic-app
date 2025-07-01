import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";

type ConfirmDialogProps<T = unknown> = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  pending?: boolean;
  title?: string;
  item?: T;
  description?: string;
  renderMessage?: (item: T) => ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog<T = unknown>({
  open,
  onOpenChange,
  pending,
  title = "Confirm Action",
  description,
  item,
  renderMessage,
  onCancel,
  onConfirm,
}: ConfirmDialogProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {renderMessage && item ? (
          <div>{renderMessage(item)}</div>
        ) : (
          <p>{description}</p>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button onClick={onConfirm}>
            {pending ? (
              <>
                <Loader2Icon className="animate-spin mr-2" />
                Please wait
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
