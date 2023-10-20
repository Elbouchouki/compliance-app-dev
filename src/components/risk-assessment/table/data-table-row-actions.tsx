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
import { AssessmentScope, RiskAssessmentScope } from "@/types"
import useLangStore from "@/store/langagueStore"
import Link from "next/link"
import { cn } from "@/lib/utils"
import useRiskAssessmentScopeStore from "@/store/riskAssessementScopeStore"
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
import { Icons } from "@/components/icons"
interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {

  const riskAssessmentStore = useStore(useRiskAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.riskAssessmentScope.remove.useMutation()
  const { user } = useUser()
  const risks = trpc.riskAssessmentScope.getAll.useQuery({
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
        <DropdownMenuContent align={
          langStore?.rtl ? "start" : "end"
        }>
          <DropdownMenuItem
            className={cn("flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })}
          >
            <Link href={`/risk-assessment/${(row.original as AssessmentScope).id}`} className={cn("w-full h-full gap-2 flex flex-row items-center whitespace-nowrap", {
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
              riskAssessmentStore?.setEditModalRiskAssessmentScope(row.original as RiskAssessmentScope)
              riskAssessmentStore?.setEditModalOpen(true)
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
            <DropdownMenuItem
              className={cn("flex flex-row items-center", {
                "flex-row-reverse": langStore?.rtl
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
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this assessment?
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
                { id: (row.original as RiskAssessmentScope).id || "" },
                {
                  onSuccess: () => {
                    utils.riskAssessmentScope.getAll.refetch().then(() => {
                      toast.success(dict?.assessmentDeletedSuccessfully || "Assessment deleted successfully")
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