import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { OrderDirection } from '@/types/general.types'

export const useDataTable = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  totalCount: number,
  pageSize: number
) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const navigateWithParams = (update: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString())
    update(params)
    router.push(`${pathname}?${params.toString()}`)
  }

  const parsePage = (value: string | null): number => {
    if (value == null) return 0
    const num = Number(value)
    return Number.isNaN(num) || num < 0 ? 0 : num
  }

  const pageFromUrl = parsePage(searchParams.get('page'))

  const sortingFromUrl = useMemo(() => {
    const orderBy = searchParams.get('orderBy')
    const order = searchParams.get('order')

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

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(totalCount / pageSize)),
    [totalCount, pageSize]
  )

  const currentPage = Math.min(Math.max(pageFromUrl, 0), pageCount - 1)

  const paginationState = {
    pageIndex: currentPage,
    pageSize,
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingFromUrl,
      pagination: paginationState,
    },
    pageCount,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sortingFromUrl) : updater

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
      const nextPageIndex =
        typeof updater === 'function'
          ? updater(paginationState).pageIndex
          : updater.pageIndex

      navigateWithParams((params) => {
        params.set('page', String(Number(nextPageIndex)))
      })
    },
  })

  return { table, currentPage, pageCount }
}
