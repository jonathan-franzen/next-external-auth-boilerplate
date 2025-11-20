'use server'

import Link from 'next/link'

import { Text } from '@/components-new/text'
import { ChangePasswordForm } from '@/features/user-settings/change-password-form'

const ResetPasswordDashboardPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Text as="h2" variant="heading">
        CHANGE YOUR PASSWORD
      </Text>
      <ChangePasswordForm />
      <div className="mt-2 flex justify-center">
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
    </div>
  )
}

export default ResetPasswordDashboardPage
