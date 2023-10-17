"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

const themes = ["light", "dark", "system"] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className=" relative text-muted-foreground bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={langStore?.rtl === true ? "start" : "end"}>
        {
          themes.map((t, index) => (
            <DropdownMenuItem key={index} onClick={() => setTheme(t)} className={cn("flex flex-row gap-2", {
              "flex-row-reverse": langStore?.rtl,
            })}>
              <span className={cn({
                "text-right w-full ": langStore?.rtl
              })}>
                {
                  dict?.[t]
                }
              </span>
              <CheckIcon className={cn("w-4 h-4 ml-auto", {
                "ml-0 mr-auto": langStore?.rtl
              }, {
                "hidden": t !== theme
              })} />
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
