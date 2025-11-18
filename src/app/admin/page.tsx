'use server'

import { until } from '@open-draft/until'
import { isHttpError } from 'http-errors'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { getUsersApiAction } from '@/actions/api/user/user.api.actions'
import Refresh from '@/components/features/refresh'
import PageSelector from '@/components/page-specific/admin/page-selector'
import SortingSelector from '@/components/page-specific/admin/sorting-selector'
import UsersContainer from '@/components/page-specific/admin/users-container'

interface AdminPageProps {
  searchParams: Promise<{
    page?: string
    sortBy?: string
  }>
}

async function AdminPage({ searchParams }: AdminPageProps): Promise<ReactNode> {
  const { page = '1', sortBy = 'createdAt' } = await searchParams
  const pageNumber = Number(page)

  const [error, data] = await until(() =>
    getUsersApiAction({ page: pageNumber, sortBy }, true)
  )

  if (error) {
    // Fallback in-case refresh not performed in middleware.
    if (isHttpError(error) && error.status === 401) {
      return <Refresh loadingIndicator={true} />
    } else {
      throw error
    }
  }

  if (!data && pageNumber > 1) {
    const params = new URLSearchParams({ page, sortBy })
    params.set('page', '1')
    redirect(`/admin?${params.toString()}`)
  }

  return (
    <>
      <div className="mt-12 mb-4 flex justify-between">
        <p>Listing all users</p>
        <SortingSelector initialSortingOption={sortBy} />
      </div>
      <UsersContainer page={page} sortBy={sortBy} users={data?.users || []} />
      {data && data.pagination.totalPages > 1 && (
        <PageSelector
          className="mt-4"
          currentPage={data.pagination.page}
          totalPages={data.pagination.totalPages}
        />
      )}
    </>
  )
}

export default AdminPage
