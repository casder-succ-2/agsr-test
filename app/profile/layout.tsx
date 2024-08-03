import { ReactElement } from 'react'
import { Box } from '@mantine/core'

import { ProtectedLayout } from '@/app/components'

export default function RootLayout({ children }: { children: ReactElement }) {
	return (
		<ProtectedLayout>
			<Box w={970}>{children}</Box>
		</ProtectedLayout>
	)
}
