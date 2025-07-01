"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthContext";
import { EntityKey } from "@/types/utils";
import { appRoutes } from "@/utils/appRoutes";
import { MoreHorizontal, Pencil, ScanSearch, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type DropdownActionsProps = {
  id: string;
  entity: EntityKey;
  deleteAction?: (id: string) => void;
};

export default function DropdownActions({
  id,
  entity,
  deleteAction,
}: DropdownActionsProps) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { isManager } = useAuth();

  const handleConfirm = () => {
    setConfirmOpen(false);
    if (!deleteAction) return;

    deleteAction(id);
  };
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <Link href={appRoutes[entity].view(id)}>
            <DropdownMenuItem>
              <ScanSearch className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
          </Link>
          {isManager && (
            <>
              <DropdownMenuSeparator />

              <Link href={appRoutes[entity].edit(id)}>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setConfirmOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
