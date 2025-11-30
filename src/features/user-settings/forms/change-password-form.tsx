'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Form } from '@/components/form/form'
import { FormButton } from '@/components/form/form-button'
import { FormInput } from '@/components/form/form-input'
import { changePassword } from '@/features/user-settings/actions/change-password'

export const ChangePasswordForm = () => {
  const [state, actionChangePassword, isPending] = useActionState(
    changePassword,
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
    <Form action={actionChangePassword}>
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        defaultValue={state?.password}
        error={state?.errors?.password}
      />

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
