"use client"


import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "@/components/gap-assessment/assessment-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore"
import useLangStore from "@/store/langagueStore"

const EditAssessmentDialog = ({
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
    <Dialog open={assessmentStore?.editModalOpen} onOpenChange={assessmentStore?.setEditModalOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            <span>
              {
                dict?.updateAssessment || "Update assessment scope"
              }
            </span>
            <span>
              {" " + assessmentStore?.editModalAssessmentScope?.id.substring(0, 8)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <AssessmentForm assessmentScope={assessmentStore?.editModalAssessmentScope} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditAssessmentDialog