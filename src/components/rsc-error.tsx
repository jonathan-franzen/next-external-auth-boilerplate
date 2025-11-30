import { Refresh } from '@/features/auth/components/refresh'
import { isTokenExpiredError } from '@/lib/errors'

interface RscErrorProps {
  err: Error
}

export const RscError = ({ err }: RscErrorProps) => {
  if (!isTokenExpiredError(err)) {
    throw err
  }

  return <Refresh />
}
