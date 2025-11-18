'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, startTransition, useEffect, useState } from 'react'

import LoadingSpinner from '@/components/common/loading-spinner'

interface RefreshProps {
  loadingIndicator?: boolean
}

function Refresh({ loadingIndicator = false }: RefreshProps): ReactNode {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const refresh = (): void => {
      router.refresh()
      startTransition(() => {
        setIsLoading(false)
      })
    }

    void refresh()
  }, [router])

  return !isLoading || !loadingIndicator ? undefined : (
    <div className="flex w-full justify-center">
      <LoadingSpinner />
    </div>
  )
}

export default Refresh
