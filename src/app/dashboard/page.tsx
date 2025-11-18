'use server'

import GhostLink from '@/components/common/ghost-link'
import { LogoutForm } from '@/features/auth/logout-form'
import { getSelfFromAuthSession } from '@/lib/auth-session'
import { UserRoles } from '@/types/user/user.types'

const DashboardPage = async () => {
  const me = await getSelfFromAuthSession()

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h1 className="text-center text-sm font-semibold text-gray-700">
          WELCOME, {me.firstName.toUpperCase()}
        </h1>
        <ul className="mt-12 flex flex-col gap-2">
          <li>Email: {me.email}</li>
          <li>First Name: {me.firstName}</li>
          <li>Last Name: {me.lastName}</li>
          <li>Email verified at: {me.emailVerifiedAt?.toString()}</li>
          <li>
            Roles:{' '}
            {me.roles.map((role: string, index: number): string =>
              index < me.roles.length - 1 ? `${role}, ` : role
            )}
          </li>
        </ul>
        <div className="mt-6 flex justify-center">
          <GhostLink href="/dashboard/reset-password">
            Change password here
          </GhostLink>
        </div>
      </div>
      <div>
        <LogoutForm />
        <div className="mt-2 flex justify-center">
          {me.roles.includes(UserRoles.ADMIN) ? (
            <GhostLink href="/admin">View admin page</GhostLink>
          ) : (
            <div className="mt-2 flex flex-col items-center justify-center gap-2">
              <p className="w-fit text-xs">
                This user is no admin. See what happens when you
              </p>
              <GhostLink href="/admin">View admin page</GhostLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
