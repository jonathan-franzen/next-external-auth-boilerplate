'use server'

import { AuthSessionData, getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { IRON_SESSION_SECRET } from '@/config/env.config'
import { User } from '@/packages/shared/types/user.types'

declare module 'iron-session' {
  interface AuthSessionData {
    accessToken?: string
    self?: User
    refreshToken?: string
  }
}

const sessionOptions = {
  cookieName: 'session',
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  },
  password: IRON_SESSION_SECRET,
}

export const getAuthSession = async () => {
  const cookieStore = await cookies()
  return await getIronSession<AuthSessionData>(cookieStore, sessionOptions)
}

export async function getMiddlewareAuthSession(
  req: NextRequest,
  res: NextResponse
) {
  return await getIronSession<AuthSessionData>(req, res, sessionOptions)
}

export const getSelfFromAuthSession = async () => {
  const { self } = await getAuthSession()

  if (!self) {
    return redirect('/login')
  }

  return self
}

export const updateAuthSession = async (updates: Partial<AuthSessionData>) => {
  const session = await getAuthSession()

  Object.assign(session, updates)

  await session.save()
}

export async function destroyAuthSession() {
  const session = await getAuthSession()
  session.destroy()
}
