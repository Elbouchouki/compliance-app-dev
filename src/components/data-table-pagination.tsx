"use client"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (

    <div className="flex flex-col justify-between py-2 lg:items-center lg:flex-row ">
      <div className={cn("flex my-2 gap-1 text-sm lg:my-0 text-muted-foreground", {
        "flex-row-reverse": langStore?.rtl === true,
      })}>
        {/* <span>
          {table.getFilteredSelectedRowModel().rows.length}
        </span>
        <span>
          {
            dict?.of || "of"
          }
        </span>
        <span>
          {table.getFilteredRowModel().rows.length}
        </span>
        <span>
          {
            dict?.rowsSelected || "rows selected"
          }
        </span> */}
      </div>
      <div className={cn("flex flex-col gap-4  lg:items-center lg:flex-row ", {
        "lg:flex-row-reverse": langStore?.rtl
      })}>
        <div className={cn("flex flex-row items-center gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <p className="text-sm font-medium">
            {
              dict?.rowsPerPage || "Rows per page"
            }
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={cn("flex flex-row justify-end gap-3", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <div className={cn("flex flex-row w-[100px] items-center justify-start gap-1 lg:justify-center text-sm font-medium", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.page || "Page"
              }
            </span>
            <span>{table.getState().pagination.pageIndex + 1}</span>
            <span>
              {
                dict?.of || "of"
              }
            </span>
            <span>{table.getPageCount()}</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <Button
              variant="outline"
              className="hidden w-8 h-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">
                {
                  dict?.goToFirstPage || "Go to first page"
                }
              </span>
              <DoubleArrowLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">
                {
                  dict?.goToPreviousPage || "Go to previous page"
                }
              </span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">
                {
                  dict?.goToNextPage || "Go to next page"
                }
              </span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden w-8 h-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">
                {
                  dict?.goToLastPage || "Go to last page"
                }
              </span>
              <DoubleArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}