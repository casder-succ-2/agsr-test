import cx from 'clsx'
import { Box } from '@mantine/core'

import classes from './styles.module.css'

interface Prosp {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children }: Prosp) {
  return (
    <Box className={cx(classes.container, className)}>
      {children}
    </Box>
  )
}
