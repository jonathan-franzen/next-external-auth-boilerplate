'use server'

import { until } from '@open-draft/until'

import { getSelfApi } from '@/api/user/get-self.api'
import { RscError } from '@/components/rsc-error'
import { ResendVerifyEmailButton } from '@/features/auth/components/resend-verify-email-button'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { AuthProvider } from '@/features/auth/providers/auth-provider'

const VerifyEmailPage = async () => {
  const [err, res] = await until(() => getSelfApi())

  if (err) {
    return <RscError err={err} />
  }

  return (
    <AuthProvider>
      <h1 className="text-center text-sm font-semibold text-gray-700">
        VERIFY YOUR EMAIL
      </h1>
      <div className="mt-6">
        <p className="text-center">
          Before you can go any further, you need to verify your email.
        </p>
      </div>
      <ResendVerifyEmailButton email={res.data.email} />
      <p className="mt-12 text-center text-sm font-semibold text-gray-700">
        Have you not received the email?
      </p>
      <div className="mt-6 flex justify-center">
        <LogoutForm />
      </div>
    </AuthProvider>
  )
}

export default VerifyEmailPage
