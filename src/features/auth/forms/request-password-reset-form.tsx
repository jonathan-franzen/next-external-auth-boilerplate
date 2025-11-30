'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Form } from '@/components/form/form'
import { FormButton } from '@/components/form/form-button'
import { FormInput } from '@/components/form/form-input'
import { sendResetPasswordEmail } from '@/features/auth/actions/send-reset-password-email'

export const RequestPasswordResetForm = () => {
  const [state, actionSendResetPasswordEmail, isPending] = useActionState(
    sendResetPasswordEmail,
    null
  )

  useEffect(() => {
    if (state?.errors?.submit) {
      toast.error(state.errors.submit)
    }
    if (state?.message) {
      toast.success(state.message)
    }
  }, [state])

  return (
    <Form action={actionSendResetPasswordEmail}>
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required
        defaultValue={state?.email}
        error={state?.errors?.email}
      />

      <FormButton
        submitLabel="Request"
        submittingLabel="Requesting…"
        isSubmitting={isPending}
      />
    </Form>
  )
}
