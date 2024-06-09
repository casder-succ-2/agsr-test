import { Box } from '@mantine/core'

import { ProtectedLayout } from '@/app/components'

export default function RootLayout({ children }: { children: any }) {
	return (
		<ProtectedLayout>
			<Box w={970}>{children}</Box>
		</ProtectedLayout>
	)
}
