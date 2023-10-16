"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableViewOptions } from "@/components/data-table-view-options"
import { HardDriveDownload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
  setGlobalFilter: (value: string) => void
  globalFilter: string
}


export function DataTableToolbar<TData>({
  table,
  setGlobalFilter,
  globalFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [exporting, setExporting] = useState(false)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <div className="flex flex-col gap-3">
      <div className={cn("flex flex-row w-full gap-2", {
        "flex-row-reverse": langStore?.rtl === true,
      })}>
        {isFiltered && (
          <div className={cn("flex w-full", {
            "justify-end": langStore?.rtl === true,
          })}>
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className={cn("flex flex-row items-center h-8 px-2 lg:px-3 gap-2", {
                "flex-row-reverse": langStore?.rtl === true,
              })}
            >
              <span>
                {
                  dict?.resetFilters || "Reset Filters"
                }
              </span>
              <Cross2Icon className="w-4 h-4" />
            </Button>
          </div>
        )}
        <Input
          placeholder={dict?.search || "Search..."}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className={cn("h-8 w-[250px] text-left ml-auto", {
            "mr-auto ml-0 text-right": langStore?.rtl === true,
          })}
        />

        <div>
          <DataTableViewOptions table={table} />
        </div>

        <Button
          disabled={exporting}
          size="icon" variant="outline" className="h-8" onClick={
            () => {
              toast.promise(
                () => new Promise((resolve) => {
                  setExporting(true)
                  setTimeout(() => {
                    setExporting(false)
                    resolve({})
                  }
                    , 2000)
                }),
                {
                  loading: dict?.exportingData || "Exporting data...",
                  success: dict?.dataExported || "Data exported",
                  error: dict?.errorExportingData || "Error exporting data"
                }
              )
            }
          } >
          {
            exporting ? <Loader2 className="w-4 h-4 animate-spin" />
              :
              <HardDriveDownload className="w-4 h-4 " />
          }
        </Button>
      </div>
    </div>
  )
}