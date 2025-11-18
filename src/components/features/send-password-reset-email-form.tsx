'use client'

import { ReactNode, startTransition, useState } from 'react'
import toast from 'react-hot-toast'

import { postResetPasswordApiAction } from '@/actions/api/auth/auth.api.actions'
import Form from '@/components/common/form'
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants'
import { RequestPostResetPasswordApiInterface } from '@/interfaces/api/auth/auth.api.interfaces'
import getFormValidationSchema from '@/utils/get-form-validation-schema'

interface SendPasswordResetEmailFormProps {
  className?: string
}

function SendPasswordResetEmailForm({
  className,
}: SendPasswordResetEmailFormProps): ReactNode {
  const [isLoading, setIsLoading] = useState(false)

  const formFields = [
    {
      autoComplete: 'email',
      name: 'email',
      placeholder: 'Email',
      required: true,
      type: 'text',
    },
  ]

  // Validate the entered email-address to avoid unnecessary backend- requests.
  const formValidationSchema = {
    ...getFormValidationSchema(
      'email',
      EMAIL_VALIDATION_REGEX,
      'Not a valid email address.',
      false
    ),
  }

  const handleOnSubmit = async (
    formData: Record<string, string>
  ): Promise<void> => {
    setIsLoading(true)
    try {
      await postResetPasswordApiAction(
        formData as unknown as RequestPostResetPasswordApiInterface
      )
      toast.success('Email sent successfully.')
      // Transition to make sure loading state is handled properly.
      startTransition(() => {
        setIsLoading(false)
      })
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
      submitLabel="SEND PASSWORD RESET EMAIL"
      validationSchema={formValidationSchema}
    />
  )
}

export default SendPasswordResetEmailForm
