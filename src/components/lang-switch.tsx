"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { Lang } from "@/types"
import { CheckIcon } from "lucide-react"


const LangSwitch = () => {

  const langStore = useStore(useLangStore, state => state)
  const lang: Lang[] = [
    {
      key: "en",
      icon: "/flags/en.png",
      text: "English"
    },
    {
      key: "ar",
      icon: "/flags/ar.png",
      text: "Arabic"
    }
  ]
  const currentLang = lang.find(l => l.key === langStore?.lang) || lang[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-muted-foreground bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10" >
          <p className="text-xs">
            {currentLang.key.toUpperCase()}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2" align={langStore?.rtl === true ? "start" : "end"}>
        {
          lang.map((l, index) => (
            <DropdownMenuItem key={index} onClick={() => langStore?.changeLang(l.key)}>
              <div className={cn("flex flex-row items-center  w-full", {
                "flex-row-reverse justify-start": langStore?.rtl
              })}>
                <span className={cn({
                  "text-right w-full ": langStore?.rtl
                })}>
                  {l.text}
                </span>
                <CheckIcon className={cn("w-4 h-4 ml-auto", {
                  "ml-0 mr-auto": langStore?.rtl
                }, {
                  "hidden": l.key !== currentLang.key
                })} />
              </div>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LangSwitch