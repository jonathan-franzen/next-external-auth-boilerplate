'use server'

import Link from 'next/link'

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
        <Text as="span" variant="body">
          Don&apos;t have an account?
        </Text>
        <Link href="/register">Sign up</Link>
      </div>
    </>
  )
}

export default LoginPage
