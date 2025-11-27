import { z } from 'zod'

import { DataResponse, MessageResponse } from '@/types/api.types'
import { User } from '@/types/user.types'
import {
  loginValidator,
  optionalRefreshTokenCookies,
  refreshTokenCookies,
  registerValidator,
  resendVerifyEmailValidator,
  resetPasswordTokenParams,
  resetPasswordValidator,
  sendResetPasswordEmailValidator,
  verifyEmailTokenParams,
  verifyResetPasswordTokenParams,
} from '@/validators/auth.validators'

// Params
export type VerifyEmailTokenParams = z.infer<typeof verifyEmailTokenParams>

export type VerifyResetPasswordTokenParams = z.infer<
  typeof verifyResetPasswordTokenParams
>

export type ResetPasswordTokenParams = z.infer<typeof resetPasswordTokenParams>

// Cookies
export type OptionalRefreshTokenCookies = z.infer<
  typeof optionalRefreshTokenCookies
>

export type RefreshTokenCookies = z.infer<typeof refreshTokenCookies>

// Body
export type RegisterRequestBody = z.infer<typeof registerValidator>['body']

export type ResendVerifyEmailRequestBody = z.infer<
  typeof resendVerifyEmailValidator
>['body']

export type LoginRequestBody = z.infer<typeof loginValidator>['body']

export type SendResetPasswordEmailRequestBody = z.infer<
  typeof sendResetPasswordEmailValidator
>['body']

export type ResetPasswordRequestBody = z.infer<
  typeof resetPasswordValidator
>['body']

// Response Data
export interface LoginResponseData {
  accessToken: string
  user: User
}

export interface RefreshResponseData {
  accessToken: string
}

// Response
export interface RegisterResponse extends DataResponse<User> {}

export interface VerifyEmailResponse extends MessageResponse {}

export interface ResendVerifyEmailResponse extends MessageResponse {}

export interface LoginResponse extends DataResponse<LoginResponseData> {}

export interface RefreshResponse extends DataResponse<RefreshResponseData> {}

export interface SendResetPasswordEmailResponse extends MessageResponse {}

export interface VerifyResetPasswordTokenResponse extends MessageResponse {}

export interface ResetPasswordResponse extends MessageResponse {}
