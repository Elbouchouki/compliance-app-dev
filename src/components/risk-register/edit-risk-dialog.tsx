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
import AssessmentForm from "@/components/risk-register/risk-form"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"

const EditRiskDialog = ({
  className,
  refresh
}: {
  className?: string
  refresh?: () => void

}) => {

  const riskStoreTools = useStore(riskStore, state => state);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    riskStoreTools?.setEditModalOpen(false)
    toast.success(dict?.riskUpdatedSuccessful || "Risk updated successfully")
    refresh?.()
  }

  return (
    <Sheet open={riskStoreTools?.editModalOpen} onOpenChange={riskStoreTools?.setEditModalOpen}>
      <SheetContent className="w-full" >
        <SheetHeader>
          <SheetTitle className={cn({
            "text-right": langStore?.rtl
          })}>
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
export default EditRiskDialog