"use client"

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import AppLogo from "@/components/app-logo"
import { SIDEBAR_ITEMS } from "@/constants/sidebar.config"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { SidebarItem } from "@/types"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { motion } from "framer-motion"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"




const HamburgerCollapsedItem = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)

  const [opened, setOpened] = useState(
    item.children?.some(child => child.path === pathname)
  )

  const Icon = item.icon as React.ElementType

  const getChildrenHeight = () => {
    let height = 0
    let menuItemHeight = 40
    if (opened && item.children && item.children.length) {
      height = item.children.length * menuItemHeight
    }
    return height
  }

  return (
    <div>
      <div className={cn("flex flex-row items-center text-black/80 dark:text-white/80 hover:dark:bg-gray-700 h-10 cursor-pointer  hover:bg-gray-300/70 px-3 rounded-md", {
        "bg-gray-200 dark:bg-gray-800": item.path === pathname,
        "flex-row-reverse justify-start": langStore?.rtl
      })} onClick={() => setOpened(!opened)}>
        <Icon className={cn("w-5 h-5 mr-2", {
          "ml-2 mr-0": langStore?.rtl
        })} />
        <span className="text-sm font-semibold">
          {item.title}
        </span>
        <Icons.chevronDown className={cn("w-4 h-4 ml-auto transition-all", {
          "transform rotate-180": opened,
          "mr-auto ml-0": langStore?.rtl
        })} />
      </div>
      <motion.div
        className={cn("flex flex-col ml-5", {
          "mt-2": opened,
          "mr-5 ml-0": langStore?.rtl
        })}
        initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
        animate={{
          opacity: opened ? 1 : 0,
          height: opened ? getChildrenHeight() : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {
          item.children?.map((child, index) => (
            <HamburgerItem key={index} item={child} noIcons={true} />
          ))
        }
      </motion.div>
    </div>
  )
}

const HamburgerItem = (
  {
    item,
    noIcons = false
  }
    : {
      item: SidebarItem
      noIcons?: boolean
    }) => {


  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)

  if (item.children && item.children.length > 0) {
    return <HamburgerCollapsedItem item={item} />
  }

  const Icon = item.icon as React.ElementType

  return (
    <SheetClose asChild>
      <Link
        href={item.path as string}
        className={cn("flex flex-row items-center  h-10 cursor-pointer text-black/80 dark:text-white/80 hover:dark:bg-gray-700 hover:bg-gray-300/70 px-3 rounded-md", {
          "bg-gray-200 dark:bg-gray-800": item.path === pathname,
          "flex-row-reverse justify-start": langStore?.rtl
        })} >
        {
          noIcons === false ? <Icon className={cn("w-5 h-5 mr-2", {
            "ml-2 mr-0": langStore?.rtl
          })} /> : null
        }
        <span className="text-sm font-semibold">
          {item.title}
        </span>
      </Link>
    </SheetClose>
  )

}


const Hamburger = () => {

  const langStore = useStore(useLangStore, state => state)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-3xl">
          <Icons.hamburger className="w-6 h-6 text-muted-foreground" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={langStore?.rtl ? "right" : "left"}
        className="w-full sm:w-72 xl:hidden"
        overlayClassName="xl:hidden"
      >
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex flex-col w-full gap-8 ">
            <div className="flex justify-center w-full">
              <AppLogo />
            </div>
            {/* <TenantSelect displayLabel /> */}
          </div>
          <div className="w-full h-full py-2 mt-3 overflow-y-scroll no-scrollbar">
            <div className="flex flex-col w-full gap-2">
              {
                SIDEBAR_ITEMS.map(
                  (item, index) => (
                    <HamburgerItem key={index} item={item} />
                  )
                )
              }
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default Hamburger