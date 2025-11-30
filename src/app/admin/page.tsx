'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { getUsersApi } from '@/api/user/get-users.api'
import { RscError } from '@/components/rsc-error'
import { Text } from '@/components/text'
import { ListUsersTable } from '@/features/admin/tables/list-users-table'
import { parseApiResponse } from '@/lib/api'
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

  const res = await getUsersApi({
    pagination: { page: page, pageSize: 1 },
    filter: {},
    ...(orderBy
      ? {
          orderBy: {
            [orderBy]: order,
          },
        }
      : {}),
  })

  const [err, awaitedRed] = await until(() => parseApiResponse(res))

  if (err) {
    return <RscError err={err} />
  }

  if (!awaitedRed.data.length && page > 0) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')

    redirect(`/admin?${params.toString()}`)
  }

  return (
    <>
      <div className="mt-12 mb-4 flex justify-between">
        <Text as="h4" variant="body">
          Listing all users
        </Text>
      </div>
      <ListUsersTable
        users={awaitedRed.data}
        usersCount={awaitedRed.count}
        pageSize={awaitedRed.pageSize}
      />
    </>
  )
}

export default AdminPage
