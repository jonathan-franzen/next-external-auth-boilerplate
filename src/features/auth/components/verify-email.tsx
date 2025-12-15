'use client'

import { until } from '@open-draft/until'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { toast } from 'sonner'

import { Text } from '@/components/text'
import { verifyEmail } from '@/features/auth/actions/verify-email'
import { getErrorMessage } from '@/lib/errors'

interface VerifyEmailProps {
  verifyEmailToken: string
}

const VerifyEmail = ({ verifyEmailToken }: VerifyEmailProps) => {
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
        if (res.self) {
          router.push('/dashboard')
        } else {
          router.push('/login')
        }
      }
    })
  }, [verifyEmailToken])

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
