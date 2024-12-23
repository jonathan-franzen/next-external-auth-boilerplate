import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import { XiorError as AxiosError, isXiorError as isAxiosError } from 'xior';

function apiRouteErrorHandler(err: unknown, responseMessage: string): NextResponse {
	let status: number = 500;
	let errorMessage: string = 'Something went wrong.';

	if (isAxiosError(err)) {
		status = (err as AxiosError).response?.status || status;
		errorMessage = (err as AxiosError).response?.data.error || errorMessage;
	} else {
		if (err && typeof err === 'object' && 'message' in err) {
			errorMessage = err.message as string;
		} else {
			errorMessage = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	}

	logger.error({
		message: responseMessage,
		context: {
			status,
			error: errorMessage,
		},
	});

	return NextResponse.json({ error: errorMessage }, { status });
}

export default apiRouteErrorHandler;
