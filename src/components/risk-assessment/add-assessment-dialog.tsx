"use client"


import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

const AddAssessmentDialogButton = ({
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

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addRiskScope || "Add Risk Scope"
            }
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addRiskScope || "Add Risk Scope"
            }
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <AssessmentForm onSubmit={onSubmit} formType="add" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddAssessmentDialogButton