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
import AssessmentForm from "@/components/risk-assessment/assessment-form"
import useLangStore from "@/store/langagueStore"
import { RiskForm } from "@/types"
import useRiskAssessmentScopeStore from "@/store/riskAssessementScopeStore"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"

const EditAssessmentDialog = ({
  className,
}: {
  className?: string
}) => {

  const riskAssessmentStore = useStore(useRiskAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit() {
    riskAssessmentStore?.setEditModalOpen(false)
    riskAssessmentStore?.setEditModalRiskAssessmentScope(undefined)
    toast.success(dict?.riskAssessmentUpdatedSuccessful || "Risk Assessment scope updated successfully")
  }

  return (
    <Dialog open={riskAssessmentStore?.editModalOpen} onOpenChange={riskAssessmentStore?.setEditModalOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            <span>
              {
                dict?.updateRiskScope || "Update risk assessment scope"
              }
            </span>
            <span>
              {" " + riskAssessmentStore?.editModalRiskAssessmentScope?.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <AssessmentForm assessmentScope={riskAssessmentStore?.editModalRiskAssessmentScope} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAssessmentDialog