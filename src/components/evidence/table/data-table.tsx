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
import { DataTableToolbar } from "@/components/evidence/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "@/components/evidence/table/data-table-row-actions"
import { Evidence } from "@/types"
import { useStore } from "@/hooks/use-store"
import useEvidenceStore from "@/store/evidenceStore"
import { Badge } from "@/components/ui/badge"
import EditEvidenceDialog from "@/components/evidence/edit-evidence-dialog"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { trpc } from "@/app/_trpc/client"
import { Skeleton } from "@/components/ui/skeleton"
import TableSkeleton from "@/components/table-skeleton"


export function DataTable<TData, TValue>(
) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  const { user } = useUser()
  const evidences = trpc.evidence.getAll.useQuery()

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      reference: true,
      name: true,
      description: true,
      content: false,
      actions: true,
    })
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<Evidence>[] = [
    {
      id: "reference",
      accessorKey: "reference",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.reference || "Reference"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("reference") !== undefined &&
          <Badge variant="outline" >
            {row.getValue("reference")}
          </Badge>
        }
      </div>,
      filterFn: "includesString"
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.name || "Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("name")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.description || "Description"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("description")}
      </div>,
      filterFn: "includesString"
    }, {
      id: "content",
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.content || "Content"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {
          row.getValue("content")
        }
      </div>,
      filterFn: "includesString"
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const columnOrder = [
    "reference",
    "name",
    "description",
    "content",
    "actions"
  ]

  const table = useReactTable<any>({
    data: evidences.data ?? [],
    columns,
    initialState: {
      pagination: {
        pageSize: 5
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
  if (evidences.isLoading) {
    return <TableSkeleton elements={7} />
  }
  return (
    <div className="flex flex-col py-3 gap-4 bg-navbar border">
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
      <DataTablePagination table={table} />
      <EditEvidenceDialog />
    </div>
  )
}