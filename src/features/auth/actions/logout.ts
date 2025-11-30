'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { logoutApi } from '@/api/auth/logout.api'
import { parseApiResponse } from '@/lib/api'
import { destroyAuthSession } from '@/lib/auth-session'
import { getErrorMessage } from '@/lib/errors'

type LogoutState = { error?: string } | null

export const logout = async (
  _prevState: LogoutState,
  _formData: FormData
): Promise<LogoutState> => {
  const res = await logoutApi()

  const [error] = await until(() => parseApiResponse(res))

  if (error) {
    return { error: getErrorMessage(error) }
  }

  await destroyAuthSession()

  return redirect('/login')
}
