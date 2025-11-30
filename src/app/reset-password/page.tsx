'use server'

import Link from 'next/link'

import { RequestPasswordResetForm } from '@/features/auth/forms/request-password-reset-form'

const ResetPasswordPage = () => {
  return (
    <>
      <h1 className="text-center text-sm font-semibold text-gray-700">
        RESET YOUR PASSWORD
      </h1>
      <RequestPasswordResetForm />
      <div className="mt-4 flex justify-center">
        <Link href="/login">Back to login</Link>
      </div>
    </>
  )
}

export default ResetPasswordPage
