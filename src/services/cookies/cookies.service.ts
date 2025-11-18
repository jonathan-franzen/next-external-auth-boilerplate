import { parse } from 'cookie'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { DEFAULT_COOKIE_CONFIG } from '@/constants/cookies.constants'

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(name)
}

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(name)?.value

  return cookieValue || undefined
}

export async function hasCookie(name: string): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.has(name)
}

export async function setCookie(
  name: string,
  value: string,
  maxAge?: 'session' | number,
  path?: string,
  res?: NextResponse
): Promise<void> {
  if (res) {
    res.cookies.set(name, value, {
      ...DEFAULT_COOKIE_CONFIG,
      path: path || DEFAULT_COOKIE_CONFIG.path,
      ...(maxAge !== 'session' && maxAge
        ? { maxAge }
        : { maxAge: DEFAULT_COOKIE_CONFIG.maxAge }),
    })
  } else {
    const cookieStore = await cookies()

    cookieStore.set(name, value, {
      ...DEFAULT_COOKIE_CONFIG,
      path: path || DEFAULT_COOKIE_CONFIG.path,
      ...(maxAge !== 'session' && maxAge
        ? { maxAge }
        : { maxAge: DEFAULT_COOKIE_CONFIG.maxAge }),
    })
  }
}

export function setCookies(
  cookies: string[],
  filter: string[] = ['all'],
  res?: NextResponse
): void {
  void cookies.map(async (cookie: string) => {
    const parsedCookie = parse(cookie)

    const [cookieName, cookieValue] = Object.entries(parsedCookie).at(0) ?? [
      '',
      undefined,
    ]

    if (!filter.includes('all') && !filter.includes(cookieName)) {
      return
    }

    await setCookie(
      cookieName,
      cookieValue || '',
      parsedCookie['Max-Age'] ? Number(parsedCookie['Max-Age']) : 'session',
      parsedCookie['Path'],
      res
    )
  })
}
