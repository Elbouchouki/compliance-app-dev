"use client"

import * as z from "zod"

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
import LabelForm from "@/components/label/label-form"
import useLangStore from "@/store/langagueStore";

const AddLabelSheetButton = ({
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
      dict?.labelAddedSuccessfully || "Label added successfully"
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
              dict?.addLabel || "Add Label"
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
              dict?.addLabel || "Add Label"
            }
          </SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewLabelToTheSystem || "Add new label to the system."
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <LabelForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddLabelSheetButton