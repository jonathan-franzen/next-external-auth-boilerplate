'use client'

import { ReactElement, startTransition, useState } from 'react'
import toast from 'react-hot-toast'

import {
  deleteIdUsersApiAction,
  patchIdUsersApiAction,
} from '@/actions/api/user/user.api.actions'
import ConfirmationPopup from '@/components/common/confirmation-popup'
import Form from '@/components/common/form'
import GhostButton from '@/components/common/ghost-button'
import { EMAIL_VALIDATION_REGEX } from '@/constants/regex.constants'
import { ObjectUserUsersApiInterface } from '@/interfaces/api/user/user.api.interfaces'
import {
  FieldReactFormInterface,
  ValidationSchemaReactFormInterface,
} from '@/interfaces/react/form/form.react.interfaces'
import getFormValidationSchema from '@/utils/get-form-validation-schema'

const formFields: FieldReactFormInterface[] = [
  {
    autoComplete: 'email',
    name: 'email',
    placeholder: 'Email',
    required: true,
    type: 'text',
  },
  {
    autoComplete: 'firstName',
    name: 'firstName',
    placeholder: 'First name',
    required: true,
    type: 'firstName',
  },
  {
    autoComplete: 'lastName',
    name: 'lastName',
    placeholder: 'Last name',
    required: true,
    type: 'lastName',
  },
]

const formValidationSchema: ValidationSchemaReactFormInterface = {
  ...getFormValidationSchema(
    'email',
    EMAIL_VALIDATION_REGEX,
    'Not a valid email address.',
    true
  ),
}

interface UserCardProps {
  user: ObjectUserUsersApiInterface
}

function UserCard({ user }: UserCardProps): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSave = async (
    formData: Record<string, string>
  ): Promise<void> => {
    setIsLoading(true)
    try {
      await patchIdUsersApiAction(user.id, formData)
      toast.success('User updated successfully.')
      startTransition((): void => {
        setIsEditing(false)
        setIsLoading(false)
      })
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const handleDelete = async (): Promise<void> => {
    setErrorMessage('')
    setIsLoading(true)
    try {
      await deleteIdUsersApiAction(user.id)
      toast.success('User deleted successfully.')
      startTransition((): void => {
        setShowDeletePopup(false)
        setIsLoading(false)
      })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.'
      )
      setIsLoading(false)
    }
  }

  return (
    <div className="border-b pb-4 text-sm">
      <p>
        <strong>{user.id}</strong>
      </p>
      {isEditing ? (
        <Form
          className="mt-1"
          fields={formFields}
          initialFormData={{
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          }}
          isLoading={isLoading}
          onCancel={() => {
            setIsEditing(false)
          }}
          onSubmit={handleSave}
          showLabels={true}
          submitLabel="SAVE"
          validationSchema={formValidationSchema}
        />
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
          {user.emailVerifiedAt ? (
            <p>
              Email verified at <strong>{user.emailVerifiedAt}</strong>
            </p>
          ) : (
            <p>Email not verified</p>
          )}
          <p>
            Created at <strong>{user.createdAt}</strong>
          </p>
          <p>
            Updated at <strong>{user.updatedAt}</strong>
          </p>
          <div className="mt-2 flex gap-2">
            <GhostButton
              className="inline-flex text-base"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </GhostButton>
            <GhostButton
              className="inline-flex text-base"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete
            </GhostButton>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <ConfirmationPopup
          cancelLabel="Cancel"
          confirmLabel="Delete"
          errorMessage={errorMessage}
          isLoading={isLoading}
          onCancel={() => {
            setShowDeletePopup(false)
            setErrorMessage('')
          }}
          onConfirm={() => void handleDelete()}
        >
          <p className="mb-4">
            Are you sure you want to delete{' '}
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            ?
          </p>
        </ConfirmationPopup>
      )}
    </div>
  )
}

export default UserCard
