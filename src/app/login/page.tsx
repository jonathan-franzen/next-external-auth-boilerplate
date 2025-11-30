'use server'

import Link from 'next/link'

import { Text } from '@/components/text'
import { LoginForm } from '@/features/auth/forms/login-form'

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Text as="h1" variant="heading">
          SIGN INTO YOUR ACCOUNT
        </Text>
      </div>
      <LoginForm />
      <Link
        className="w-fit text-xs text-pink-900 hover:text-pink-700"
        href="/reset-password"
      >
        Forgot your password?
      </Link>
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
