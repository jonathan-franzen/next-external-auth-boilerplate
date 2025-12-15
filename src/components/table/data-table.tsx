'use client'

import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: TableType<TData>
}

export function DataTable<TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="h-full overflow-scroll rounded-md border">
        <Table>
          <TableHeader className="top-0 z-10 bg-green-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="min-h-0 flex-1 overflow-y-scroll">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={
                    table.getVisibleLeafColumns().length || columns.length
                  }
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          Page {pageIndex + 1} of {pageCount}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
