'use client'

import { ComponentPropsWithoutRef } from 'react'

import { Input } from '@/components/input'

interface FormInputProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label?: string
  error?: string | null
  required?: boolean
  className?: string
}

export const FormInput = ({
  name,
  label,
  error,
  required,
  className,
  ...inputProps
}: FormInputProps) => {
  const errorId = error ? `${name}-error` : undefined

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-xs font-medium text-slate-700"
        >
          {label}
          {required ? <span className="ml-0.5 text-pink-700">*</span> : null}
        </label>
      )}

      <Input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...inputProps}
      />

      {error && (
        <p id={errorId} className="mt-1 text-xs text-pink-700">
          {error}
        </p>
      )}
    </div>
  )
}
