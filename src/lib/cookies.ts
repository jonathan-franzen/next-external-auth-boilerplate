import { NextResponse } from 'next/server'

export const getSetCookieValue = (setCookieHeader: string[], key: string) => {
  if (!setCookieHeader) {
    return
  }

  for (const cookie of setCookieHeader) {
    if (cookie.includes(key)) {
      const match = cookie.match(new RegExp(`${key}=([^;]*)`))
      if (match) {
        return match[1]
      }
    }
  }
}

export function setMiddlewareCookies(
  setCookieHeaders: string[],
  allowedNames: string[],
  res: NextResponse
) {
  setCookieHeaders.forEach((header) => {
    const parts = header.split(';').map((p) => p.trim())

    const [nameValue, ...attributes] = parts
    const [name, value] = nameValue.split('=')

    if (!allowedNames.includes(name)) {
      return
    }

    const cookieOptions: {
      path?: string
      domain?: string
      httpOnly?: boolean
      secure?: boolean
      sameSite?: 'lax' | 'strict' | 'none'
      expires?: Date
      maxAge?: number
    } = {}

    attributes.forEach((attr) => {
      const [key, rawValue] = attr.split('=')
      const lower = key.toLowerCase()

      switch (lower) {
        case 'path':
          cookieOptions.path = rawValue
          break
        case 'domain':
          cookieOptions.domain = rawValue
          break
        case 'httponly':
          cookieOptions.httpOnly = true
          break
        case 'secure':
          cookieOptions.secure = true
          break
        case 'samesite':
          cookieOptions.sameSite = rawValue?.toLowerCase() as
            | 'lax'
            | 'strict'
            | 'none'
          break
        case 'expires':
          cookieOptions.expires = new Date(rawValue)
          break
        case 'max-age':
          cookieOptions.maxAge = Number(rawValue)
          break
        default:
          break
      }
    })

    res.cookies.set(name, value, cookieOptions)
  })
}
