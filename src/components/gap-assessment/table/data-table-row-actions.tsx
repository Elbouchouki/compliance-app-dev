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
import useAssessmentScopeStore from "@/store/assessmentScopeStore"
import useLangStore from "@/store/langagueStore"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { AssessmentScope } from "@prisma/client"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {

  const assessmentStore = useStore(useAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.assessment.remove.useMutation()
  const utils = trpc.useContext()

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
        >
          <Link href={`/gap-assessment/${(row.original as AssessmentScope).id}`} className={cn("w-full h-full gap-2 flex flex-row items-center whitespace-nowrap", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Eye className="w-4 h-4" />
            <span>
              {
                dict?.view || "View"
              }
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => {
            assessmentStore?.setEditModalAssessmentScope(row.original as AssessmentScope)
            assessmentStore?.setEditModalOpen(true)
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
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => mutation.mutate({ id: (row.original as AssessmentScope).id },
            {
              onSuccess: () => {
                utils.assessment.getAllAssessments.refetch()
                toast.success(dict?.assessmentDeletedSuccessfully || "Assessment deleted successfully")
              }
            }
          )}>
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