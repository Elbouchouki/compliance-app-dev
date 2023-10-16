"use client"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "@/components/risk-register/risk-form"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"

const EditRiskDialog = ({
  className,
}: {
  className?: string
}) => {

  const riskStoreTools = useStore(riskStore, state => state);

  const langStore = useStore(useLangStore, state => state)

  function onSubmit() {
    riskStoreTools?.setEditModalOpen(false)
    toast.success("Risk updated successfully")
  }

  return (
    <Dialog open={riskStoreTools?.editModalOpen} onOpenChange={riskStoreTools?.setEditModalOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            <span>
              {"Update risk"}
            </span>
            <span>
              {" " + riskStoreTools?.editModalRisk?.riskName}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full h-[480px] overflow-y-auto p-4", className)}>
          <AssessmentForm risk={riskStoreTools?.editModalRisk} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditRiskDialog