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
import usePolicyStore from "@/store/policyStore"
import PolicyForm from "@/components/policies/policy-form"
import useLangStore from "@/store/langagueStore"

const EditPolicyDialog = ({
  className,
}: {
  className?: string
}) => {

  const policyStore = useStore(usePolicyStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    policyStore?.setEditModalOpen(false)
    policyStore?.setEditModalPolicy(undefined)
    toast.success(
      dict?.policyUpdatedSuccessfully || "Policy updated successfully"
    )
  }

  return (
    <Dialog open={policyStore?.editModalOpen} onOpenChange={policyStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1 mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editPolicy || "Edit Policy"
              }
            </span>
            <span>
              {policyStore?.editModalPolicy?.id.substring(0, 8)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <PolicyForm policy={policyStore?.editModalPolicy} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditPolicyDialog