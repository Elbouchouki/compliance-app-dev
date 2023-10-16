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
      {!isFiltered && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className={cn("flex flex-row items-center h-8 px-2 lg:px-3", {
                "flex-row-reverse": langStore?.rtl === true,
              })}
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              {dict?.view || "View"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>{dict?.toggleColumns || "Toggle columns"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => { column.toggleVisibility(!!value) }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <Input
        placeholder={dict?.search || "Search..."}
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className={cn("h-8 md:w-[250px] w-[140px] text-left", {
          "mr-auto ml-0 text-right": langStore?.rtl === true,
        })}
      />
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
      {/* {!tagsData.isLoading && table.getColumn("tagId") && (
        <DataTableFacetedFilter
          column={table.getColumn("tagId")}
          title={dict?.tag || "Tag"}
          options={TAGS || []}
        />
      )} */}
      {/* {table.getColumn("subcategory") && (
          <DataTableFacetedFilter
            column={table.getColumn("subcategory")}
            title="Priority"
            // options={priorities}
          />
        )} */}
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
    </div>
  )
}