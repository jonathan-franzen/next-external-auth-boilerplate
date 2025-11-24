import { PaginationState } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { parsePage } from '@/lib/search-params'

export function usePagination(itemCount: number, pageSize: number) {
  const searchParams = useSearchParams()

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(itemCount / pageSize)),
    [itemCount, pageSize]
  )

  const pageFromUrl = parsePage(searchParams.get('page'))

  const currentPage = Math.min(Math.max(pageFromUrl, 0), pageCount - 1)

  const paginationState = useMemo<PaginationState>(
    () => ({
      pageIndex: currentPage,
      pageSize,
    }),
    [currentPage, pageSize]
  )

  return {
    paginationState,
    pageCount,
  }
}
