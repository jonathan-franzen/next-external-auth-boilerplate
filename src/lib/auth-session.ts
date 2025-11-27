'use server'

import { getIronSession, IronSessionData } from 'iron-session'
import { cookies } from 'next/headers'

import { IRON_SESSION_SECRET } from '@/constants/environment.constants'
import { User } from '@/types/user.types'

declare module 'iron-session' {
  interface IronSessionData {
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
  return await getIronSession<IronSessionData>(cookieStore, sessionOptions)
}

export const updateAuthSession = async (updates: Partial<IronSessionData>) => {
  const session = await getAuthSession()

  Object.assign(session, updates)

  await session.save()
}

export async function destroyAuthSession() {
  const session = await getAuthSession()
  session.destroy()
}
