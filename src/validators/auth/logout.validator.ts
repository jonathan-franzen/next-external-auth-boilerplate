import { z } from 'zod'

const logoutRequestCookies = z.object({
  refreshToken: z.string().nonempty('Refresh token is required.'),
})

export const logoutValidator = z.object({
  cookies: logoutRequestCookies,
})
