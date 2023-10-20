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
import useTagStore from "@/store/tagStore"
import { Tag } from "@/types"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
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

  const tagStore = useStore(useTagStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const utils = trpc.useContext();
  const mutation = trpc.tag.remove.useMutation()
  const { user } = useUser()
  const tags = trpc.tag.getAll.useQuery({
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
        <DropdownMenuContent align={
          langStore?.rtl ? "start" : "end"
        }>
          <DropdownMenuItem
            className={cn("flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })} onClick={() => {
              tagStore?.setEditModalTag(row.original as Tag)
              tagStore?.setEditModalOpen(true)
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
            Are you sure you want to delete this tag ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete  {row.getValue("name")}&apos;s from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || tags.isLoading || tags.isRefetching || tags.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"

            onClick={() =>
              mutation.mutate((row.original as Tag), {
                onSuccess: () => {
                  utils.tag.getAll.refetch().then(() => {
                    setOpen(false)
                    toast.success(dict?.tagDeletedSuccessfully || "Tag deleted successfully")
                  })
                }
              })
            }
            disabled={mutation.isLoading || tags.isLoading || tags.isRefetching || tags.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !tags.isLoading && !tags.isRefetching && !tags.isFetching
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