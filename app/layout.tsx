import type { ReactElement } from 'react'
import { Notifications } from '@mantine/notifications'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import { StoreProvider } from './StoreProvider'
import { theme } from '@/theme/theme'
import { AuthLayout, BaseLayout } from '@/app/components'

import '@mantine/core/styles.layer.css'
import '@mantine/notifications/styles.css'

export const metadata = {
  title: 'AGSR',
  description: 'Test project for AGSR',
}

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head>

        <body>
          <MantineProvider theme={theme}>
            <Notifications position="top-center" />

            <BaseLayout>
              <AuthLayout>{children}</AuthLayout>
            </BaseLayout>
          </MantineProvider>
        </body>
      </html>
    </StoreProvider>
  )
}
