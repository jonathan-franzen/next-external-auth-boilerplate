'use server'

import { ReactNode } from 'react'

import GhostLink from '@/components/common/ghost-link'
import SendPasswordResetEmailForm from '@/components/features/send-password-reset-email-form'

function ResetPasswordPage(): ReactNode {
  return (
    <>
      <h1 className="text-center text-sm font-semibold text-gray-700">
        RESET YOUR PASSWORD
      </h1>
      <SendPasswordResetEmailForm className="mt-12" />
      <div className="mt-4 flex justify-center">
        <GhostLink href="/login">Back to login</GhostLink>
      </div>
    </>
  )
}

export default ResetPasswordPage
