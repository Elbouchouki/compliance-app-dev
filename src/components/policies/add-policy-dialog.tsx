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
import PolicyForm from "@/components/policies/policy-form"
import useLangStore from "@/store/langagueStore";


const AddPolicySheetButton = ({
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
      dict?.policyAddedSuccessfully || "Policy added successfully"
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })} >
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addPolicy || "Add Policy"
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
              dict?.addPolicy || "Add Policy"
            }</SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewPolicyToTheSystem || "Add new policy to the system."
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <PolicyForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddPolicySheetButton