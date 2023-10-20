"use client"


import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "@/components/risk-assessment/assessment-form"
import useLangStore from "@/store/langagueStore"
import { RiskForm, riskAssessmentScope } from "@/types"
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
    <Sheet open={riskAssessmentStore?.editModalOpen} onOpenChange={riskAssessmentStore?.setEditModalOpen}>
      <SheetContent >
        <SheetHeader className="pb-5">
          <SheetTitle>
            {
              dict?.updateRiskScope || "Update risk assessment scope"
            }
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full pb-10", className)}>
          <AssessmentForm assessmentScope={riskAssessmentStore?.editModalRiskAssessmentScope} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default EditAssessmentDialog