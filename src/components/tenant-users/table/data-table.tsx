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
import { DataTableToolbar } from "@/components/tenant-users/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "@/components/tenant-users/table/data-table-row-actions"
import { useStore } from "@/hooks/use-store"
import { Badge } from "@/components/ui/badge"
import EditUserDialog from "@/components/tenant-users/edit-tenant-users-dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { EmailAddress, User } from "@clerk/nextjs/server"
import { Skeleton } from "@/components/ui/skeleton"
import { GET_ROLES } from "@/mock"
import TableSkeleton from "@/components/table-skeleton"

export function DataTable<TData, TValue>(
) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const users = trpc.user.getAll.useQuery()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const getFormattedRole = (role: string) => {
    if (role.toLocaleLowerCase() === "none") return dict?.none || "None"
    const formatted = GET_ROLES(langStore?.lang).filter(r => r.value === role.toLocaleLowerCase())[0]?.label
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }

  const columns: ColumnDef<User>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (<></>),
      cell: ({ row }) => <></>,
    },
    {
      id: "avatar",
      accessorKey: "profileImageUrl",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title="" />
      ),
      cell: ({ row }) =>
        <div className="flex justify-center items-center m-1 mx-2 w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.getValue("avatar")} alt={`${row.getValue("firstName")}'s avatar`} />
            <AvatarFallback>
              <Skeleton className="w-8 h-8 rounded" />
            </AvatarFallback>
          </Avatar>
        </div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "firstName",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.firstName || "First Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("firstName")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.lastName || "Last Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("lastName")}
      </div>,
      filterFn: "includesString"
    },

    {
      id: "email",
      accessorKey: "emailAddresses",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.email || "Email"
        } />
      ),
      cell: ({ row }) => {
        const emails = row.getValue("email") as EmailAddress[]
        let email = ""
        if (emails) {
          email = emails[0].emailAddress
        }
        return <div className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} >
          {email}
        </div>
      },
      filterFn: "includesString"
    },
    {
      id: "active",
      accessorKey: "publicMetadata",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.active || "Active"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap text-red-500", {
        "text-right": langStore?.rtl,
      }, {
        "text-green-500": (row.getValue("active") as any)?.active,
      })} >
        • {
          (row.getValue("active") as any)?.active ?
            dict?.enabled || "Enabled"
            : dict?.disabled || "Disabled"
        }
      </div>,
      filterFn: "includesString"
    },
    {
      id: "role",
      accessorKey: "publicMetadata",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.role || "Role"
        } />
      ),
      cell: ({ row }) => {
        let role = "none"

        const metadata: any = row.getValue("role")

        if (metadata?.role) {
          role = (metadata.role as string)
          role = role.charAt(0).toUpperCase() + role.slice(1)
        }

        return <div className={cn("lg:whitespace-normal whitespace-nowrap flex gap-1 flex-wrap justify-start", {
          "flex-row-reverse": langStore?.rtl
        })} >
          <Badge className="bg-blue-500 hover:bg-blue-500 rounded-xl font-normal text-white" >
            • {getFormattedRole(role)}
          </Badge>
        </div>
      },
      filterFn: "includesString"
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const columnOrder = [
    "avatar",
    "firstName",
    "lastName",
    "email",
    "active",
    "role",
    "actions"
  ]

  const table = useReactTable<any>({
    data: users.data ?? [],
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

  if (users.isLoading) {
    return <TableSkeleton />
  }
  return (
    <div className="flex  flex-col py-3 gap-4 bg-navbar border">
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
                    dict?.noResultsFound || "No Results found"
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
      <EditUserDialog />
    </div>
  )
}