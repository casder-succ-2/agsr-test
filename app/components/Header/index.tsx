'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
	ActionIcon,
	AppShellHeader,
	Avatar,
	Divider,
	Group,
	Text,
	Menu,
	MenuTarget,
	MenuDropdown,
	Indicator,
	Box,
} from '@mantine/core'
import { IconChevronDown, IconBell } from '@tabler/icons-react'

import { NavLinks, Link } from '@/app/components'
import { LogoIcon, UserRoundIcon } from '@/public/icons'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
	logoutAsync,
	selectAccount,
} from '@/lib/store/features/account/accountSlice'
import {
	selectNotificationCount,
	clearNotifications,
} from '@/lib/store/features/notification/notificationSlice'

import classes from './styles.module.css'

export const Header = () => {
	const { push } = useRouter()

	const dispatch = useAppDispatch()
	const account = useAppSelector(selectAccount)
	const notificationsCount = useAppSelector(selectNotificationCount)

	return (
		<AppShellHeader className={classes.header}>
			<Box className={classes.content}>
				<Group justify='space-between' align='center'>
					<Image
						alt='Logo'
						src={LogoIcon}
						onClick={() => push('/')}
						className={classes.logo}
					/>

					<NavLinks />

					<Group gap={20}>
						<Indicator
							size={18}
							color='#13A3B9'
							label={notificationsCount}
							disabled={!notificationsCount}
							className={classes.indicator}
						>
							<ActionIcon radius='xl' bg='#F9F9F9' size='3rem'>
								<IconBell
									size={32}
									color={notificationsCount ? '#13A3B9' : '#A7B4CC'}
								/>
							</ActionIcon>
						</Indicator>

						<Divider orientation='vertical' />

						<Group gap={10}>
							<Avatar
								radius='xl'
								variant='transparent'
								bg='#F9F9F9'
								size='3rem'
							>
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
												{account?.firstName || 'User'}
												{account?.lastName || 'User'}
											</Text>

											<ActionIcon variant='transparent' c='#676A71'>
												<IconChevronDown />
											</ActionIcon>
										</Group>
									</MenuTarget>

									<MenuDropdown>
										<Menu.Item onClick={() => push('/profile')}>
											Профиль
										</Menu.Item>

										<Menu.Item onClick={() => push('/account')}>
											Личный кабинет
										</Menu.Item>

										<Menu.Item
											onClick={() => {
												dispatch(logoutAsync())
												dispatch(clearNotifications())
											}}
										>
											Выход
										</Menu.Item>
									</MenuDropdown>
								</Menu>
							)}
						</Group>
					</Group>
				</Group>
			</Box>
		</AppShellHeader>
	)
}
