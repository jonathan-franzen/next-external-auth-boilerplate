import { z } from 'zod'

const refreshRequestCookies = z.object({
  refreshToken: z.string().nonempty('Refresh token is required.'),
})

export const refreshValidator = z.object({
  cookies: refreshRequestCookies,
})
