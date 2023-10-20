"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableToolbar } from "@/components/gap-assessment/details/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { useStore } from "@/hooks/use-store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import useLangStore from "@/store/langagueStore"
import { GET_MATURITY_LEVELS } from "@/mock"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Control, MaturityLevel } from "@prisma/client"
import { trpc } from "@/app/_trpc/client"
import { Skeleton } from "@/components/ui/skeleton"
import TableSkeleton from "@/components/table-skeleton"


export function DataTable<TData, TValue>(
  {
    assessmentScopeId
  }: {
    assessmentScopeId: string
  }
) {
  const pathname = usePathname()

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const controls = trpc.control.getControlsByAssessmentScope.useQuery({
    assessmentScopeId
  })

  const MATURITY_LEVELS = GET_MATURITY_LEVELS(langStore?.lang)

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<Control>[] = [
    {
      id: "id",
      accessorKey: "control.id",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="ml-2 whitespace-normal"
          column={column}
          title={
            dict?.controlCode || "Control Code"
          } />
      ),
      cell: ({ row }) => <div className={cn("whitespace-normal", {
        "text-right": langStore?.rtl === true
      })}>
        {row.getValue("id") !== undefined &&
          <Badge variant="outline" >
            {row.getValue("id")}
          </Badge>
        }
      </div>,
      filterFn: "arrIncludesSome",
      enableHiding: false,
    },
    {
      id: "framework",
      accessorKey: "control.Framework.name",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("whitespace-normal", {
          "text-right": langStore?.rtl === true
        })}
          column={column}
          title={
            dict?.framework || "Framework"
          }
        />
      ),
      cell: ({ row }) => (
        <div className={cn("whitespace-normal", {
          "text-right": langStore?.rtl === true
        })}>
          {row.getValue("framework")}
        </div>
      ),
      enableHiding: false,
      enableSorting: false,
      filterFn: "arrIncludesSome"
    },
    {
      id: "maturityFilter",
      accessorKey: "maturityFilter",
      header: ({ column }) => (<></>),
      cell: ({ row }) => (<></>),
      enableHiding: false,
      enableSorting: false,
      filterFn: "includesStringSensitive"
    },
    {
      id: "description",
      accessorKey: "control.description",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("whitespace-normal", {
          "text-right": langStore?.rtl === true
        })}
          column={column}
          title={
            dict?.description || "Description"
          }
        />
      ),
      cell: ({ row }) => <div className={cn("whitespace-normal", {
        "text-right": langStore?.rtl === true
      })}>
        {row.getValue("description")}
      </div>,
      filterFn: "includesString"
    }, {
      id: "maturity",
      accessorKey: "maturity",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("whitespace-normal", {
          "text-right": langStore?.rtl === true
        })}
          column={column}
          title={
            dict?.maturity || "Maturity"
          }
        />
      ),
      cell: ({ row }) => <div className={cn("flex flex-row items-start whitespace-normal gap-1", {
        "flex-row-reverse": langStore?.rtl
      })}>
        {(row.getValue("maturity") as MaturityLevel).id !== "Unanswered" ?
          <Badge variant="outline" className={cn("text-white", (row.getValue("maturity") as MaturityLevel).color)}>
            {(row.getValue("maturity") as MaturityLevel).id}
          </Badge> : null
        }
        < span className="whitespace-nowrap" >
          {
            MATURITY_LEVELS.filter((m) => m.id === (row.getValue("maturity") as MaturityLevel).id).map((m) => m?.label)[0]
          }
        </span >
      </div >,
      filterFn: "arrIncludesSome"
    }, {
      id: "action",
      accessorKey: "action",
      header: ({ column }) => (<></>),
      cell: ({ row }) => (
        <Link href={`${pathname}/${((row.original as any).control as Control).id}`} >
          <Button variant='ghost' className={cn("flex flex-row items-center gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}
          >
            <Icons.view className="w-4 h-4 " />
            <span>
              {
                dict?.view || "View"
              }
            </span>
          </Button>
        </Link>
      ),
      enableHiding: false,
    }
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")


  const columnOrder = [
    "id",
    "maturity",
    "framework",
    "maturityFilter",
    "description",
    "action"
  ]

  const table = useReactTable<any>({
    data: controls.data ?? [],
    columns,
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    state: {
      columnOrder: langStore?.rtl ? columnOrder.reverse() : columnOrder,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleGlobalFilter = (s: string) => {
    setGlobalFilter(s)
  }


  if (controls.isLoading) {
    return <TableSkeleton elements={7} />
  }

  return (
    <div className="flex flex-col py-3 gap-4 bg-navbar border rounded-lg">
      <div className="mx-6">
        <DataTableToolbar globalFilter={globalFilter} setGlobalFilter={handleGlobalFilter} table={table} />
      </div>
      <div className="border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {
                    dict?.noResultsFound || "No results found"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mx-6">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}