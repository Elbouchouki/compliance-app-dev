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
import useUserStore from "@/store/userStore"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { User } from "@clerk/nextjs/server"
import { trpc } from "@/app/_trpc/client"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {


  const userStore = useStore(useUserStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const mutation = trpc.user.remove.useMutation()
  const utils = trpc.useContext();
  const dict = langStore?.getDictionary()


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
      <DropdownMenuContent align={
        langStore?.rtl ? "start" : "end"
      }>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => {
            userStore?.setEditModalUser(row.original as User)
            userStore?.setEditModalOpen(true)
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
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => mutation.mutate(row.original as User, {
            onSuccess: () => {
              utils.user.getAll.refetch().then(() => {
                toast.success(dict?.userDeletedSuccessfully || "User deleted successfully")
              })
            }
          })
          }>
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