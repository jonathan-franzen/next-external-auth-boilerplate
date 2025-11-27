import { SortingState } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { parseOrderBy } from '@/lib/search-params'
import { OrderDirection } from '@/types/common.types'

export function useSorting() {
  const searchParams = useSearchParams()

  const sortingState = useMemo<SortingState>(() => {
    const { orderBy, order } = parseOrderBy(
      searchParams.get('orderBy'),
      searchParams.get('order')
    )

    if (!orderBy) {
      return []
    }

    return [
      {
        id: orderBy,
        desc: order === OrderDirection.DESC,
      },
    ]
  }, [searchParams])

  return {
    sortingState,
  }
}
