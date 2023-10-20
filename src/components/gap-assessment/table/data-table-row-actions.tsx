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

  const assessmentStore = useStore(useAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.assessment.remove.useMutation()
  const utils = trpc.useContext()
  const { user } = useUser()
  const assessments = trpc.assessment.getAllAssessments.useQuery({
    userId: user?.id
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
            Are you sure you want to delete this assessment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {(row.original as AssessmentScope).name}&apos;s assessment and remove {(row.original as AssessmentScope).name}&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={mutation.isLoading || assessments.isLoading || assessments.isRefetching || assessments.isFetching}
          >Cancel</AlertDialogCancel>
          <Button variant="destructive"
            onClick={() => mutation.mutate({ id: (row.original as AssessmentScope).id },
              {
                onSuccess: () => {
                  utils.assessment.getAllAssessments.refetch().then(() => {
                    setOpen(false)
                    toast.success(dict?.assessmentDeletedSuccessfully || "Assessment deleted successfully")
                  })
                }
              }
            )}
            disabled={mutation.isLoading || assessments.isLoading || assessments.isRefetching || assessments.isFetching}
            className={cn("flex flex-row items-center gap-2", {
              "text-right  w-10": langStore?.rtl
            })}
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !assessments.isLoading && !assessments.isRefetching && !assessments.isFetching
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