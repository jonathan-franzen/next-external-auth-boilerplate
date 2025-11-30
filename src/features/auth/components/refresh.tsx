'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'

export const Refresh = () => {
  const router = useRouter()

  useEffect(() => {
    return router.refresh()
  }, [router])

  return (
    <div className="flex w-full justify-center">
      <LoadingSpinner />
    </div>
  )
}
