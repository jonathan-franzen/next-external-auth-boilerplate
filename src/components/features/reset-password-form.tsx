'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { postTokenResetPasswordApiAction } from '@/actions/api/auth/auth.api.actions'
import { postUpdatePasswordMeUsersApiAction } from '@/actions/api/user/user.api.actions'
import Form from '@/components/common/form'
import { PASSWORD_VALIDATION_REGEX } from '@/constants/regex.constants'
import { RequestPostTokenResetPasswordApiInterface } from '@/interfaces/api/auth/auth.api.interfaces'
import { RequestPostUpdatePasswordMeUsersApiInterface } from '@/interfaces/api/user/user.api.interfaces'
import getFormValidationSchema from '@/utils/get-form-validation-schema'

interface ResetPasswordFormProps {
  className?: string
  resetPasswordToken?: string
}

function ResetPasswordForm({
  className,
  resetPasswordToken,
}: ResetPasswordFormProps): ReactNode {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formFields = [
    ...(resetPasswordToken
      ? []
      : [
          {
            autoComplete: 'current-password',
            name: 'password',
            placeholder: 'Current password',
            required: true,
            type: 'password',
          },
        ]),
    {
      autoComplete: 'new-password',
      name: 'newPassword',
      placeholder: 'New password',
      required: true,
      type: 'password',
    },
  ]

  const formValidationSchema = {
    ...getFormValidationSchema(
      'newPassword',
      PASSWORD_VALIDATION_REGEX,
      'Password too weak.',
      true
    ),
  }

  const handleOnSubmit = async (
    formData: Record<string, string>
  ): Promise<void> => {
    setIsLoading(true)

    try {
      await (resetPasswordToken
        ? postTokenResetPasswordApiAction(
            resetPasswordToken,
            formData as unknown as RequestPostTokenResetPasswordApiInterface
          )
        : postUpdatePasswordMeUsersApiAction(
            formData as unknown as RequestPostUpdatePasswordMeUsersApiInterface
          ))

      toast.success('Password reset successfully.')

      if (resetPasswordToken) {
        await new Promise(() => router.push('/login'))
        return
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  return (
    <Form
      className={className}
      fields={formFields}
      isLoading={isLoading}
      onSubmit={handleOnSubmit}
      submitLabel="UPDATE PASSWORD"
      validationSchema={formValidationSchema}
    />
  )
}

export default ResetPasswordForm
