"use client"

import Link from "next/link"
import { APP_CONFIG } from "@/constants/app.config"
import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"


export const AppLogoSolo = ({
  className
}: {
  className?: string
}) => {
  return <svg className={cn("w-7 h-7", className)} width={30} height={30} viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5636 3.21429L0.00585938 13.9286V7.5L13.0004 0L18.5636 3.21429Z" fill="#20C77F" />
    <path d="M25.9949 7.5V11.2088L3.22014 24.3544L0.00585938 22.5V19.011L22.9592 5.75549L25.9949 7.5Z" fill="#20C77F" />
    <path d="M7.61575 26.8956L25.9949 16.2912V22.5L13.0004 30L7.61575 26.8956Z" fill="#20C77F" />
  </svg>
}


const AppLogo = () => {
  const langStore = useStore(useLangStore, state => state)

  return (
    <>
      <Link
        href="/"
        className={cn("flex items-center text-base font-semibold tracking-wide md:text-lg group gap-2", {
          "flex-row-reverse justify-start": langStore?.rtl
        })}
      >
        <AppLogoSolo />
        <span>{APP_CONFIG.appName}</span>
      </Link>
    </>
  )
}



export default AppLogo