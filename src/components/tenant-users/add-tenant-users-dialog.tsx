"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import UserForm from "@/components/tenant-users/tenant-users-form"
import useLangStore from "@/store/langagueStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const AddUserSheetButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit() {
    setOpen(false)
    toast.success(
      dict?.userAddedSuccessfully || "User added successfully"
    )
  }

  function close() {
    setOpen(false)
  }

  return (

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl === true,
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addUser || "Add User"
            }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] flex flex-col gap-5" side={langStore?.rtl === true ? "left" : "right"}>
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addUser || "Add User"
            }
          </SheetTitle>
          <SheetDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTenantUserToTheSystem || "Add new user to the system"
            }
          </SheetDescription>
        </SheetHeader>
        <div className={cn("w-full grow", className)}>
          <UserForm onSubmit={onSubmit} formType="add" close={close} />
        </div>
      </SheetContent>
    </Sheet>



  )
}
export default AddUserSheetButton