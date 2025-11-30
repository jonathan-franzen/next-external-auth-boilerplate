'use client'

import { ButtonHTMLAttributes } from 'react'

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean
  submitLabel?: string
  submittingLabel?: string
}

export const FormButton = ({
  isSubmitting,
  submitLabel = 'Submit',
  submittingLabel = 'Submitting…',
  ...buttonProps
}: FormButtonProps) => {
  return (
    <button type="submit" disabled={isSubmitting} {...buttonProps}>
      {isSubmitting ? submittingLabel : submitLabel}
    </button>
  )
}
