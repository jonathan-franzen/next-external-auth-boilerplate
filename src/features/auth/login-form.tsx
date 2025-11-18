'use client'

import { useActionState } from 'react'

import { Form } from '@/components-new/form/form'
import { FormButton } from '@/components-new/form/form-button'
import { FormInput } from '@/components-new/form/form-input'
import { login } from '@/features/auth/actions/login'

export const LoginForm = () => {
  const [state, actionLogin, isPending] = useActionState(login, null)

  return (
    <Form action={actionLogin} error={state?.errors?.submit}>
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required
        defaultValue={state?.email}
        error={state?.errors?.email}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        defaultValue={state?.password}
        error={state?.errors?.password}
      />

      <FormButton
        submitLabel="Login"
        submittingLabel="Logging in…"
        isSubmitting={isPending}
      />
    </Form>
  )
}
