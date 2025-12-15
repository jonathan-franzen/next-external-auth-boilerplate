'use server'

import { until } from '@open-draft/until'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUsersApi } from '@/api/user/get-users.api'
import { RscError } from '@/components/rsc-error'
import { Text } from '@/components/text'
import { ListUsersTable } from '@/features/admin/tables/list-users-table'
import { parseOrderBy, parsePage } from '@/lib/search-params'

interface AdminPageProps {
  searchParams: Promise<{
    page?: string
    orderBy?: string
    order?: string
  }>
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const {
    page: pageParam,
    orderBy: orderByParam,
    order: orderParam,
  } = await searchParams

  const { order, orderBy } = parseOrderBy(orderByParam, orderParam)
  const page = parsePage(pageParam)

  const [err, res] = await until(() =>
    getUsersApi({
      pagination: { page: page, pageSize: 20 },
      filter: {},
      ...(orderBy
        ? {
            orderBy: {
              [orderBy]: order,
            },
          }
        : {}),
    })
  )

  if (err) {
    return <RscError err={err} />
  }

  if (!res.data.length && page > 0) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')

    redirect(`/admin?${params.toString()}`)
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <h1 className="text-center text-sm font-semibold text-gray-700">
        PROTECTED ADMIN PAGE
      </h1>
      <div className="mt-12 mb-4 flex justify-between">
        <Text as="h4" variant="body">
          Listing all users
        </Text>
      </div>
      <ListUsersTable
        users={res.data}
        usersCount={res.count}
        pageSize={res.pageSize}
      />
      <Link className="mt-2 flex justify-center" href="/dashboard">
        Back to dashboard
      </Link>
    </div>
  )
}

export default AdminPage
