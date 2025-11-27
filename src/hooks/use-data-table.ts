import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef } from 'react'

import { usePagination } from '@/hooks/use-pagination'
import { useSorting } from '@/hooks/use-sorting'
import { OrderDirection } from '@/types/common.types'

type UseDataTableResult<TData> = {
  table: Table<TData>
}

const NAVIGATION_THROTTLE_MS = 400

export const useDataTable = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  itemCount: number,
  pageSize: number
): UseDataTableResult<TData> => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastNavigationTimeRef = useRef(0)

  const { paginationState, pageCount } = usePagination(itemCount, pageSize)
  const { sortingState } = useSorting()

  const navigateWithParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const now = Date.now()
      const diff = now - lastNavigationTimeRef.current

      if (diff < NAVIGATION_THROTTLE_MS) {
        return
      }

      lastNavigationTimeRef.current = now

      const params = new URLSearchParams(searchParams.toString())
      update(params)
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting: sortingState,
      pagination: paginationState,
    },
    pageCount,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sortingState) : updater

      navigateWithParams((params) => {
        if (nextSorting.length === 0) {
          params.delete('orderBy')
          params.delete('order')
          return
        }

        const sort = nextSorting[0]
        params.set('orderBy', sort.id)
        params.set(
          'order',
          sort.desc ? OrderDirection.DESC : OrderDirection.ASC
        )
      })
    },

    onPaginationChange: (updater) => {
      const nextPagination =
        typeof updater === 'function' ? updater(paginationState) : updater

      navigateWithParams((params) => {
        params.set('page', String(nextPagination.pageIndex + 1))
      })
    },
  })

  return { table }
}
