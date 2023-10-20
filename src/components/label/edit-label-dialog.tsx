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
import useLabelStore from "@/store/labelStore"
import LabelForm from "@/components/label/label-form"
import useLangStore from "@/store/langagueStore"

const EditLabelSheet = ({
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
    <Sheet open={labelStore?.editModalOpen} onOpenChange={labelStore?.setEditModalOpen}>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            <span>
              {
                dict?.editLabel || "Edit Label"
              }
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <LabelForm label={labelStore?.editModalLabel} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditLabelSheet