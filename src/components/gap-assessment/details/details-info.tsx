"use client"

import { Control } from "@/types"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useLangStore from "@/store/langagueStore";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

const DetailsInfo = ({ control }: {
  control: Control | undefined
}) => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-1.5 px-6">
        <div className={cn("flex flex-col gap-3 md:flex-row", {
          ' md:flex-row-reverse': langStore?.rtl,
        })}>
          <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center ", {
            "items-end sm:flex-row-reverse": langStore?.rtl,
          })}>
            <span className="font-semibold">
              {
                dict?.functionGrouping || "Function Group"
              }
            </span>
            <Badge className="rounded-sm">
              {control?.group}
            </Badge>
          </div>
          <Separator className="hidden md:flex" orientation="vertical" />
          <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center ", {
            "items-end sm:flex-row-reverse": langStore?.rtl,
          })}>
            <span className="font-semibold">
              {
                dict?.domain || "Domain"
              }
            </span>
            <Badge variant="outline" className="rounded-sm">
              {control?.category}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 px-6">
        <div className="flex flex-col gap-1.5 text-sm">
          <span className={cn("font-semibold", {
            "text-right": langStore?.rtl
          })}>
            {
              dict?.controlDescription || "Control Description"
            }
          </span>
          <span className={cn("text-justify", {
            "text-right": langStore?.rtl
          })}>
            {control?.description}
          </span>
        </div>
      </div>
    </div>
  )
}
export default DetailsInfo