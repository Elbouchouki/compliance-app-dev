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
import EvidenceForm from "@/components/evidence/evidence-form"
import useLangStore from "@/store/langagueStore";


const AddEvidenceSheetButton = ({
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
      dict?.evidenceAddedSuccessfully || "Evidence added successfully"
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
              dict?.addEvidence || "Add Evidence"
            }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="ssm:max-w-[425px] flex flex-col gap-5">
        <SheetHeader className="py-3">

          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addEvidence || "Add Evidence"
            }
          </SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewEvidenceToTheSystem || " Add new evidence to the system."
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full grow", className)}>
          <EvidenceForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddEvidenceSheetButton