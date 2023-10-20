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
import { Edit2, Eye, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import usePolicyStore from "@/store/policyStore"
import { Policy } from "@/types"
import Link from "next/link"
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
import { useUser } from "@clerk/nextjs"
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {


  const policyStore = useStore(usePolicyStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const mutation = trpc.policy.remove.useMutation()
  const utils = trpc.useContext();
  const { user } = useUser()
  const policies = trpc.policy.getAll.useQuery({
    userId: user?.id || ""
  }, {
    enabled: false
  })


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
          <Link href={`/policies/${(row.original as Policy).id}`}>
            <DropdownMenuItem >
              <span className={cn("w-full h-full gap-2 flex flex-row items-center whitespace-nowrap", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <Eye className="w-4 h-4" />
                <span>
                  {
                    dict?.view || "View"
                  }
                </span>
              </span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })} onClick={() => {
            policyStore?.setEditModalPolicy(row.original as Policy)
            policyStore?.setEditModalOpen(true)
          }}>
            <span className={cn("flex flex-row items-center whitespace-nowrap gap-2", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <Edit2 className="w-4 h-4" />
              <span>
                {
                  dict?.edit || "Edit"
                }
              </span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem className={cn("flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })} >
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
            Are you sure you want to delete this policy?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete  {row.getValue("name")}&apos;s evidence and remove {row.getValue("name")}&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || policies.isLoading || policies.isRefetching || policies.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"

            onClick={() => mutation.mutate((row.original as Policy), {
              onSuccess: () => {
                utils.policy.getAll.refetch().then(() => {
                  setOpen(false)
                  toast.success(dict?.policyDeletedSuccessfully || "Policy deleted successfully")
                })
              },
            })}
            disabled={mutation.isLoading || policies.isLoading || policies.isRefetching || policies.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !policies.isLoading && !policies.isRefetching && !policies.isFetching
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