"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import useEvidenceStore from "@/store/evidenceStore"
import { Evidence } from "@/types"
import { cn } from "@/lib/utils"
import useLangStore from "@/store/langagueStore"
import { trpc } from "@/app/_trpc/client"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/components/icons"
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {


  const evidenceStore = useStore(useEvidenceStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const evidences = trpc.evidence.getAll.useQuery(undefined, {
    enabled: false
  })

  const mutation = trpc.evidence.remove.useMutation()
  const utils = trpc.useContext();

  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={
          langStore?.rtl ? "start" : "end"
        }>
          <DropdownMenuItem
            className={cn("flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })}
            onClick={() => {
              evidenceStore?.setEditModalEvidence(row.original as Evidence)
              evidenceStore?.setEditModalOpen(true)
            }}>
            <span className={cn("flex flex-row items-center whitespace-nowrap gap-2", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <Edit2 className="w-4 h-4" />
              {
                dict?.edit || "Edit"
              }
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem
              className={cn("flex flex-row items-center", {
                "flex-row-reverse": langStore?.rtl
              })}
            >
              <span className={cn("flex flex-row items-center whitespace-nowrap gap-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <Trash2Icon className="w-4 h-4" />
                <span>
                  {
                    dict?.delete || "Delete"
                  }
                </span>
              </span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>


      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this evidence?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete  {row.getValue("name")}&apos;s evidence and remove {row.getValue("name")}&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || evidences.isLoading || evidences.isRefetching || evidences.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"

            onClick={() => mutation.mutate((row.original as Evidence), {
              onSuccess: () => {
                utils.evidence.getAll.refetch().then(() => {
                  setOpen(false)
                  toast.success(dict?.evidenaceDeletedSuccessfully || "Evidence deleted successfully")
                })
              }
            })
            }
            disabled={mutation.isLoading || evidences.isLoading || evidences.isRefetching || evidences.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !evidences.isLoading && !evidences.isRefetching && !evidences.isFetching
            })} />
            <span>
              {
                dict?.delete || "Delete"
              }
            </span>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  )
}