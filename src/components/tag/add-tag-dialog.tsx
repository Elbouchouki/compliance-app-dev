"use client"

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
import TagForm from "@/components/tag/tag-form"
import useLangStore from "@/store/langagueStore";
import { trpc } from "@/app/_trpc/client";

const AddTagSheetButton = ({
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addTag || "Add Tag"
            }
          </SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTagToTheSystem || "Add new tag to the system."
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full h-full", className)}>
          <TagForm onSubmit={onSubmit} formType="add" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddTagSheetButton