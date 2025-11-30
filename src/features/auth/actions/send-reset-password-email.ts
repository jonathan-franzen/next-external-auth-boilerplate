'use server'

import { until } from '@open-draft/until'
import { z } from 'zod'

import { sendResetPasswordEmailApi } from '@/api/auth/send-reset-password-email.api'
import { parseApiResponse } from '@/lib/api'
import { getErrorMessage } from '@/lib/errors'
import { sendResetPasswordEmailBody } from '@/packages/shared/validators/auth.validators'

type SendResetPasswordEmailState = {
  email?: string
  errors?: {
    email?: string | null
    submit?: string
  } | null
  message?: string
} | null

export const sendResetPasswordEmail = async (
  _prevState: SendResetPasswordEmailState,
  formData: FormData
): Promise<SendResetPasswordEmailState> => {
  const email = formData.get('email') as string

  const validatedFields = sendResetPasswordEmailBody.safeParse({
    email,
  })

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error)

    return {
      email,
      errors: {
        email: tree.properties?.email?.errors?.[0] ?? null,
      },
    }
  }

  const res = await sendResetPasswordEmailApi({
    ...validatedFields.data,
  })

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return {
      email,
      errors: {
        submit: getErrorMessage(err),
      },
    }
  }

  return {
    message: awaitedRes.message,
  }
}
