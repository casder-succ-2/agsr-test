import { usePathname } from 'next/navigation'
import { Breadcrumbs as MBreadcrumbs } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import cx from 'clsx'

import classes from './styles.module.css'
import { Link } from '@/app/components'

interface Props {
  items: { title: string, href: string }[]
}

export function Breadcrumbs({ items }: Props) {
  const pathname = usePathname()

  return (
    <MBreadcrumbs
      separatorMargin="10px"
      separator={<IconChevronLeft fontSize={12} />}
    >
      {items.map(item => (
        <Link
          href={item.href}
          key={item.title}
          className={cx(classes.item, {
            [classes.active]: pathname === item.href,
          })}
        >
          {item.title}
        </Link>
      ))}
    </MBreadcrumbs>
  )
}
