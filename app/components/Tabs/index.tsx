import type { ReactNode } from 'react'
import type {
  TabsProps as MTabsProps,
  TabsListProps,
  TabsTabProps,
} from '@mantine/core'
import {
  Tabs as MTabs,
  TabsList,
  TabsTab,
} from '@mantine/core'

interface TabsProps extends Omit<MTabsProps, 'children'> {
  tabProps?: Omit<TabsTabProps, 'value'>
  listProps?: Omit<TabsListProps, 'children'>
  items: {
    value: string
    body: ReactNode
    onClick?: () => void
    disabled?: boolean
  }[]
}

export function Tabs({ items, tabProps, listProps, ...rest }: TabsProps) {
  return (
    <MTabs {...rest}>
      <TabsList {...listProps}>
        {items.map(({ value, body, disabled = false }) => (
          <TabsTab {...tabProps} disabled={disabled} key={value} value={value}>
            {body}
          </TabsTab>
        ))}
      </TabsList>
    </MTabs>
  )
}
