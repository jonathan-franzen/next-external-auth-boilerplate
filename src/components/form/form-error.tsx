'use client'

import { CircleX } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface FormErrorProps extends HTMLAttributes<HTMLDivElement> {
  error?: string | null
}

export const FormError = ({ error, ...divProps }: FormErrorProps) => {
  if (!error) return null

  return (
    <div
      className="mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2"
      {...divProps}
    >
      <CircleX fill="#831843" size={16} />

      <p className="text-xs text-pink-900">{error}</p>
    </div>
  )
}
