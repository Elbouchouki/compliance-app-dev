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
    <Dialog open={evidenceStore?.editModalOpen} onOpenChange={evidenceStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1 mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editEvidence || "Edit Evidence"
              }
            </span>
            <span>
              {evidenceStore?.editModalEvidence?.id.substring(0, 6)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <EvidenceForm evidence={evidenceStore?.editModalEvidence} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditEvidenceDialog