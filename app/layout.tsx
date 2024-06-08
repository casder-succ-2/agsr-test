import { MantineProvider, ColorSchemeScript } from '@mantine/core'

import { theme } from '@/theme/theme'
import { BaseLayout, AuthWrapper } from '@/app/components'

import { StoreProvider } from './StoreProvider'

import '@mantine/core/styles.layer.css'

export const metadata = {
	title: 'AGSR',
	description: 'Test project for AGSR'
}

export default function RootLayout({ children }: { children: any }) {
	return (
		<StoreProvider>
			<html lang='en'>
				<head>
					<ColorSchemeScript />
					<link rel='shortcut icon' href='/favicon.svg' />
					<meta
						name='viewport'
						content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
					/>
				</head>

				<body>
					<MantineProvider theme={theme}>
						<AuthWrapper>
							<BaseLayout>{children}</BaseLayout>
						</AuthWrapper>
					</MantineProvider>
				</body>
			</html>
		</StoreProvider>
	)
}
