'use server'

import Link from 'next/link'

import { Text } from '@/components/text'
import { RegisterForm } from '@/features/auth/forms/register-form'

const RegisterPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Text as="h1" variant="heading">
          SIGN UP
        </Text>
      </div>
      <RegisterForm />
      <div className="flex flex-col items-center">
        <Text as="span" variant="body">
          Already have an account?
        </Text>
        <Link href="/login">Sign in</Link>
      </div>
    </>
  )
}

export default RegisterPage
