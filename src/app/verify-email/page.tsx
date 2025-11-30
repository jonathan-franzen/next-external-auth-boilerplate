'use server'

import { until } from '@open-draft/until'

import { getSelfApi } from '@/api/user/get-self.api'
import { RscError } from '@/components/rsc-error'
import { ResendVerifyEmailButton } from '@/features/auth/components/resend-verify-email-button'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { parseApiResponse } from '@/lib/api'

const VerifyEmailPage = async () => {
  const res = await getSelfApi()
  const [err, awaitedRes] = await until(() => parseApiResponse(res))

  if (err) {
    return <RscError err={err} />
  }

  return (
    <>
      <h1 className="text-center text-sm font-semibold text-gray-700">
        VERIFY YOUR EMAIL
      </h1>
      <div className="mt-6">
        <p className="text-center">
          Before you can go any further, you need to verify your email.
        </p>
      </div>
      <ResendVerifyEmailButton email={awaitedRes.data.email} />
      <p className="mt-12 text-center text-sm font-semibold text-gray-700">
        Have you not received the email?
      </p>
      <div className="mt-6 flex justify-center">
        <LogoutForm />
      </div>
    </>
  )
}

export default VerifyEmailPage
