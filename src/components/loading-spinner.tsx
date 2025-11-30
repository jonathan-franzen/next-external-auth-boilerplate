import { LoaderCircle } from 'lucide-react'

import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  className?: string
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return <LoaderCircle className={cn('animate-spinner size-12', className)} />
}
