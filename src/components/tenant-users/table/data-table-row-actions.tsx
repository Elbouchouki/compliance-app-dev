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
import { Icons } from "@/components/icons"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {

  const userStore = useStore(useUserStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const mutation = trpc.user.remove.useMutation()
  const users = trpc.user.getAll.useQuery(undefined, {
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
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem
              className={cn("flex flex-row items-center focus:bg-destructive focus:text-destructive-foreground", {
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
            Are you sure you want to delete this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete  {row.getValue("firstName")} {row.getValue("lastName")}&apos;s account
            and remove {row.getValue("firstName")} {row.getValue("lastName")}&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || users.isLoading || users.isRefetching || users.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"
            onClick={() => mutation.mutate(row.original as User, {
              onSuccess: () => {
                utils.user.getAll.refetch().then(() => {
                  setOpen(false)
                  toast.success(dict?.userDeletedSuccessfully || "User deleted successfully")
                })
              }
            })}
            disabled={mutation.isLoading || users.isLoading || users.isRefetching || users.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !users.isLoading && !users.isRefetching && !users.isFetching
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