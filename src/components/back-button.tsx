"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

const BackButton = () => {
  const router = useRouter()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <Button className={cn("flex flex-row gap-2", {
      "flex-row-reverse": langStore?.rtl
    })} variant="ghost" size="sm" onClick={() => router.back()}>
      <ArrowLeft className={cn("w-4 h-4", {
        "rotate-180": langStore?.rtl
      })} />
      {
        dict?.back || "Back"
      }
    </Button>
  )
}
export default BackButton