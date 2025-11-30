export const AUTH_ENDPOINTS = {
  REGISTER: 'v1/auth/register',
  RESEND_VERIFY_EMAIL: 'v1/auth/resend-verify-email',
  VERIFY_EMAIL: (verifyEmailToken: string) =>
    `v1/auth/verify-email/${verifyEmailToken}`,
  LOGIN: 'v1/auth/login',
  REFRESH: 'v1/auth/refresh',
  VERIFY_SESSION: 'v1/auth/verify-session',
  SEND_RESET_PASSWORD_EMAIL: 'v1/auth/reset-password',
  VERIFY_RESET_PASSWORD_TOKEN: (verifyPasswordToken: string) =>
    `v1/auth/reset-password/${verifyPasswordToken}`,
  RESET_PASSWORD: (verifyPasswordToken: string) =>
    `v1/auth/reset-password/${verifyPasswordToken}`,
  LOGOUT: 'v1/auth/logout',
} as const
