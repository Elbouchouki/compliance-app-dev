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
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import EditAssessmentDialog from "@/components/risk-register/edit-risk-dialog"

import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { Risk, Tag } from "@/types"
import { DataTableRowActions } from "./data-table-row-actions"
import { riskStore } from "@/store/riskStore"
import { CATEGORY, RISK_STATUS } from "@/mock"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { trpc } from "@/app/_trpc/client"
import { Skeleton } from "@/components/ui/skeleton"
import TableSkeleton from "@/components/table-skeleton"

export function DataTable<TData, TValue>(
) {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()
  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  })
  const tags = trpc.tag.getAll.useQuery({
    userId: user?.id
  })

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const categoryHandler = (id: any) => {
    if (id?.length == 0) return ""
    return CATEGORY(langStore?.lang).filter(c => c.id === id)[0]?.value;
  }

  const subcategoryHandler = (cid: string, subcid: string) => {
    if (cid?.length == 0) return ""
    return CATEGORY(langStore?.lang).filter(c => c.id === cid)[0]?.subCategory?.filter(c => c.id === subcid)[0]?.value;
  }

  const riskStatusHandler = (id: string) => {
    return RISK_STATUS(langStore?.lang).filter(s => s.id === id)[0]?.value
  }

  const tagsHandler = (tagId: string) => {
    if (!tagId?.length) return ""
    const tag = tags.data?.filter(t => t.id === tagId)[0]
    return <Badge key={tag?.id}>{tag?.name}</Badge>
  }

  const columns: ColumnDef<Risk>[] = [
    {
      id: "riskName",
      accessorKey: "riskName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.riskName || "Risk Name"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("riskName"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.description || "Description"} />
      ),
      cell: ({ row }) => <div className={cn("text-left max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("description"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "owner",
      accessorKey: "owner",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.owner || "Owner"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("owner"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "priority",
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.priority || "Priority"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {((row.getValue("impact") as number) * (row.getValue("likelihood") as number))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "impact",
      accessorKey: "impact",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.impact || "Impact"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(row.getValue("impact"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "likelihood",
      accessorKey: "likelihood",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.impact || "Likelihood"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(row.getValue("likelihood"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "residualRisk",
      accessorKey: "residualRisk",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.residualRisk || "Residual Risk"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(parseInt(row.getValue("likelihood")) * parseInt(row.getValue("impact")) * 4)}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "categoryId",
      accessorKey: "categoryId",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.category || "Category"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(categoryHandler(row.getValue("categoryId")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "subCategoryId",
      accessorKey: "subCategoryId",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.subcategory || "Subcategory"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(subcategoryHandler(row.getValue("categoryId"), row.getValue("subCategoryId")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "riskStatusId",
      accessorKey: "riskStatusId",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.riskStatus || "Risk Status"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(riskStatusHandler(row.getValue("riskStatusId")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "tagId",
      accessorKey: "tagId",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.tag || "Tag"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center gap-2 items-center text-center whitespace-nowrap"} >
        {tagsHandler(row.getValue("tagId"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "dateRaised",
      accessorKey: "dateRaised",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.createDate || "Date Raised"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(new Date(row.getValue("dateRaised")).toLocaleDateString())}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.updateDate || "Updated Date"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(new Date(row.getValue("updatedDate"))).toLocaleDateString()}
      </div>,
      filterFn: "includesStringSensitive"
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={dict?.actions || "Actions"} />
      ),
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const columnOrder = [
    "select",
    "riskName",
    "description",
    "owner",
    "impact",
    "likelihood",
    "priority",
    "residualRisk",
    "categoryId",
    "subCategoryId",
    "riskStatusId",
    "tagId",
    "dateRaised",
    "updatedDate",
    "actions"
  ]
  const table = useReactTable<any>({
    data: risks.data ?? [],
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

  if (risks.isLoading) {
    return <TableSkeleton />
  }
  return (
    <div className="flex flex-col py-3 gap-4 bg-navbar border rounded-lg">
      <div className="mx-2">
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
      <EditAssessmentDialog />
    </div>
  )
}