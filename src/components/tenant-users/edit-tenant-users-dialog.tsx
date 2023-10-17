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
import useUserStore from "@/store/userStore"
import UserForm from "@/components/tenant-users/tenant-users-form"
import useLangStore from "@/store/langagueStore"

const EditUserDialog = ({
  className,
}: {
  className?: string
}) => {
  const userStore = useStore(useUserStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit() {
    toast.success(
      dict?.userUpdatedSuccessfully || "User updated successfully"
    )
    userStore?.setEditModalOpen(false)
    userStore?.setEditModalUser(undefined)
  }

  function close() {
    userStore?.setEditModalOpen(false)
  }


  return (
    <Sheet open={userStore?.editModalOpen} onOpenChange={userStore?.setEditModalOpen}>
      <SheetContent className="sm:max-w-[425px] flex flex-col gap-5" side={langStore?.rtl === true ? "left" : "right"}>
        <SheetHeader className="py-3">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            <span>
              {
                dict?.editUser || "Edit User"
              }
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className={cn("w-full grow", className)}>
          <UserForm user={userStore?.editModalUser} onSubmit={onSubmit} formType="edit" close={close} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default EditUserDialog