"use client"

import Link from "next/link"
import { Slack } from "lucide-react"
import { APP_CONFIG } from "@/constants/app.config"
import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"


export const AppLogoSolo = ({
  className
}: {
  className?: string
}) => {
  return <Slack className={cn("w-6 h-6", className)} aria-hidden="true" />
}


const AppLogo = () => {
  const langStore = useStore(useLangStore, state => state)

  return (
    <>
      <Link
        href="/"
        className={cn("flex items-center text-base font-semibold tracking-wide md:text-lg group", {
          "flex-row-reverse justify-start": langStore?.rtl
        })}
      >
        <AppLogoSolo className={cn("mr-2 group-hover:scale-105 group-hover:[transform:translate(0,0)_rotate(720deg)]  transition-all duration-500", {
          "ml-2 mr-0": langStore?.rtl
        })} />
        <span>{APP_CONFIG.appName}</span>
      </Link>
    </>
  )
}



export default AppLogo