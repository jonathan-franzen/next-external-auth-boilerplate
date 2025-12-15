'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Edit } from 'lucide-react'
import Link from 'next/link'

import { DataTable } from '@/components/table/data-table'
import { useDataTable } from '@/hooks/use-data-table'
import { User } from '@/packages/shared/types/user.types'

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
  {
    accessorKey: 'edit',
    header: '',
    cell: ({ row }) => (
      <Link href={`/admin/users/${row.original.id}/edit`}>
        <Edit />
      </Link>
    ),
  },
]

interface ListUsersTableProps {
  users: User[]
  usersCount: number
  pageSize: number
}

export const ListUsersTable = ({
  users,
  usersCount,
  pageSize,
}: ListUsersTableProps) => {
  const { table } = useDataTable(userColumns, users, usersCount, pageSize)

  return (
    <div className="min-h-0 flex-1">
      <DataTable columns={userColumns} table={table} />
    </div>
  )
}
