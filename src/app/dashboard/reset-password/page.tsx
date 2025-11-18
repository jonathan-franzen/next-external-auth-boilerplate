'use server'

import Link from 'next/link'

import { ChangePasswordForm } from '@/features/user-settings/change-password-form'

const ResetPasswordDashboardPage = () => {
  return (
    <div className="flex h-full flex-col">
      <h1 className="text-center text-sm font-semibold text-gray-700">
        CHANGE YOUR PASSWORD
      </h1>
      <ChangePasswordForm />
      <div className="mt-2 flex justify-center">
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
    </div>
  )
}

export default ResetPasswordDashboardPage
