"use client"

import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter"
import { CATEGORY, IMPACT, RISK_STATUS } from "@/mock"
import { useUser } from "@clerk/nextjs"
import { trpc } from "@/app/_trpc/client"
import { DataTableViewOptions } from "@/components/data-table-view-options"


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
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const categorys = CATEGORY(langStore?.lang).map(c => ({ label: c.value, value: c.id }));
  // const subc = CATEGORY.map(c => (c.subCategory)).map(c => ({}));
  const riskStatus = RISK_STATUS(langStore?.lang).map(s => ({ label: s.value, value: s.id }))

  const { user } = useUser()
  const tagsData = trpc.tag.getAll.useQuery({
    userId: user?.id
  })

  const TAGS = tagsData?.data?.map(t => ({ label: t.name, value: t.id }))

  return (
    <div className={cn("flex flex-row items-center w-full gap-2", {
      "flex-row-reverse": langStore?.rtl === true,
    })}>
      {table.getColumn("impact") && (
        <DataTableFacetedFilter
          column={table.getColumn("impact")}
          title={dict?.impact || "Impact"}
          options={IMPACT.map(impct => ({
            value: impct?.value,
            label: impct?.label
          }))}
        />
      )}
      {table.getColumn("likelihood") && (
        <DataTableFacetedFilter
          column={table.getColumn("likelihood")}
          title={dict?.likelihood || "Likelihood"}
          options={IMPACT}
        />
      )}
      {table.getColumn("categoryId") && (
        <DataTableFacetedFilter
          column={table.getColumn("categoryId")}
          title={dict?.category || "Category"}
          options={categorys}
        />
      )}
      {table.getColumn("riskStatusId") && (
        <DataTableFacetedFilter
          column={table.getColumn("riskStatusId")}
          title={dict?.riskStatus || "Risk Status"}
          options={riskStatus}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          {dict?.reset || "Reset"}
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
      <Input
        placeholder={dict?.search || "Search"}
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className={cn("h-8 w-[250px] text-left ml-auto text-muted-foreground bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10", {
          "mr-auto ml-0 text-right": langStore?.rtl === true,
        })}
      />
      <div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}