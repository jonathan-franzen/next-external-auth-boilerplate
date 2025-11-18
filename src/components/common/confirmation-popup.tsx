import { ReactNode } from 'react'

import PrimaryButton from '@/components/common/primary-button'
import SecondaryButton from '@/components/common/secondary-button'

interface ConfirmationPopupProps {
  cancelLabel: string
  children: ReactNode
  confirmLabel: string
  errorMessage?: string
  isLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

function ConfirmationPopup({
  cancelLabel,
  children,
  confirmLabel,
  errorMessage = '',
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmationPopupProps): ReactNode {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
      <div className="rounded bg-white p-6 shadow-lg">
        {children}
        <div className="flex gap-2">
          <PrimaryButton
            className="w-full"
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </PrimaryButton>
          <SecondaryButton className="w-full" onClick={onCancel}>
            {cancelLabel}
          </SecondaryButton>
        </div>
        {errorMessage && (
          <div className="mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2">
            <div className="text-xs text-pink-900">{errorMessage}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmationPopup
