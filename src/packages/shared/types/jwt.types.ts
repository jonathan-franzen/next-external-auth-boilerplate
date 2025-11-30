// Decoded JWT tokens
export interface JwtDecodedAccessToken {
  userInfo: {
    id: string
    email: string
  }
}

export interface JwtDecodedRefreshToken {
  email: string
}

export interface JwtDecodedVerifyEmailToken {
  verifyEmail: {
    email: string
  }
}

export interface JwtDecodedResetPasswordToken {
  resetPassword: {
    email: string
  }
}
