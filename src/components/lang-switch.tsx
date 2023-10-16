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
        <Button variant="outline" size="icon" className="text-muted-foreground bg-navbar-gray" >
          <p className="text-xs">
            {currentLang.key.toUpperCase()}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2" align={langStore?.rtl === true ? "start" : "end"}>
        {
          lang.map((l, index) => (
            <DropdownMenuItem key={index} className="rounded-md" onClick={() => langStore?.changeLang(l.key)}>
              <div className={cn("flex flex-row items-center  w-full", {
                "flex-row-reverse justify-start": langStore?.rtl
              })}>
                <Image src={l.icon} alt={l.text} width={24} height={24} className={cn("mr-3", {
                  "ml-3 mr-0": langStore?.rtl
                })} />
                <span className="font-semibold">
                  {l.text}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LangSwitch