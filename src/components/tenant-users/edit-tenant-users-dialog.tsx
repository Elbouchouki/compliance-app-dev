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
import useUserStore from "@/store/userStore"
import UserForm from "@/components/tenant-users/tenant-users-form"
import useTenantStore from "@/store/tenantStore"
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
    userStore?.setEditModalOpen(false)
    userStore?.setEditModalUser(undefined)
    toast.success(
      dict?.userUpdatedSuccessfully || "User updated successfully"
    )
  }

  return (
    <Dialog open={userStore?.editModalOpen} onOpenChange={userStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1  mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editUser || "Edit User"
              }
            </span>
            <span>
              {userStore?.editModalUser?.id.substring(0, 8)}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <UserForm user={userStore?.editModalUser} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditUserDialog