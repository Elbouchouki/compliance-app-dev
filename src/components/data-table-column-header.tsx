
"use client"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={cn("flex flex-row w-full justify-start", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <Button
              variant="ghost"
              size="sm"
              className={cn("flex flex-row items-center gap-3 h-8 data-[state=open]:bg-accent ", {
                "flex-row-reverse": langStore?.rtl === true,
              })}
            >
              <span className="">{title}</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="w-4 h-4 ml-2" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="w-4 h-4 ml-2" />
              ) : (
                <CaretSortIcon className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={
          langStore?.rtl === true ? "end" : "start"
        }>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className={cn("flex flex-row items-center gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>
              {
                dict?.asc || "Asc"
              }
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className={cn("flex flex-row items-center gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>
              {
                dict?.desc || "Desc"
              }
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className={cn("flex flex-row items-center gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <EyeNoneIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span>
              {
                dict?.hide || "Hide"
              }
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}