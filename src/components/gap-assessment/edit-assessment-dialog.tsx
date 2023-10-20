"use client"


import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Sheet as _Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "@/components/gap-assessment/assessment-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore"
import useLangStore from "@/store/langagueStore"

const Sheet = ({
  className,
}: {
  className?: string
}) => {

  const assessmentStore = useStore(useAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit() {
    assessmentStore?.setEditModalOpen(false)
    assessmentStore?.setEditModalAssessmentScope(undefined)
    toast.success(dict?.assessmentUpdatedSuccessful || "Assessment scope updated successfully")
  }

  return (
    <_Sheet open={assessmentStore?.editModalOpen} onOpenChange={assessmentStore?.setEditModalOpen}>
      <SheetContent >
        <SheetHeader className="mb-4">

          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.updateAssessment || "Update assessment scope"
            }
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full pb-10", className)}>
          <AssessmentForm assessmentScope={assessmentStore?.editModalAssessmentScope} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </_Sheet>
  )
}
export default Sheet