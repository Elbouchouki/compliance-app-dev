"use client"


import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import AssessmentForm from "@/components/risk-assessment/assessment-form"
import useLangStore from "@/store/langagueStore";
import * as z from "zod"
import { RiskForm } from "@/types";
import useRiskAssessmentScopeStore from "@/store/riskAssessementScopeStore";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";

const AddAssessmentSheetButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()



  function onSubmit() {

    setOpen(false)
    toast.success(dict?.riskAssessmentAddedSuccessfully || "Risk Assessment scope added successfully")
  }


  return (

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row items-center gap-2 flex-none", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addRiskScope || "Add Risk Scope"
            }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="pb-5">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addRiskScope || "Add Risk Scope"
            }
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full pb-10", className)}>
          <AssessmentForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddAssessmentSheetButton