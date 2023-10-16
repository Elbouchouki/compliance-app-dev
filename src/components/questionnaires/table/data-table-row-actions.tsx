"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Eye, MoreHorizontal, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useQuestionnaireStore from "@/store/questionnaireStore";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const questionnaireStore = useStore(useQuestionnaireStore, (state) => state);
  const langStore = useStore(useLangStore, (state) => state);
  const dict = langStore?.getDictionary();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={langStore?.rtl ? "start" : "end"}>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl,
          })}
          onClick={() => {
            questionnaireStore?.setQuestionnaire(row.original);
            questionnaireStore?.setViewModalOpen(true);
          }}
        >
          <span
            className={cn(
              "flex flex-row items-center whitespace-nowrap gap-2",
              {
                "flex-row-reverse": langStore?.rtl,
              }
            )}
          >
            <Eye className="w-4 h-4" />
            <span>{dict?.view || "View"}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl,
          })}
          onClick={() => {
            questionnaireStore?.setQuestionnaire(row.original);
            questionnaireStore?.setEditModalOpen(true);
          }}
        >
          <span
            className={cn(
              "flex flex-row items-center whitespace-nowrap gap-2",
              {
                "flex-row-reverse": langStore?.rtl,
              }
            )}
          >
            <Edit2 className="w-4 h-4" />
            <span>{dict?.edit || "Edit"}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl,
          })}
          onClick={() => {
            questionnaireStore?.removeQuestionnaire(row.original);
            toast.success(
              dict?.questionnaireDeletedSuccessfully ||
                "Questionnaire deleted successfully"
            );
          }}
        >
          <span
            className={cn(
              "flex flex-row items-center whitespace-nowrap gap-2",
              {
                "flex-row-reverse": langStore?.rtl,
              }
            )}
          >
            <Trash2Icon className="w-4 h-4" />
            <span>{dict?.delete || "Delete"}</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
