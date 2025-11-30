'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Form } from '@/components/form/form'
import { FormButton } from '@/components/form/form-button'
import { FormInput } from '@/components/form/form-input'
import { resetPassword } from '@/features/auth/actions/reset-password'

interface ResetPasswordFormProps {
  resetPasswordToken: string
}

export const ResetPasswordForm = ({
  resetPasswordToken,
}: ResetPasswordFormProps) => {
  const [state, actionResetPassword, isPending] = useActionState(
    resetPassword.bind(null, resetPasswordToken),
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
    <Form action={actionResetPassword}>
      <FormInput
        type="password"
        name="newPassword"
        placeholder="New password"
        autoComplete="new-password"
        required
        defaultValue={state?.newPassword}
        error={state?.errors?.newPassword}
      />

      <FormButton
        submitLabel="Change password"
        submittingLabel="Changing…"
        isSubmitting={isPending}
      />
    </Form>
  )
}
