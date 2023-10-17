"use client"

import { APP_CONFIG } from "@/constants/app.config"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import useLangStore from "@/store/langagueStore"
import Link from "next/link"

const Footer = ({
  className
}: {
  className?: string
}) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <footer className={cn("w-full flex flex-row justify-center gap-1 text-sm py-2", className, {
      "flex-row-reverse": langStore?.rtl
    })}>
      <span>
        {`${new Date().getFullYear()}`}
      </span>
      {" © "}
      <Link href="/" className="hover:underline text-ring">{APP_CONFIG.appName}</Link>
      <span>
        {dict?.allRightsReserved}
      </span>
    </footer>
  )
}
export default Footer