'use server'

import GhostLink from '@/components/common/ghost-link'
import { Text } from '@/components-new/text'
import { LoginForm } from '@/features/auth/login-form'

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Text as="h1" variant="heading">
          SIGN INTO YOUR ACCOUNT
        </Text>
      </div>
      <LoginForm />
      <div className="flex flex-col items-center">
        <Text as="h3" variant="body" className="mt-4">
          Don&apos;t have an account?
        </Text>
        <GhostLink href="/register">Sign up</GhostLink>
      </div>
    </>
  )
}

export default LoginPage
