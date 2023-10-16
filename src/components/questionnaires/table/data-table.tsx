// "use client";

// import * as React from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Eye, MoreHorizontal } from "lucide-react";
// import { EditQuestionnaire } from "../edit-questionnaire";
// import { useStore } from "@/hooks/use-store";
// import useQuestionnaireStore from "@/store/questionnaireStore";
// import useLangStore from "@/store/langagueStore";
// import { cn } from "@/lib/utils";
// import { Edit2, Trash2Icon } from "lucide-react";
// import { toast } from "sonner";
// import { ViewQuestionnaire } from "../ViewQuestionnaire";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { DataTableColumnHeader } from "@/components/data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
// import { DataTableToolbar } from "./data-table-toolbar";

// export function DataTable<TData, TValue>() {
//   const questionnaireStore = useStore(useQuestionnaireStore, (state) => state);
//   const data = questionnaireStore?.questionnaires ?? [];
//   const langStore = useStore(useLangStore, (state) => state);
//   const dict = langStore?.getDictionary();
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [globalFilter, setGlobalFilter] = React.useState<string>("");

//   const columns: any = [
//     {
//       id: "name",
//       accessorKey: "name",
//       header: ({ column }) => (
//         <DataTableColumnHeader
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//           column={column}
//           title={dict?.name || "name"}
//         />
//       ),
//       cell: ({ row }) => (
//         <div
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//         >
//           {row.getValue("name")}
//         </div>
//       ),
//       filterFn: "includesString",
//     },
//     {
//       id: "vendor",
//       accessorKey: "vendor",
//       header: ({ column }) => (
//         <DataTableColumnHeader
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//           column={column}
//           title={dict?.vendor || "vendor"}
//         />
//       ),
//       cell: ({ row }) => (
//         <div
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//         >
//           {row.getValue("vendor")}
//         </div>
//       ),
//       filterFn: "includesString",
//     },
//     {
//       id: "description",
//       accessorKey: "description",
//       header: ({ column }) => (
//         <DataTableColumnHeader
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//           column={column}
//           title={dict?.description || "Reporting To"}
//         />
//       ),
//       cell: ({ row }) => (
//         <div
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//         >
//           {row.getValue("description")}
//         </div>
//       ),
//       filterFn: "includesString",
//     },

//     {
//       id: "questions",
//       accessorKey: "questions",
//       header: ({ column }) => (
//         <DataTableColumnHeader
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//           column={column}
//           title={dict?.questions || "questions"}
//         />
//       ),
//       cell: ({ row }) => (
//         <div
//           className={cn("text-left whitespace-nowrap", {
//             "text-right": langStore?.rtl,
//           })}
//         >
//           {row.getValue("questions")[0].value}
//         </div>
//       ),
//     },

//     {
//       id: "actions",
//       cell: ({ row }) => <DataTableRowActions row={row} />,
//     },
//   ];
//   const columnOrder = ["name", "vendor", "description", "questions", "actions"];
//   const table = useReactTable<any>({
//     data,
//     columns,
//     initialState: {
//       pagination: {
//         pageSize: 5,
//       },
//     },
//     state: {
//       columnOrder: langStore?.rtl ? columnOrder.reverse() : columnOrder,
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   });
//   const handleGlobalFilter = (s: string) => {
//     setGlobalFilter(s);
//   };
//   return (
//     <div className="px-4 py-3 space-y-4 dark:border bg-card">
//       <DataTableToolbar
//         globalFilter={globalFilter}
//         setGlobalFilter={handleGlobalFilter}
//         table={table}
//       />
//       <div className="border rounded-md ">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   {dict?.noResultsFound || "No results found"}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* <DataTablePagination table={table} /> */}
//       <EditQuestionnaire />
//       <ViewQuestionnaire />
//     </div>
//   );
// }
