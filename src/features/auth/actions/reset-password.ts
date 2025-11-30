'use server'

import { until } from '@open-draft/until'
import { z } from 'zod'

import { resetPasswordApi } from '@/api/auth/reset-password.api'
import { parseApiResponse } from '@/lib/api'
import { getErrorMessage } from '@/lib/errors'
import { resetPasswordBody } from '@/packages/shared/validators/auth.validators'

type ResetPasswordState = {
  newPassword?: string
  errors?: {
    newPassword?: string | null
    submit?: string
  }
  message?: string
} | null

export const resetPassword = async (
  resetPasswordToken: string,
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> => {
  const newPassword = formData.get('newPassword') as string

  const validatedFields = resetPasswordBody.safeParse({
    newPassword,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      newPassword,
      errors: {
        newPassword: tree.properties?.newPassword?.errors?.[0] ?? null,
      },
    }
  }

  const res = await resetPasswordApi(
    { resetPasswordToken },
    {
      newPassword: validatedFields.data.newPassword,
    }
  )

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return {
      newPassword,
      errors: {
        submit: getErrorMessage(err),
      },
    }
  }

  return {
    message: awaitedRes.message,
  }
}
