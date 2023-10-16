"use client"

import { cn } from "@/lib/utils"
import useSidebarStore from "@/store/sidebarStore"
import { motion } from 'framer-motion'
import AppLogo, { AppLogoSolo } from "../app-logo"
import { useStore } from "@/hooks/use-store"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SIDEBAR_ITEMS } from "@/constants/sidebar.config"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Dictionnary, SidebarItem } from "@/types"
import { useState } from "react"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import useLangStore from "@/store/langagueStore"


const SidebarCollapsedItem = ({ item }: { item: SidebarItem }) => {

  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

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
    <div   >
      <div className={cn("flex flex-row items-center text-black/80 dark:text-white/80 hover:dark:bg-gray-700 h-10 cursor-pointer  hover:bg-gray-300/70 px-3 rounded-md", {
        "bg-gray-200 dark:bg-gray-800": item.path === pathname,
        "flex-row-reverse justify-start": langStore?.rtl
      })} onClick={() => setOpened(!opened)}>
        <Icon className={cn("w-5 h-5 mr-2", {
          "ml-2 mr-0": langStore?.rtl
        })} />
        <span className="text-sm font-semibold">
          {
            dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
          }
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
            <SidebarItem key={index} item={child} noIcon={true} />
          ))
        }
      </motion.div>
    </div>
  )
}

const SidebarIconItem = (
  {
    item,
    noIcon = false
  }: {
    item: SidebarItem,
    noIcon?: boolean
  }
) => {
  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const Icon = item.icon as React.ElementType


  if (item.children && item.children.length > 0) {
    return <Tooltip delayDuration={100}  >
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="justify-center w-full text-black/80 dark:text-white/80 hover:dark:bg-gray-700 hover:bg-gray-300/70"
        >
          <Icon className="w-5 h-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="flex flex-col bg-white border dark:bg-gray-900" align="start" sideOffset={5} side={
        langStore?.rtl ? "left" : "right"
      } >
        {
          item.children.map((child, index) => (
            <Link
              key={index}
              href={child.path as string}
              className={cn("h-8 flex flex-row items-center cursor-pointer text-black/80 dark:text-white/80 hover:dark:bg-gray-700 hover:bg-gray-200/70 rounded-md", {
                "bg-gray-100 dark:bg-gray-800": child.path === pathname,
                "flex-row-reverse justify-start": langStore?.rtl
              })} >
              <span className="px-2 text-sm font-semibold">
                {
                  dict ? (dict[child.key as keyof Dictionnary] as string) : child.title
                }
              </span>
            </Link>
          ))
        }
      </TooltipContent>
    </Tooltip>
  }

  return (
    <Tooltip delayDuration={100} >
      <TooltipTrigger asChild>
        <Link href={item.path as string}>
          <Button
            size="icon"
            variant="ghost"
            className={cn("w-full justify-center text-black/80 dark:text-white/80 hover:dark:bg-gray-700 hover:bg-gray-300/70", {
              "bg-gray-200 dark:bg-gray-800": item.path === pathname
            })}
          >
            {noIcon === true ? null : <Icon className="w-5 h-5" />}
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="text-white bg-black" align="center" sideOffset={5} side="right" >
        <p className="font-bold">
          {
            dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
          }
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

const SidebarItem = (
  {
    item,
    noIcon = false,
    sideBarOpened,
  }
    : {
      item: SidebarItem
      noIcon?: boolean
      sideBarOpened?: boolean,
    }) => {


  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  if (sideBarOpened !== undefined && sideBarOpened === false) {
    return <SidebarIconItem item={item} />
  }


  if (item.children && item.children.length > 0) {
    return <SidebarCollapsedItem item={item} />
  }

  const Icon = item.icon as React.ElementType

  return (
    <Link
      href={item.path as string}
      className={cn("flex flex-row items-center  h-10 cursor-pointer text-black/80 dark:text-white/80 hover:dark:bg-gray-700 hover:bg-gray-300/70 px-3 rounded-md", {
        "bg-gray-200 dark:bg-gray-800": item.path === pathname,
        "flex-row-reverse justify-start": langStore?.rtl
      })} >
      {
        noIcon ? null : <Icon className={cn("w-5 h-5 mr-2", {
          "ml-2 mr-0": langStore?.rtl
        })} />
      }
      <span className="text-sm font-semibold">
        {
          dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
        }
      </span>
    </Link>
  )

}

const Sidebar = () => {
  const sidebarStore = useStore(useSidebarStore, state => state)
  return (
    <aside className={cn("border-r w-20 transition-all hidden xl:flex flex-col gap-4 p-2 flex-none bg-secondary dark:bg-background ", {
      "w-72": sidebarStore?.opened,
    })}>
      <div className={cn("w-full flex flex-col gap-8 mt-1", {
        "hidden": !sidebarStore?.opened
      })}>
        <div className="flex justify-center w-full">
          <AppLogo />
        </div>
      </div>
      <div className={cn("w-full flex justify-center my-2", {
        "hidden": sidebarStore?.opened
      })}>
        <AppLogoSolo className="hover:[transform:translate(0,0)_rotate(720deg)] transition-all duration-500" />
      </div>
      <div className="w-full h-full py-2 mt-4 overflow-y-scroll no-scrollbar ">
        <div className="flex flex-col w-full gap-2 px-2">
          {
            SIDEBAR_ITEMS.map((item, index) => (
              <SidebarItem sideBarOpened={sidebarStore?.opened} key={index} item={item} />
            ))
          }
        </div>
      </div>
    </aside>
  )
}
export default Sidebar