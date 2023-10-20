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
import useEvidenceStore from "@/store/evidenceStore"
import EvidenceForm from "@/components/evidence/evidence-form"
import useLangStore from "@/store/langagueStore"

const EditEvidenceDialog = ({
  className,
}: {
  className?: string
}) => {

  const evidenceStore = useStore(useEvidenceStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit() {
    evidenceStore?.setEditModalOpen(false)
    evidenceStore?.setEditModalEvidence(undefined)
    toast.success(
      dict?.evidenceUpdatedSuccessfully || "Evidence updated successfully"
    )
  }

  return (
    <Sheet open={evidenceStore?.editModalOpen} onOpenChange={evidenceStore?.setEditModalOpen}>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            <span>
              {
                dict?.editEvidence || "Edit Evidence"
              }
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <EvidenceForm evidence={evidenceStore?.editModalEvidence} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditEvidenceDialog