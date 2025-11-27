'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { loginApi } from '@/api/auth/login.api'
import { registerApi } from '@/api/auth/register.api'
import { parseApiResponse } from '@/lib/api'
import { updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { getErrorMessage } from '@/utils/get-error-message'
import { registerBody } from '@/validators/auth.validators'

type RegisterState = {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  errors?: {
    email?: string | null
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    submit?: string
  } | null
} | null

export const register = async (
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const validatedFields = registerBody.safeParse({
    email,
    firstName,
    lastName,
    password,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      email,
      password,
      errors: {
        email: tree.properties?.email?.errors?.[0] ?? null,
        password: tree.properties?.password?.errors?.[0] ?? null,
        firstName: tree.properties?.firstName?.errors?.[0] ?? null,
        lastName: tree.properties?.lastName?.errors?.[0] ?? null,
      },
    }
  }

  console.log('here')

  const registerRes = await registerApi({
    ...validatedFields.data,
  })

  const [registerErr] = await until(() => parseApiResponse(registerRes))

  if (registerErr) {
    return {
      email,
      password,
      firstName,
      lastName,
      errors: {
        submit: getErrorMessage(registerErr),
      },
    }
  }

  const loginRes = await loginApi({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  })

  const [loginErr, awaitedLoginRes] = await until(() =>
    parseApiResponse(loginRes)
  )

  if (loginErr) {
    return {
      email,
      password,
      firstName,
      lastName,
      errors: {
        submit: getErrorMessage(loginErr),
      },
    }
  }

  const refreshToken = getSetCookieValue(
    loginRes.headers.getSetCookie(),
    'refreshToken'
  )

  await updateAuthSession({
    refreshToken,
    accessToken: awaitedLoginRes.data.accessToken,
    self: awaitedLoginRes.data.user,
  })

  return redirect('/verify-email')
}
