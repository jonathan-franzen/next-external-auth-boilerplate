'use server'

import { until } from '@open-draft/until'
import { redirect } from 'next/navigation'

import { logoutApi } from '@/api/auth/logout.api'
import { destroyAuthSession } from '@/lib/auth-session'
import { getErrorMessage } from '@/utils/get-error-message'

type LogoutState = { error?: string } | null

export const logout = async (_prevState: LogoutState, _formData: FormData) => {
  const [error] = await until(() => logoutApi())

  if (error) {
    return { error: getErrorMessage(error) }
  }

  await destroyAuthSession()

  return redirect('/login')
}
