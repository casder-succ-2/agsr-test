import { AppShell, AppShellMain } from '@mantine/core'

import { Footer, Header, Main } from '@/app/components'

export const BaseLayout = ({ children }: { children: React.ReactElement }) => {
	return (
		<AppShell>
			<Header />

			<Main>{children}</Main>

			<Footer />
		</AppShell>
	)
}
