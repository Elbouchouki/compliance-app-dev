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
import usePolicyStore from "@/store/policyStore"
import PolicyForm from "@/components/policies/policy-form"
import useLangStore from "@/store/langagueStore"

const EditPolicySheet = ({
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
    <Sheet open={policyStore?.editModalOpen} onOpenChange={policyStore?.setEditModalOpen}>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            <span>
              {
                dict?.editPolicy || "Edit Policy"
              }
            </span>

          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full  h-full", className)}>
          <PolicyForm policy={policyStore?.editModalPolicy} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditPolicySheet