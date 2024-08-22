import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import type { AnchorProps } from '@mantine/core'
import { Anchor } from '@mantine/core'
import cx from 'clsx'

import classes from './styles.module.css'

interface Props extends AnchorProps {
  className?: string
  inNewTab?: boolean
  href: LinkProps['href']
  children: React.ReactNode
}

export function Link({
  children,
  href,
  className,
  inNewTab = false,
  ...rest
}: Props) {
  const linkProps = {
    className: cx(classes.link, className),
    ...rest,
  }

  return (
    <NextLink href={href} passHref legacyBehavior color="inherit">
      <Anchor
        rel="noreferrer"
        target={inNewTab ? '_blank' : '_self'}
        {...linkProps}
      >
        {children}
      </Anchor>
    </NextLink>
  )
}
