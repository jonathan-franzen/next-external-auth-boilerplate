'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'
import { refresh } from '@/features/auth/actions/refresh'

export let refreshPromise: Promise<void> | null = null

async function refreshCall() {
  if (refreshPromise) {
    return refreshPromise
  }

  refreshPromise = (async () => {
    try {
      await refresh()
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

export const Refresh = () => {
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    const refreshAuthSession = async () => {
      await refreshCall()
      if (!cancelled) {
        router.refresh()
      }
    }

    void refreshAuthSession()

    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="flex w-full justify-center">
      <LoadingSpinner />
    </div>
  )
}
