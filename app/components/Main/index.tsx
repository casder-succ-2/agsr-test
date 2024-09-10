'use client'

import { AppShellMain, Box } from '@mantine/core'

import classes from './styles.module.css'

export function Main({ children }: { children: React.ReactNode }) {

  return (
    <AppShellMain className={classes.main}>
      <Box className={classes.content}>{children}</Box>
    </AppShellMain>
  )
}
