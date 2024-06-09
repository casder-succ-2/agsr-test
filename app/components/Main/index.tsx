'use client'

import { usePathname } from 'next/navigation'
import { AppShellMain } from '@mantine/core'

import classes from './styles.module.css'

export const Main = ({ children }: { children: React.ReactNode }) => {
	const pathName = usePathname()
	const isAccountPage = pathName === '/account'

	return (
		<AppShellMain
			className={classes.body}
			bg={isAccountPage ? '#F9F9F9' : undefined}
		>
			{children}
		</AppShellMain>
	)
}
