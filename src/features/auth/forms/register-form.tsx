'use client'

import { useActionState } from 'react'

import { Form } from '@/components/form/form'
import { FormButton } from '@/components/form/form-button'
import { FormInput } from '@/components/form/form-input'
import { register } from '@/features/auth/actions/register'

export const RegisterForm = () => {
  const [state, actionRegister, isPending] = useActionState(register, null)

  return (
    <Form action={actionRegister} error={state?.errors?.submit}>
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
        type="text"
        name="firstName"
        placeholder="First Name"
        autoComplete="given-name"
        required
        defaultValue={state?.password}
        error={state?.errors?.password}
      />

      <FormInput
        type="text"
        name="lastName"
        placeholder="Last Name"
        autoComplete="family-name"
        required
        defaultValue={state?.password}
        error={state?.errors?.password}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        required
        defaultValue={state?.password}
        error={state?.errors?.password}
      />

      <FormButton
        submitLabel="Register"
        submittingLabel="Registering…"
        isSubmitting={isPending}
      />
    </Form>
  )
}
