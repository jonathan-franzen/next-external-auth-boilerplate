'use server';

import LogoutButton from '@/components/logout-button';
import { RolesEnum } from '@/enums/roles.enum';
import { MeObjectResponseUsersApiInterface } from '@/interfaces/api/users/response/me.response.users.api.interface';
import cookieService from '@/services/cookie';
import Link from 'next/link';
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
						<Link href='/admin' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
							View admin page
						</Link>
					) : (
						<div className='mt-2 flex flex-col items-center justify-center gap-2'>
							<p className='w-fit text-xs'>This user is no admin. See what happens when you</p>
							<Link href='/admin' className='w-fit text-xs text-pink-900 hover:text-pink-700'>
								View admin page
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
