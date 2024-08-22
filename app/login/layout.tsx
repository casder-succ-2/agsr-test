import type { ReactElement } from 'react'
import { Box } from '@mantine/core'

import { ProtectedLayout } from '@/app/components'

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <ProtectedLayout>
      <Box h="100dvh">{children}</Box>
    </ProtectedLayout>
  )
}
