import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { LoginRequestBody } from '@/types/auth/login.types'
import { loginRequestBody } from '@/validators/auth/login.validator'

export const useLoginForm = () => {
  const form = useForm<LoginRequestBody>({
    resolver: zodResolver(loginRequestBody),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  return {
    form,
  }
}
