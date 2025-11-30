'use client'

import { until } from '@open-draft/until'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { toast } from 'sonner'

import { Text } from '@/components/text'
import { verifyEmail } from '@/features/auth/actions/verify-email'
import { LogoutForm } from '@/features/auth/forms/logout-form'
import { getErrorMessage } from '@/lib/errors'

interface VerifyEmailProps {
  isAuthenticated: boolean
  verifyEmailToken: string
}

const VerifyEmail = ({
  isAuthenticated,
  verifyEmailToken,
}: VerifyEmailProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const [err, res] = await until(() => verifyEmail(verifyEmailToken))

      if (err) {
        toast.error(getErrorMessage(err))
        router.push('/verify-email')
      } else {
        toast.success(res.message)
        router.push('/dashboard')
      }
    })
  }, [verifyEmailToken])

  if (false) {
    return (
      <>
        <h1 className="text-center text-sm font-semibold text-gray-700">
          ERROR VERIFYING EMAIL
        </h1>
        <div className="mt-10 flex justify-center">
          {isAuthenticated ? (
            <LogoutForm />
          ) : (
            <Link href="/login">Back to login</Link>
          )}
        </div>
      </>
    )
  }

  if (isPending) {
    return (
      <Text as="p" variant="heading">
        VERIFYING EMAIL...
      </Text>
    )
  }

  return
}

export default VerifyEmail
