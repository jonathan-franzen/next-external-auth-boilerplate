'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components-new/table/data-table'
import { useDataTable } from '@/hooks/use-data-table'
import { User } from '@/types/user/user.types'

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: 'firstName',
    header: 'First name',
    cell: ({ row }) => <span>{row.original.firstName}</span>,
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
    cell: ({ row }) => <span>{row.original.lastName}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    ),
  },
]

interface ListUsersTableProps {
  users: User[]
  totalCount: number
  pageSize: number
}

export const ListUsersTable = ({
  users,
  totalCount,
  pageSize,
}: ListUsersTableProps) => {
  const { table, currentPage, pageCount } = useDataTable(
    userColumns,
    users,
    totalCount,
    pageSize
  )

  return (
    <DataTable
      columns={userColumns}
      table={table}
      currentPage={currentPage}
      pageCount={pageCount}
    />
  )
}
