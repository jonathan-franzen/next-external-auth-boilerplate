'use server'

import { redirect } from 'next/navigation'

import { getUsersApi } from '@/api/user/get-users.api'
import { Text } from '@/components-new/text'
import { ListUsersTable } from '@/features/admin/tables/list-users-table'
import { SaveAuthSession } from '@/features/auth/components/save-auth-session'
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

  const { res, authSession } = await getUsersApi({
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

  const { data, pageSize, count } = await parseApiResponse(res)

  if (!data.length && page > 0) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')

    redirect(`/admin?${params.toString()}`)
  }

  return (
    <>
      <SaveAuthSession authSession={authSession} />
      <div className="mt-12 mb-4 flex justify-between">
        <Text as="h4" variant="body">
          Listing all users
        </Text>
      </div>
      <ListUsersTable users={data} itemCount={count} pageSize={pageSize} />
    </>
  )
}

export default AdminPage
