'use server'

import { until } from '@open-draft/until'
import { isHttpError } from 'http-errors'
import { redirect } from 'next/navigation'

import { getUsersApi } from '@/api/user/get-users.api'
import { getUsersApiInternal } from '@/api/user/get-users.api-internal'
import Refresh from '@/components/features/refresh'
import { Text } from '@/components-new/text'
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
    getUsersApiInternal({
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
  )

  if (err) {
    // Fallback in-case refresh not performed in middleware.
    if (isHttpError(err) && err.status === 401) {
      return <Refresh loadingIndicator={true} />
    } else {
      throw err
    }
  }

  if (!res.data.length && page > 0) {
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
        users={res.data}
        itemCount={res.count}
        pageSize={res.pageSize}
      />
    </>
  )
}

export default AdminPage
