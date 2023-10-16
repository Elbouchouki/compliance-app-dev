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
import useTenantStore from "@/store/tenantStore"
import TenantForm from "@/components/tenant/tenant-form"
import useLangStore from "@/store/langagueStore"

const EditTenantDialog = ({
  className,
}: {
  className?: string
}) => {

  const tenantStore = useStore(useTenantStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  function onSubmit() {
    tenantStore?.setEditModalOpen(false)
    tenantStore?.setEditModalTenant(undefined)
    toast.success(
      dict?.tenantUpdatedSuccessfully || "Tenant updated successfully"
    )
  }

  return (
    <Dialog open={tenantStore?.editModalOpen} onOpenChange={tenantStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1", {
            "flex-row-reverse": langStore?.rtl,
          })}>
            <span>
              {
                dict?.editTenant || "Edit Tenant"
              }
            </span>
            <span>
              {tenantStore?.editModalTenant?.id.substring(0, 6)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <TenantForm tenant={tenantStore?.editModalTenant} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditTenantDialog