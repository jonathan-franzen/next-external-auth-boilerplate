'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

import DropdownSelector from '@/components/common/dropdown-selector'

const sortingOptions: { label: string; value: string }[] = [
  { label: 'First Name', value: 'firstName' },
  { label: 'Last Name', value: 'lastName' },
  { label: 'Created At', value: 'createdAt' },
]

interface SortingSelectorProps {
  className?: string
  initialSortingOption: string
}

function SortingSelector({
  className,
  initialSortingOption,
}: SortingSelectorProps): ReactNode {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOnChange = (newSortBy: string): void => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sortBy', newSortBy)
    if (params.has('page')) {
      params.set('page', '1')
    }
    router.push(`/admin?${params.toString()}`)
  }

  return (
    <DropdownSelector<string>
      className={className}
      id="sort"
      initialValue={initialSortingOption}
      label="Sort by:"
      onChange={handleOnChange}
      options={sortingOptions}
    />
  )
}

export default SortingSelector
