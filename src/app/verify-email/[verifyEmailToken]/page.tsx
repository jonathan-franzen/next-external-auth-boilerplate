'use server'

import VerifyEmail from '@/features/auth/components/verify-email'

interface VerifyEmailTokenPageProps {
  params: Promise<{
    verifyEmailToken: string
  }>
}

const VerifyEmailParamsPage = async ({ params }: VerifyEmailTokenPageProps) => {
  const { verifyEmailToken } = await params

  return <VerifyEmail verifyEmailToken={verifyEmailToken} />
}

export default VerifyEmailParamsPage
