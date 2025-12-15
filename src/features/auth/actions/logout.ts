'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { logoutApi } from '@/api/auth/logout.api'
import { destroyAuthSession } from '@/lib/auth-session'
import { getErrorMessage } from '@/lib/errors'

type LogoutState = { err?: string } | null

export const logout = async (
  _prevState: LogoutState,
  _formData: FormData
): Promise<LogoutState> => {
  const [err] = await until(() => logoutApi())

  if (err) {
    return { err: getErrorMessage(err) }
  }

  await destroyAuthSession()

  return redirect('/login')
}
