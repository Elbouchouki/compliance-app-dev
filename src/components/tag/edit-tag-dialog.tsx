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
import useTagStore from "@/store/tagStore"
import TagForm from "@/components/tag/tag-form"
import useLangStore from "@/store/langagueStore"

const EditTagSheet = ({
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
    <Sheet open={tagStore?.editModalOpen} onOpenChange={tagStore?.setEditModalOpen}>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            <span>
              {
                dict?.editTag || "Edit Tag  "
              }
            </span>
            <span>
              {tagStore?.editModalTag?.id.substring(0, 6)}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <TagForm tag={tagStore?.editModalTag} onSubmit={onSubmit} formType="edit" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditTagSheet