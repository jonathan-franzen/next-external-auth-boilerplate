'use server'

import { until } from '@open-draft/until'
import { z } from 'zod'

import { changePasswordApi } from '@/api/user/change-password.api'
import { parseApiResponse } from '@/lib/api'
import { updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { getErrorMessage } from '@/utils/get-error-message'
import { changePasswordRequestBody } from '@/validators/user/change-password.validator'

type ChangePasswordState = {
  password?: string
  newPassword?: string
  errors?: {
    email?: string | null
    password?: string | null
    submit?: string
  } | null
  message?: string
  data?: null
} | null

export const changePassword = async (
  _prevState: ChangePasswordState,
  formData: FormData
) => {
  const password = formData.get('password') as string
  const newPassword = formData.get('newPassword') as string

  const validatedFields = changePasswordRequestBody.safeParse({
    password,
    newPassword,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      password,
      newPassword,
      errors: {
        password: tree.properties?.password?.errors?.[0] ?? null,
        newPassword: tree.properties?.newPassword?.errors?.[0] ?? null,
      },
    }
  }

  const res = await changePasswordApi({
    password: validatedFields.data.password,
    newPassword: validatedFields.data.newPassword,
  })

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return {
      password,
      newPassword,
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
  })

  return { message: awaitedRes.message, data: null }
}
