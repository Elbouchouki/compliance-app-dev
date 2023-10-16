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
import useTagStore from "@/store/tagStore"
import TagForm from "@/components/tag/tag-form"
import useLangStore from "@/store/langagueStore"

const EditTagDialog = ({
  className,
}: {
  className?: string
}) => {

  const tagStore = useStore(useTagStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  function onSubmit() {
    tagStore?.setEditModalOpen(false)
    tagStore?.setEditModalTag(undefined)
    toast.success(
      dict?.tagUpdatedSuccessfully || "Tag updated successfully"
    )
  }

  return (
    <Dialog open={tagStore?.editModalOpen} onOpenChange={tagStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1 mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editTag || "Edit Tag  "
              }
            </span>
            <span>
              {tagStore?.editModalTag?.id.substring(0, 6)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <TagForm tag={tagStore?.editModalTag} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditTagDialog