import { useState } from 'react'

export function usePagination() {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  })
  const { page, pageSize } = pagination

  return {
    page,
    pageSize,
    onPaginationChange: setPagination,
  }
}
