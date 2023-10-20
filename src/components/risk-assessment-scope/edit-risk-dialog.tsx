"use client"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "./risk-form"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"

const EditRiskSheet = () => {

  const riskStoreTools = useStore(riskStore, state => state);

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()

  const risks = trpc.risk.getByUserId.useQuery({
    userId: user?.id || "",
    riskScopeId: riskStoreTools?.editModalRisk?.riskAssessmentScopeId || ""
  }, {
    enabled: false
  })

  function onSubmit() {
    riskStoreTools?.setEditModalOpen(false)
    riskStoreTools?.setEditModalRisk(undefined)
    toast.success(dict?.riskUpdatedSuccessful || "Risk updated successfully")
    risks.refetch()
  }

  return (
    <Sheet open={riskStoreTools?.editModalOpen} onOpenChange={riskStoreTools?.setEditModalOpen}>
      <SheetContent >
        <SheetHeader>
          <SheetTitle>
            {
              dict?.updateRisk || "Update Risk"
            }
          </SheetTitle>
        </SheetHeader>
        <AssessmentForm risk={riskStoreTools?.editModalRisk} onSubmit={onSubmit} formType="edit" />
      </SheetContent>
    </Sheet>
  )
}
export default EditRiskSheet