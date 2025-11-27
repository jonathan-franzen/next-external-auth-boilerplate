'use server'

import { getSelfApi } from '@/api/user/get-self.api'
import { ResendVerifyEmailButton } from '@/features/auth/components/resend-verify-email-button'
import { SaveAuthSession } from '@/features/auth/components/save-auth-session'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { parseApiResponse } from '@/lib/api'

const VerifyEmailPage = async () => {
  const { res, authSession } = await getSelfApi()
  const { data } = await parseApiResponse(res)

  return (
    <>
      <SaveAuthSession authSession={authSession} />
      <h1 className="text-center text-sm font-semibold text-gray-700">
        VERIFY YOUR EMAIL
      </h1>
      <div className="mt-6">
        <p className="text-center">
          Before you can go any further, you need to verify your email.
        </p>
      </div>
      <ResendVerifyEmailButton email={data.email} />
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
