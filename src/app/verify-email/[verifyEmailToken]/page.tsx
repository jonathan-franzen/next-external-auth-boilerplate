'use server'

import { until } from '@open-draft/until'

import { getSelfApi } from '@/api/user/get-self.api'
import { RscError } from '@/components/rsc-error'
import VerifyEmail from '@/features/auth/components/verify-email'
import { parseApiResponse } from '@/lib/api'

interface VerifyEmailTokenPageProps {
  params: Promise<{
    verifyEmailToken?: string
  }>
}

const VerifyEmailParamsPage = async ({ params }: VerifyEmailTokenPageProps) => {
  const { verifyEmailToken } = await params

  if (!verifyEmailToken) {
    return
  }

  const res = await getSelfApi()

  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return <RscError err={err} />
  }

  return (
    <VerifyEmail
      isAuthenticated={!!awaitedRes.data}
      verifyEmailToken={verifyEmailToken}
    />
  )
}

export default VerifyEmailParamsPage
