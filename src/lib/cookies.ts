import { NextResponse } from 'next/server'
import { Cookie, CookieJar } from 'tough-cookie'

const jar = new CookieJar()

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

export const setMiddlewareCookies = (
  setCookieHeader: string[],
  allowedNames: string[],
  res: NextResponse,
  origin: URL
) => {
  setCookieHeader.forEach((cookie) => {
    const parsed = Cookie.parse(cookie)

    if (!parsed || !allowedNames.includes(parsed.key)) {
      return
    }

    jar.setCookieSync(parsed, origin.toString())

    res.cookies.set(parsed.key, parsed.value, {
      path: parsed.path ?? '/',
      domain: parsed.domain ?? undefined,
      httpOnly: parsed.httpOnly,
      secure: parsed.secure,
      sameSite: parsed.sameSite as 'lax' | 'none' | 'strict',
      expires:
        parsed.expires && parsed.expires instanceof Date
          ? parsed.expires
          : undefined,
      maxAge: typeof parsed.maxAge === 'number' ? parsed.maxAge : undefined,
    })
  })
}
