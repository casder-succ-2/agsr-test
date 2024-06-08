'use client'

import Image from 'next/image'
import {
	ActionIcon,
	AppShellHeader,
	Avatar,
	Divider,
	Group,
	Text,
	Menu,
	MenuTarget,
	MenuDropdown
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import { NavLinks, Link } from '@/app/components'
import { useAppSelector } from '@/lib/store/hooks'
import { selectAccount } from '@/lib/store/features/account/accountSlice'

import { BellIcon, LogoIcon, UserRoundIcon } from '@/public/icons'

import classes from './styles.module.css'

export const Header = () => {
	const account = useAppSelector(selectAccount)

	return (
		<AppShellHeader className={classes.header}>
			<Group justify='space-between' align='center'>
				<Image alt='Logo' src={LogoIcon} />

				<NavLinks />

				<Group gap={20}>
					<ActionIcon radius='xl' bg='#F9F9F9' size='3rem'>
						<Image alt='bell' src={BellIcon} />
					</ActionIcon>

					<Divider orientation='vertical' />

					<Group gap={10}>
						<Avatar radius='xl' variant='transparent' bg='#F9F9F9' size='3rem'>
							<Image alt='avatar' src={UserRoundIcon} />
						</Avatar>

						{!account?.id && (
							<Link href={'/login'}>
								<Text>Вход в аккаунт</Text>
							</Link>
						)}

						{account?.id && (
							<Menu shadow='md' width={200}>
								<MenuTarget>
									<Group gap={10} style={{ cursor: 'pointer' }}>
										<Text className={classes.menuTarget}>
											{account?.firstName || 'User'}{' '}
											{account?.lastName || 'User'}
										</Text>

										<ActionIcon variant='transparent' c='#676A71'>
											<IconChevronDown />
										</ActionIcon>
									</Group>
								</MenuTarget>

								<MenuDropdown>
									<Menu.Item>Профиль</Menu.Item>

									<Menu.Item>
										<Link href={'/login'}>Личный кабинет</Link>
									</Menu.Item>
								</MenuDropdown>
							</Menu>
						)}
					</Group>
				</Group>
			</Group>
		</AppShellHeader>
	)
}
