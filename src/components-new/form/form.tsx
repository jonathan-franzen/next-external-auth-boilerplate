'use client'

import { FormHTMLAttributes } from 'react'

import { FormError } from '@/components-new/form/form-error'
import { cn } from '@/utils/cn'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  error?: string | null
}

export const Form = ({
  children,
  className,
  error,
  ...formProps
}: FormProps) => {
  return (
    <form noValidate className={cn('space-y-3', className)} {...formProps}>
      {children}

      {error && <FormError error={error} />}
    </form>
  )
}
