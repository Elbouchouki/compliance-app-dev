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
import useLabelStore from "@/store/labelStore"
import LabelForm from "@/components/label/label-form"
import useLangStore from "@/store/langagueStore"

const EditLabelDialog = ({
  className,
}: {
  className?: string
}) => {

  const labelStore = useStore(useLabelStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    labelStore?.setEditModalOpen(false)
    labelStore?.setEditModalLabel(undefined)
    toast.success(
      dict?.labelUpdatedSuccessfully || "Label updated successfully"
    )
  }

  return (
    <Dialog open={labelStore?.editModalOpen} onOpenChange={labelStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1 mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editLabel || "Edit Label"
              }
            </span>
            <span>
              {
                labelStore?.editModalLabel?.id.substring(0, 6)
              }
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <LabelForm label={labelStore?.editModalLabel} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditLabelDialog