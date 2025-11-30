export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

export const isTokenExpiredError = (error: Error) => {
  return (
    error.name === 'UnauthorizedError' && error.message === 'Token expired.'
  )
}
