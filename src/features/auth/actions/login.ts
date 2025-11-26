'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { loginApi } from '@/api/auth/login.api'
import { parseApiResponse } from '@/lib/api'
import { updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { getErrorMessage } from '@/utils/get-error-message'
import { loginRequestBody } from '@/validators/auth/login.validator'

type LoginState = {
  email?: string
  password?: string
  validationErrors?: {
    email?: string | null
    password?: string | null
    submit?: string
  } | null
} | null

export const login = async (_prevState: LoginState, formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validatedFields = loginRequestBody.safeParse({
    email,
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
      },
    }
  }

  const res = await loginApi({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  })

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return {
      email,
      password,
      errors: {
        submit: getErrorMessage(err),
      },
    }
  }

  const refreshToken = getSetCookieValue(
    res.headers.getSetCookie(),
    'refreshToken'
  )

  await updateAuthSession({
    refreshToken,
    accessToken: awaitedRes.data.accessToken,
    self: awaitedRes.data.user,
  })

  return redirect('/dashboard')
}
