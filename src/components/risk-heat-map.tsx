"use client"

import React from 'react'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import { useStore } from '@/hooks/use-store'
import useLangStore from '@/store/langagueStore'




const RiskHeatMap = () => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const colorDegree = (degree: number) => {
    if (degree <= 5) {
      return "bg-[#2f4858]"
    } else if (degree <= 10) {
      return "bg-[#156175]"
    } else if (degree <= 15) {
      return "bg-[#007b8a]"
    } else if (degree <= 20) {
      return "bg-[#009592]"
    } else {
      return "bg-[#00af8f]"
    }
  }

  const heatMapHeaders = ["Negligible", "Low", "Moderate", "Significant", "Catastrophic"]
  const heatMap: {
    [key: string]: number[]
  } = {
    "IMPROBABLE": [5, 10, 15, 20, 25],
    "REMOTE": [5, 10, 15, 20, 25],
    "OCCASIONAL": [5, 10, 15, 20, 25],
    "PROBABLE": [5, 10, 15, 20, 25],
    "FRECUENT": [5, 10, 15, 20, 25]
  }

  return (
    <div className="w-full  flex-col rounded-lg border bg-navbar hidden sm:flex ">
      <div className={cn("py-2 px-4 text-sm font-semibold", {
        "text-right": langStore?.rtl
      })}>{dict?.riskHeatMap || "Risk Heat Map"}</div>
      <Separator />
      <div className='p-10 flex flex-col gap-4 lg:px-28'>
        <div className='flex flex-row gap-4 justify-evenly'>
          <div className='text-sm text-muted-foreground w-full'>
          </div>
          {
            heatMapHeaders.map((header, index) => {
              return (
                <div key={index} className='text-sm  text-muted-foreground dark:text-foreground w-full'>
                  {header}
                </div>
              )
            })
          }
        </div>
        <div className='flex flex-col gap-4 justify-evenly'>

          {
            Object.keys(heatMap).map((key, index) => {
              return (
                <div className='flex flex-row gap-4 justify-evenly h-14' key={index}>
                  <div className='text-sm text-muted-foreground dark:text-foreground  w-full h-full flex justify-center items-center'>
                    <p >
                      {
                        key.slice(0, 1) + key.slice(1).toLowerCase()
                      }
                    </p>
                  </div>
                  {
                    heatMap[key].map((value, index) => (
                      <div key={index} className={cn('text-sm text-white dark:text-foreground rounded-lg w-full h-full flex justify-center items-center', colorDegree(value))}>
                        <p >
                          {value}
                        </p>
                      </div>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default RiskHeatMap