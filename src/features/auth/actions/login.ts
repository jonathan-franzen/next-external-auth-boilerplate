'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { loginApi } from '@/api/auth/login.api'
import { updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { getErrorMessage } from '@/lib/errors'
import { loginBody } from '@/packages/shared/validators/auth.validators'

type LoginState = {
  email?: string
  password?: string
  errors?: {
    email?: string | null
    password?: string | null
    submit?: string
  } | null
} | null

export const login = async (
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validatedFields = loginBody.safeParse({
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

  const [err, res] = await until(() =>
    loginApi({
      ...validatedFields.data,
    })
  )

  if (err) {
    return {
      email,
      password,
      errors: {
        submit: getErrorMessage(err),
      },
    }
  }

  const refreshToken = getSetCookieValue(res.setCookie, 'refreshToken')

  await updateAuthSession({
    refreshToken,
    accessToken: res.data.accessToken,
    self: res.data.user,
  })

  return redirect('/dashboard')
}
