"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import TenantForm from "@/components/tenant/tenant-form"
import useLangStore from "@/store/langagueStore";


const AddTenantSheetButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    setOpen(false)
    toast.success(
      dict?.tenantAddedSuccessfully || "Tenant added successfully"
    )
  }


  return (

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl === true,
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addTenant || "Add Tenant"
            }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">

          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addTenant || "Add Tenant"
            }
          </SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTenantToTheSystem || "Add new tenant to the system"
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>

          <TenantForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>



  )
}
export default AddTenantSheetButton