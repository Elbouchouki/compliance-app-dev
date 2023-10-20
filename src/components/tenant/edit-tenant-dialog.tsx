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
import useTenantStore from "@/store/tenantStore"
import TenantForm from "@/components/tenant/tenant-form"
import useLangStore from "@/store/langagueStore"

const EditTenantSheet = ({
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
    <Sheet open={tenantStore?.editModalOpen} onOpenChange={tenantStore?.setEditModalOpen}>
      <SheetContent className="sm:max-w-[425px] flex flex-col gap-5" side={langStore?.rtl === true ? "left" : "right"}>

        <SheetHeader>
          <SheetTitle className={cn("flex flex-row gap-1", {
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
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full grow", className)}>
          <TenantForm tenant={tenantStore?.editModalTenant} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditTenantSheet