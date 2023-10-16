"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import TagForm from "@/components/tag/tag-form"
import useLangStore from "@/store/langagueStore";
import { trpc } from "@/app/_trpc/client";

const AddTagDialogButton = ({
  className
}: {
  className?: string
}) => {

  const mutation = trpc.tag.add.useMutation()
  const [open, setOpen] = useState(false);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    setOpen(false)
    toast.success(
      dict?.tagAddedSuccessfully || "Tag added successfully"
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}
          disabled={mutation.isLoading}
        >
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addTag || "Add Tag"
            }
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addTag || "Add Tag"
            }
          </DialogTitle>
          <DialogDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTagToTheSystem || "Add new tag to the system."
            }
          </DialogDescription>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <TagForm onSubmit={onSubmit} formType="add" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddTagDialogButton