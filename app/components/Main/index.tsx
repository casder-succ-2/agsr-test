'use client'

import { usePathname } from 'next/navigation'
import { AppShellMain, Box } from '@mantine/core'

import classes from './styles.module.css'

export const Main = ({ children }: { children: React.ReactNode }) => {
	const pathName = usePathname()
	const isAccountPage = pathName === '/account'

	return (
		<AppShellMain className={classes.main} bg={isAccountPage ? '#F9F9F9' : ''}>
			<Box className={classes.content}>{children}</Box>
		</AppShellMain>
	)
}
