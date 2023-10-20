"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/hooks/use-store"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs"
import { GET_ROLES } from "@/mock"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Icons } from "../icons"

export function UserNav() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const authUser = useUser();
  const { signOut } = useClerk();
  const getFormattedRole = (role: string) => {

    const formatted = GET_ROLES(langStore?.lang).filter(r => r?.value === role)[0]?.label
    if (formatted === undefined) return role.charAt(0).toUpperCase() + role.slice(1)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)

  }
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (



    <AlertDialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8">
              <AvatarImage src={authUser.user?.imageUrl} alt={`${authUser.user?.username}'s avatar`} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={langStore?.rtl === true ? "start" : "end"}
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <p className={cn("text-sm font-medium leading-none", {
                "text-right": langStore?.rtl
              })}>
                {authUser.user?.username}
              </p>
              <p className={cn("text-xs leading-none text-muted-foreground", {
                "text-right": langStore?.rtl
              })}>
                {authUser.user?.emailAddresses[0].emailAddress}
              </p>
              <div className={cn("flex flex-row items-center gap-2 text-xs leading-none text-muted-foreground", {
                "flex-row-reverse justify-start": langStore?.rtl,
              })}>
                <span className="whitespace-nowrap">
                  {dict?.connectedAs}
                </span>
                <div className="flex flex-row items-center gap-1">
                  {authUser.user?.publicMetadata.role !== undefined ?
                    <Badge className="py-[1px] text-xs flex-none">
                      {getFormattedRole(authUser.user?.publicMetadata.role as string)}
                    </Badge> : null
                  }
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className={cn("flex flex-row ", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <span className="flex-none">
                  {dict?.profile}
                </span>
                <DropdownMenuShortcut className={cn({
                  "mr-auto w-full": langStore?.rtl,
                })}>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            {/* <Link href="/settings">
            <DropdownMenuItem className={cn("flex flex-row ", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <span className="flex-none">
                {dict?.settings}
              </span>
            </DropdownMenuItem>
          </Link> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className={cn("flex flex-row ", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <span className="flex-none">
                {dict?.logout}
              </span>
              <DropdownMenuShortcut className={cn({
                "mr-auto w-full": langStore?.rtl,
              })}>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>

        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={cn({
            "text-right": langStore?.rtl
          })}>
            {
              dict?.logout || "Logout"
            }
          </AlertDialogTitle>
          <AlertDialogDescription className={cn({
            "text-right": langStore?.rtl
          })}>
            {
              dict?.areYouSureYouWantToLogout || "Are you sure you want to logout?"
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogCancel
            disabled={loading}
          >
            {
              dict?.cancel || "Cancel"
            }
          </AlertDialogCancel>
          <Button
            className="flex flex-row gap-2"
            disabled={loading}
            onClick={() => {
              setLoading(true)
              signOut()
            }}>
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !loading
            })} />
            <p>
              {
                dict?.logout || "Logout"
              }
            </p>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog >

  )
}