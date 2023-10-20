"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2, Eye, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import { Risk } from "@/types"
import useLangStore from "@/store/langagueStore"
import Link from "next/link"
import { riskStore } from "@/store/riskStore"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"
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
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {

  const data = useStore(riskStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.risk.remove.useMutation()
  const { user } = useUser()
  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  }, {
    enabled: false
  })
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem >
            <Link href={`/risk-register/${(row.original as Risk).id}`} className="w-full h-full flex flex-row items-center whitespace-nowrap">
              <Eye className="w-4 h-4 mr-2" />
              {
                dict?.view || "View"
              }
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            data?.setEditModalRisk(row.original as Risk)
            data?.setEditModalOpen(true)
          }}>
            <span className="flex flex-row items-center whitespace-nowrap">
              <Edit2 className="w-4 h-4 mr-2" />
              {
                dict?.edit || "Edit"
              }
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem >
              <span className="flex flex-row items-center whitespace-nowrap">
                <Trash2Icon className="w-4 h-4 mr-2" />
                {
                  dict?.delete || "Delete"
                }
              </span>
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this assessment scope?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {row.getValue("name")}&apos;s assessment and remove {row.getValue("name")}&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || risks.isLoading || risks.isRefetching || risks.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"
            onClick={() => {
              mutation.mutate(
                { id: (row.original as Risk).id },
                {
                  onSuccess: () => {
                    utils.risk.getAll.refetch().then(() => {
                      toast.success(dict?.riskDeletedSuccessfully || "Risk deleted successfully")
                      setOpen(false)
                    })
                  }
                }
              )
            }}
            disabled={mutation.isLoading || risks.isLoading || risks.isRefetching || risks.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !risks.isLoading && !risks.isRefetching && !risks.isFetching
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