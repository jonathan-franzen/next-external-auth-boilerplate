'use client'

import { until } from '@open-draft/until'
import { useCallback, useTransition } from 'react'
import { toast } from 'sonner'

import { FormButton } from '@/components-new/form/form-button'
import { resendVerifyEmail } from '@/features/auth/actions/resend-verify-email'
import { getErrorMessage } from '@/utils/get-error-message'

interface ResendVerifyEmailButtonProps {
  email: string
}

export const ResendVerifyEmailButton = ({
  email,
}: ResendVerifyEmailButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = useCallback(() => {
    startTransition(async () => {
      const [err, res] = await until(() => resendVerifyEmail(email))

      if (err) {
        toast.error(getErrorMessage(err))
      } else {
        toast.success(res.message)
      }
    })
  }, [email])

  return (
    <FormButton
      type="button"
      onClick={handleClick}
      submitLabel="RESEND EMAIL"
      submittingLabel="RESENDING..."
      isSubmitting={isPending}
    />
  )
}
