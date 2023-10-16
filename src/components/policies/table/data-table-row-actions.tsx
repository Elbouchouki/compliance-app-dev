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
  return (
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
        <DropdownMenuItem className={cn("flex flex-row items-center", {
          "flex-row-reverse": langStore?.rtl
        })} onClick={() => mutation.mutate((row.original as Policy), {
          onSuccess: () => {
            utils.policy.getAll.refetch().then(() => {
              policyStore?.setEditModalOpen(true)
              toast.success(dict?.policyDeletedSuccessfully || "Policy deleted successfully")
            })
          },
        })}>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}