'use server'

import { until } from '@open-draft/until'
import { z } from 'zod'

import { changePasswordApi } from '@/api/user/change-password.api'
import { parseApiResponse } from '@/lib/api'
import { updateAuthSession } from '@/lib/auth-session'
import { getSetCookieValue } from '@/lib/cookies'
import { getErrorMessage } from '@/lib/errors'
import { changePasswordBody } from '@/packages/shared/validators/user.validators'

type ChangePasswordState = {
  password?: string
  newPassword?: string
  errors?: {
    password?: string | null
    newPassword?: string | null
    submit?: string
  }
  message?: string
} | null

export const changePassword = async (
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> => {
  const password = formData.get('password') as string
  const newPassword = formData.get('newPassword') as string

  const validatedFields = changePasswordBody.safeParse({
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

  return {
    message: awaitedRes.message,
  }
}
