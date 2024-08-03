import { AppShell } from '@mantine/core'

import { Footer, Header, Main } from '@/app/components'

export const BaseLayout = ({ children }: { children: React.ReactElement }) => {
	return (
		<AppShell miw='1440px'>
			<Header />

			<Main>{children}</Main>

			<Footer />
		</AppShell>
	)
}
