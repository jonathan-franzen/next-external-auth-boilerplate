'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'
import { refresh } from '@/features/auth/actions/refresh'

export const Refresh = () => {
  const router = useRouter()

  useEffect(() => {
    const refreshAuthSession = async () => {
      await refresh().then(() => {
        router.refresh()
      })
    }

    void refreshAuthSession()
  }, [router])

  return (
    <div className="flex w-full justify-center">
      <LoadingSpinner />
    </div>
  )
}
