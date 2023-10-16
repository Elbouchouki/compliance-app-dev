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
        <DropdownMenuItem onClick={() => {
          mutation.mutate(
            { id: (row.original as Risk).id },
            {
              onSuccess: () => {
                utils.risk.getAll.refetch()
              }
            }
          )
          toast.success("Risk deleted successfully")
        }}>
          <span className="flex flex-row items-center whitespace-nowrap">
            <Trash2Icon className="w-4 h-4 mr-2" />
            {
              dict?.delete || "Delete"
            }
          </span>
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}