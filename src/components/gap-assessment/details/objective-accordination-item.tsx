"use client"

import { cn } from "@/lib/utils"
import { AssessmentObjectives, ObjectiveTypes } from "@/types"
import { CheckCircle2, ChevronDown, Circle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { GET_OBJECTIVE_TYPES } from "@/mock"

type ObjectiveItemHeaderProps = {
  objective: any
  item_index: string
  openedCollapsible: string
  choice: ObjectiveTypes | undefined
  setOpenedCollapsible: (value: string) => void
}

const ObjectiveItemHeader = ({
  objective,
  item_index,
  openedCollapsible,
  setOpenedCollapsible,
  choice
}: ObjectiveItemHeaderProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const objectiveCheckIcon = (o: ObjectiveTypes | undefined) => {
    if (o && o === "Not Met")
      return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
    if (o && (o === "Not Applicable" || o === "Met" || o === "Compensating Control"))
      return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
    return <Circle className="w-4 h-4" />
  }

  return (
    <div onClick={() => {
      if (openedCollapsible === item_index) {
        setOpenedCollapsible("")
      } else {
        setOpenedCollapsible(item_index)
      }
    }} className={cn("w-full flex flex-row cursor-pointer gap-3 h-12  px-6  ", {
      "flex-row-reverse": langStore?.rtl
    })}>
      <div className="flex items-center justify-center h-full ">
        <ChevronDown className={cn("w-4 h-4", {
          "transform rotate-180": openedCollapsible === item_index
        })} />
      </div>
      <div className="flex items-center text-sm font-semibold">
        {objective.assessmentObjective.id}
      </div>
      <div className={cn("flex flex-row gap-2 ml-auto", {
        "flex-row-reverse ml-0 mr-auto": langStore?.rtl
      })}>
        <div className="flex items-center">
          {
            choice ?
              <Badge variant="outline">
                {
                  GET_OBJECTIVE_TYPES(langStore?.lang).find(o => o.value === choice)?.label
                }
              </Badge> : null
          }
        </div>
        <div className="flex items-center">
          {
            objectiveCheckIcon(choice)
          }
        </div>
      </div>
    </div>
  )
}
export default ObjectiveItemHeader