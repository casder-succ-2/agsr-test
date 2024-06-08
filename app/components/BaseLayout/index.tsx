import { AppShell, AppShellMain } from '@mantine/core'

import classes from './styles.module.css'

import { Footer, Header } from '@/app/components'

export const BaseLayout = ({ children }: { children: React.ReactElement }) => {
	return (
		<AppShell layout='alt' header={{ height: 80 }}>
			<Header />

			<AppShellMain className={classes.body}>{children}</AppShellMain>

			<Footer />
		</AppShell>
	)
}
