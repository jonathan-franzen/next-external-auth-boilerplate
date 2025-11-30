'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { Form } from '@/components/form/form'
import { FormButton } from '@/components/form/form-button'
import { logout } from '@/features/auth/actions/logout'

export const LogoutForm = () => {
  const [state, actionLogout, isPending] = useActionState(logout, null)

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Form action={actionLogout}>
      <FormButton
        submitLabel="SIGN OUT"
        submittingLabel="SIGNING OUT..."
        isSubmitting={isPending}
      />
    </Form>
  )
}
