"use client"

import * as React from "react"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"


interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {

  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("flex h-8 border-dashed text-muted-foreground bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10", {
          "flex-row-reverse": langStore?.rtl === true,
        })}>
          <PlusCircledIcon className={cn("w-4 h-4 mr-2", {
            "mr-0 ml-2": langStore?.rtl === true,
          })} />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <div className="flex flex-row gap-1">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className={cn("flex flex-row font-normal rounded-sm", {
                      "flex-row-reverse": langStore?.rtl === true,
                    })}
                  >
                    <span className={cn("mr-2", {
                      "ml-2 mr-0": langStore?.rtl === true,
                    })}>{selectedValues.size}</span>
                    <span>
                      {
                        dict?.selected || "selected"
                      }
                    </span>
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="px-1 font-normal rounded-sm"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align={
        langStore?.rtl === true ? "end" : "start"
      }>
        <Command>
          <CommandInput className={cn("text-left", {
            "text-right": langStore?.rtl === true
          })} placeholder={title} />
          <CommandList>
            <CommandEmpty>
              {
                dict?.noResultsFound || "No results found."
              }
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    className={cn("flex items-center justify-start", {
                      "flex-row-reverse": langStore?.rtl === true
                    })}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                        {
                          "ml-2 mr-0": langStore?.rtl === true,
                        }
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                    )}
                    <span className="whitespace-nowrap">
                      {option.label}
                    </span>
                    {facets?.get(option.value) && (
                      <span className={cn("flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs", {
                        "mr-auto ml-0": langStore?.rtl === true,
                      })}>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    {
                      dict?.clearFilters || "Clear filters"
                    }
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}