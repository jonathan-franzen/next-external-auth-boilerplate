'use server'

import { until } from '@open-draft/until'
import { isHttpError } from 'http-errors'
import { redirect } from 'next/navigation'

import { getUsersApi } from '@/api/user/get-users.api'
import Refresh from '@/components/features/refresh'
import { Text } from '@/components-new/text'
import { ListUsersTable } from '@/features/admin/tables/list-users-table'
import { OrderDirection } from '@/types/general.types'
import { getUsersOrderBy } from '@/validators/user/get-users.validator'

interface AdminPageProps {
  searchParams: Promise<{
    page?: string
    orderBy?: string
    order?: string
  }>
}

const getOrderBy = (orderByParam?: string, orderParam?: string) => {
  const validOptions = Object.keys(getUsersOrderBy.shape)

  if (orderByParam && validOptions.includes(orderByParam)) {
    return { orderBy: orderByParam, order: orderParam ?? OrderDirection.DESC }
  }

  return { orderBy: undefined, order: undefined }
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const {
    page: pageParam = '0',
    orderBy: orderByParam,
    order: orderParam,
  } = await searchParams

  const { order, orderBy } = getOrderBy(orderByParam, orderParam)

  const page = Number(pageParam)

  const [err, res] = await until(() =>
    getUsersApi({
      pagination: { page, pageSize: 1 },
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

  if ((!res.data || res.data.length === 0) && page > 0) {
    const params = new URLSearchParams({
      page: '0',
      ...(orderBy ? { orderBy } : {}),
      ...(order ? { order } : {}),
    })

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
        totalCount={res.count}
        pageSize={res.pageSize}
      />
    </>
  )
}

export default AdminPage
