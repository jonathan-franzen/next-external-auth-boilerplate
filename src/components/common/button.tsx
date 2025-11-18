'use client'

import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import LoadingSpinner from '@/components/common/loading-spinner'

interface ButtonProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
}

function Button({
  children,
  className,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
}: ButtonProps): ReactNode {
  return (
    <button
      className={twMerge(
        'focus:outline-none disabled:cursor-not-allowed',
        className
      )}
      disabled={isLoading || disabled}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <LoadingSpinner size="md" /> : children}
    </button>
  )
}

export default Button
