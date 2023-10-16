"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import Hamburger from "@/components/layout/hamburger"
import { Button } from "../ui/button"
import { AlignLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import useSidebarStore from "@/store/sidebarStore"
import { useStore } from "@/hooks/use-store"
import { UserNav } from "@/components/layout/user-nav"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { SIDEBAR_ITEMS } from "@/constants/sidebar.config"
import React from "react"
import Link from "next/link"
import LangSwitch from "@/components/lang-switch"
import useLangStore from "@/store/langagueStore"
import { Icons } from "../icons"
import { Separator } from "../ui/separator"
import { Dictionnary } from "@/types"


const SearchButton = () => {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return <Dialog>
    <DialogTrigger asChild>
      <div>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-3xl"
        >
          <Search className="w-5 h-5 text-muted-foreground " />
        </Button>
      </div>
    </DialogTrigger>
    <DialogContent className="p-0">
      <div className={cn("flex items-center px-3 border-b", {
        "flex-row-reverse mr-5": langStore?.rtl
      })}>
        <Search className={cn("w-4 h-4 text-muted-foreground ", {
          "hidden": langStore?.rtl
        })} />
        <Input
          type="search"
          placeholder="Type a command or search..."
          className={cn("w-full h-12 border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none", {
            "text-right": langStore?.rtl
          })}
        />
      </div>
      <div className={cn("flex flex-col gap-2 px-3 my-3 overflow-y-scroll max-h-80", {
        "pr-5": langStore?.rtl
      })}>
        <span className={cn("py-1 text-xs font-semibold text-muted-foreground", {
          "text-right": langStore?.rtl
        })}>
          {dict?.quickLinks}
        </span>
        {
          SIDEBAR_ITEMS.slice(1).map((item, index) => {
            if (item.children && item.children.length > 0) {
              return (
                <div key={index} className="w-full text-lg font-bold">
                  <div className="flex flex-col w-full gap-2">
                    <span className={cn("my-1 ml-1", {
                      "text-right": langStore?.rtl
                    })}>
                      {
                        dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
                      }
                    </span>
                    {
                      item.children.map((child, i) => {
                        const ChildIcon = child.icon as React.ElementType
                        return (
                          <DialogClose asChild key={i} >
                            <Link href={child.path as string}>
                              <Button size="lg" variant="ghost" className={cn("flex-none w-full p-0 px-2", {
                                "flex-row-reverse": langStore?.rtl
                              })}>
                                <ChildIcon className={cn("w-6 h-6 mr-2 text-muted-foreground", {
                                  "ml-2 mr-0": langStore?.rtl
                                })} />
                                <span className={cn("w-full text-left", {
                                  "text-right": langStore?.rtl
                                })}>
                                  {
                                    dict ? (dict[child.key as keyof Dictionnary] as string) : child.title
                                  }
                                </span>
                              </Button>
                            </Link>
                          </DialogClose>
                        )
                      })
                    }
                    <Separator />
                  </div>
                </div>
              )
            }
            const Icon = item.icon as React.ElementType
            return (
              <DialogClose asChild key={index} >
                <Link href={item.path as string}>
                  <Button size="lg" variant="ghost" className={cn("flex-none w-full p-0 px-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    <Icon className={cn("w-6 h-6 mr-2 text-muted-foreground", {
                      "ml-2 mr-0": langStore?.rtl
                    })} />
                    <span className={cn("w-full text-left", {
                      "text-right": langStore?.rtl
                    })}>{item.title}</span>
                  </Button>
                </Link>
              </DialogClose>
            )
          })
        }
      </div>
    </DialogContent>
  </Dialog>
}


const Navbar = () => {

  const sidebarStore = useStore(useSidebarStore, state => state)
  const langStore = useStore(useLangStore, state => state)

  return (
    <nav className={cn("flex items-center justify-center w-full h-16 gap-4 px-4 py-1 border-b flex-none", {
      "flex-row-reverse": langStore?.rtl
    })}>
      <div className={cn("flex items-center justify-start gap-2 grow", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <div className="xl:hidden">
          <Hamburger />
        </div>
        <Button className="hidden xl:flex" variant="ghost" size="icon" onClick={sidebarStore?.toggle}>
          {
            sidebarStore?.opened ?
              <AlignLeft className="w-6 h-6 text-muted-foreground " />
              :
              <Icons.hamburger className="w-6 h-6 text-muted-foreground " />
          }
        </Button>
        <SearchButton />
      </div>
      <div className={cn("flex flex-row items-center gap-4", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <ThemeToggle />
        <LangSwitch />
        <UserNav />
      </div>
    </nav >
  )
}
export default Navbar