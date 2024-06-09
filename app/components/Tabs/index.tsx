import { ReactNode } from 'react'
import {
	Tabs as MTabs,
	TabsProps as MTabsProps,
	TabsListProps,
	TabsTabProps,
	TabsList,
	TabsTab
} from '@mantine/core'

interface TabsProps extends Omit<MTabsProps, 'children'> {
	tabProps?: Omit<TabsTabProps, 'value'>
	listProps?: Omit<TabsListProps, 'children'>
	items: {
		value: string
		body: ReactNode
		onClick?: Function
		disabled?: boolean
	}[]
}

export const Tabs = ({ items, tabProps, listProps, ...rest }: TabsProps) => (
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
