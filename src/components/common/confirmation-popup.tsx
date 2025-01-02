import PrimaryButton from '@/components/common/primary-button';
import SecondaryButton from '@/components/common/secondary-button';
import { ReactNode } from 'react';

interface ConfirmationPopupProps {
	confirmLabel: string;
	cancelLabel: string;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading?: boolean;
	errorMessage?: string;
	children: ReactNode;
}

function ConfirmationPopup({
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel,
	isLoading = false,
	errorMessage = '',
	children,
}: ConfirmationPopupProps): ReactNode | null {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
			<div className='rounded bg-white p-6 shadow-lg'>
				{children}
				<div className='flex gap-2'>
					<PrimaryButton onClick={onConfirm} isLoading={isLoading} className='w-full'>
						{confirmLabel}
					</PrimaryButton>
					<SecondaryButton onClick={onCancel} className='w-full'>
						{cancelLabel}
					</SecondaryButton>
				</div>
				{errorMessage && (
					<div className='mt-2 flex items-center justify-center gap-3 rounded-md bg-pink-50 p-2'>
						<div className='text-2xs text-pink-900'>{errorMessage}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ConfirmationPopup;
