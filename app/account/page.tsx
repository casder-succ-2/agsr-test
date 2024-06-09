'use client'

import { useEffect, useState } from 'react'
import {
	Stack,
	TextInput,
	Title,
	ActionIcon,
	Group,
	Button,
	Chip,
	Text,
	ChipGroup,
} from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import {
	IconSearch,
	IconCircleX,
	IconAlertCircle,
	IconEye,
	IconPlus,
	IconLayoutGrid,
	IconColumns,
} from '@tabler/icons-react'

import { notificationService } from '@/services'

import { TABS } from '@/lib/constants'
import { Tabs, Table, Breadcrumbs } from '@/app/components'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
	selectList,
	selectCount,
	getListAsync,
	createSystemAsycn,
} from '@/lib/store/features/system/systemSlice'

import classes from './styles.module.css'

export default function AccountPage() {
	const [searchValue, setSearchValue] = useState('')
	const [params, setParams] = useState({
		page: 1,
		perPage: 25,
	})

	const dispatch = useAppDispatch()
	const systemList = useAppSelector(selectList)
	const systemCount = useAppSelector(selectCount)

	console.log('action.payload.list', systemList)

	const handleList = useDebouncedCallback(() => {
		dispatch(getListAsync({ ...params, searchValue }))
	}, 200)
	const handleParams = (key: string, value: string | number) => {
		setParams(prev => ({ ...prev, [key]: value }))

		handleList()
	}
	const clearSearchValue = () => {
		setSearchValue('')
	}
	const createNewSystem = () => {
		dispatch(createSystemAsycn())
			.unwrap()
			.then(() => {
				notificationService.showSuccess('Система успешно создана')

				dispatch(getListAsync({ ...params, searchValue }))
			})
	}

	useEffect(() => {
		if (!systemList) {
			dispatch(getListAsync({ ...params, searchValue }))
		}
	}, [dispatch, params, searchValue, systemList])

	return (
		<Stack pt={80} gap={80}>
			<Stack gap={40}>
				<Breadcrumbs
					items={[
						{ title: 'Гавная', href: '/' },
						{ title: 'Личный кабинет', href: '/account' },
					]}
				/>

				<Stack gap={20}>
					<Title className={classes.title}>Личный кабинет</Title>

					<Tabs items={TABS} value={TABS[0].value} />
				</Stack>
			</Stack>

			<Stack py={80} gap={40}>
				<Group align='end' gap={0} w={870}>
					<TextInput
						value={searchValue}
						styles={{
							root: {
								flexGrow: 1,
							},
							input: {
								height: '61px',
								backgroundColor: 'white',
								padding: '21px 45px 21px 45px',
								borderRadius: '10px 0 0 10px',
							},
							label: {
								fontSize: '18px',
								fontweight: '600',
								lineHeight: '21.78px',
								marginBottom: '20px',
								color: '#6E7686',
							},
						}}
						leftSection={<IconSearch color='#D4D7DB' />}
						label='Выбор ИС/СР для внесения метаданных'
						placeholder='Выберите ИС/СР для внесения метаданных...'
						rightSection={
							<ActionIcon
								onClick={clearSearchValue}
								variant='subtle'
								radius='xl'
								color='#D4D7DB'
							>
								<IconCircleX />
							</ActionIcon>
						}
						onChange={e => setSearchValue(e.target.value)}
					/>
					<Button
						onClick={handleList}
						styles={{
							root: {
								height: '61px',
								padding: '21px 45px 21px 45px',
								backgroundColor: '#13A3B9',
								borderRadius: '0px 10px 10px 0px',
							},
						}}
					>
						Показать
					</Button>
				</Group>

				<Group justify='space-between'>
					<Group gap={20}>
						<Chip
							checked={false}
							variant='outline'
							radius='5px'
							styles={{
								root: {
									height: '34px',
								},
								label: {
									padding: '5px 10px',
									height: '34px',
									border: '1px solid #6E7686',
								},
							}}
						>
							<Group gap={5}>
								<IconEye color='#6E7686' />

								<Text className={classes.chipText}>Просмотр ИС/ИР</Text>
							</Group>
						</Chip>

						<Chip
							checked={false}
							variant='outline'
							radius='5px'
							styles={{
								root: {
									height: '34px',
								},
								label: {
									padding: '5px 10px',
									height: '34px',
									border: '1px solid #6E7686',
								},
							}}
						>
							<Group gap={5}>
								<IconAlertCircle color='#6E7686' />

								<Text className={classes.chipText}>Доп сведения ИС/ИР</Text>
							</Group>
						</Chip>

						<Button
							onClick={createNewSystem}
							styles={{ root: { height: '34px', background: '#13A3B9' } }}
							leftSection={<IconPlus />}
						>
							Добавить
						</Button>
					</Group>

					<ChipGroup defaultValue='table'>
						<Group>
							<Chip
								h={32}
								value={'grid'}
								radius={'5px'}
								className={classes.tableViewChip}
								styles={{
									iconWrapper: {
										display: 'none',
									},
									root: {
										padding: 0,
										height: '32px',
										borderRadius: '5px',
									},
								}}
							>
								<IconLayoutGrid size={32} color='#6E7686' />
							</Chip>

							<Chip
								h={32}
								value={'table'}
								radius={'5px'}
								className={classes.tableViewChip}
								styles={{
									iconWrapper: {
										display: 'none',
									},
									root: {
										padding: 0,
										height: '32px',
										borderRadius: '5px',
									},
								}}
							>
								<IconColumns size={32} color='#6E7686' />
							</Chip>
						</Group>
					</ChipGroup>
				</Group>

				<Table
					params={params}
					items={systemList || []}
					totalCount={systemCount}
					handleParams={handleParams}
				/>
			</Stack>
		</Stack>
	)
}
