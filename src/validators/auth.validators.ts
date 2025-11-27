import { z } from 'zod'

import { passwordValidator } from '@/validators/common.validators'

export const verifyEmailTokenParams = z.object({
  verifyEmailToken: z.string(),
})

export const verifyResetPasswordTokenParams = z.object({
  resetPasswordToken: z.string(),
})

export const resetPasswordTokenParams = z.object({
  resetPasswordToken: z.string(),
})

export const optionalRefreshTokenCookies = z.object({
  refreshToken: z.string().optional(),
})

export const refreshTokenCookies = z.object({
  refreshToken: z.string().nonempty('Refresh token is required.'),
})

export const registerBody = z.object({
  email: z.email(),
  password: passwordValidator,
  firstName: z.string().nonempty('First name is required.'),
  lastName: z.string().nonempty('Last name is required.'),
})

export const resendVerifyEmailBody = z.object({
  email: z.email(),
})

export const loginBody = z.object({
  email: z.email(),
  password: z.string().nonempty('Password is required.'),
})

export const sendResetPasswordEmailBody = z.object({
  email: z.email(),
})

export const resetPasswordBody = z.object({
  newPassword: passwordValidator,
})

export const registerValidator = z.object({
  body: registerBody,
})

export const verifyEmailValidator = z.object({
  params: verifyEmailTokenParams,
})

export const resendVerifyEmailValidator = z.object({
  body: resendVerifyEmailBody,
})

export const loginValidator = z.object({
  body: loginBody,
  cookies: optionalRefreshTokenCookies,
})

export const refreshValidator = z.object({
  cookies: refreshTokenCookies,
})

export const sendResetPasswordEmailValidator = z.object({
  body: sendResetPasswordEmailBody,
})

export const verifyResetPasswordTokenValidator = z.object({
  params: verifyResetPasswordTokenParams,
})

export const resetPasswordValidator = z.object({
  body: resetPasswordBody,
  params: resetPasswordTokenParams,
})

export const logoutValidator = z.object({
  cookies: refreshTokenCookies,
})
