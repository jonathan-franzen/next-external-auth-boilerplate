'use server';

import GhostLink from '@/components/common/ghost-link';
import LogoutButton from '@/components/features/logout-button';
import { RolesEnum } from '@/enums/roles.enum';
import { MeObjectResponseUsersApiInterface } from '@/interfaces/api/users/response/me.response.users.api.interface';
import cookieService from '@/services/cookie';
import { ReactNode } from 'react';

export default async function DashboardPage(): Promise<ReactNode> {
	const me: MeObjectResponseUsersApiInterface = await cookieService.getMeFromCookie();

	return (
		<div className='flex h-full flex-col justify-between'>
			<div>
				<h1 className='text-center text-sm font-semibold text-gray-700'>WELCOME, {me.firstName.toUpperCase()}</h1>
				<ul className='mt-12 flex flex-col gap-2'>
					<li>Email: {me.email}</li>
					<li>First Name: {me.firstName}</li>
					<li>Last Name: {me.lastName}</li>
					<li>Email verified at: {me.emailVerifiedAt}</li>
					<li>Roles: {me.roles.map((role: string, index: number): string => (index < me.roles.length - 1 ? `${role}, ` : role))}</li>
				</ul>
			</div>
			<div>
				<LogoutButton />
				<div className='mt-2 flex justify-center'>
					{me.roles.includes(RolesEnum.ADMIN) ? (
						<GhostLink href='/admin'>View admin page</GhostLink>
					) : (
						<div className='mt-2 flex flex-col items-center justify-center gap-2'>
							<p className='w-fit text-xs'>This user is no admin. See what happens when you</p>
							<GhostLink href='/admin'>View admin page</GhostLink>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
