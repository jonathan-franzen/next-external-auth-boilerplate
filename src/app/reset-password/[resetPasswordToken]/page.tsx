'use server'

import { until } from '@open-draft/until'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { verifyResetPasswordTokenApi } from '@/api/auth/verify-reset-password-token.api'
import { ResetPasswordForm } from '@/features/auth/forms/reset-password-form'
import { parseApiResponse } from '@/lib/api'

interface ResetPasswordTokenPageProps {
  params: Promise<{
    resetPasswordToken: string
  }>
}

const ResetPasswordParamsPage = async ({
  params,
}: ResetPasswordTokenPageProps) => {
  const { resetPasswordToken } = await params

  const res = await verifyResetPasswordTokenApi({ resetPasswordToken })

  const [err] = await until(() => parseApiResponse(res))

  if (err) {
    notFound()
  }

  return (
    <>
      <h1 className="text-center text-sm font-semibold text-gray-700">
        SET YOUR NEW PASSWORD
      </h1>
      <ResetPasswordForm resetPasswordToken={resetPasswordToken} />
      <div className="mt-4 flex justify-center">
        <Link href="/login">Back to login</Link>
      </div>
    </>
  )
}

export default ResetPasswordParamsPage
