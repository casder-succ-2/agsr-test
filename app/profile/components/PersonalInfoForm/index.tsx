'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { notificationService } from '@/services'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
	selectAccount,
	updatePersonalInfoAsync,
} from '@/lib/store/features/account/accountSlice'

import { ControlledTextInput } from '@/app/components'

import classes from './styles.module.css'

const schema = z.object({
	lastName: z.string().min(1, 'Required'),
	middleName: z.string().min(1, 'Required'),
	firstName: z.string().min(1, 'Required'),
	identificationNumber: z.string().min(1, 'Required'),
	userName: z.string().min(1, 'Required'),
})

type FormType = z.infer<typeof schema>

export const PersonalInfoForm = () => {
	const [isEditing, setEditing] = useState(false)

	const dispatch = useAppDispatch()
	const account = useAppSelector(selectAccount)

	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		resolver: zodResolver(schema),
		defaultValues: {
			lastName: '',
			middleName: '',
			firstName: '',
			identificationNumber: '',
			userName: '',
		},
	})

	const onSubmit = (data: FormType) => {
		dispatch(updatePersonalInfoAsync(data)).then(() => {
			setEditing(false)
			notificationService.showSuccess('Личные данные обновлены')
		})
	}
	const handleEdit = () => {
		setEditing(!isEditing)

		if (account) {
			reset({
				lastName: account.lastName || '',
				middleName: account.middleName || '',
				firstName: account.firstName || '',
				identificationNumber: account.identificationNumber || '',
				userName: account.userName || '',
			})
		}
	}

	useEffect(() => {
		if (account) {
			reset({
				lastName: account.lastName || '',
				middleName: account.middleName || '',
				firstName: account.firstName || '',
				identificationNumber: account.identificationNumber || '',
				userName: account.userName || '',
			})
		}
	}, [account, reset])

	return (
		<Stack gap={20}>
			<Group justify='space-between'>
				<Text className={classes.title}>Личные данные</Text>

				<Button
					variant='subtle'
					onClick={handleEdit}
					className={classes.editBtn}
				>
					Редактировать
				</Button>
			</Group>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Box className={classes.personalInfo}>
					<ControlledTextInput
						label='Имя*'
						name='firstName'
						placeholder='Введите имя'
						control={control}
						errorMessage={errors.firstName?.message}
						disabled={!isEditing}
					/>

					<ControlledTextInput
						label='Фамилия*'
						name='lastName'
						placeholder='Введите фамилию'
						control={control}
						errorMessage={errors.lastName?.message}
						disabled={!isEditing}
					/>

					<ControlledTextInput
						label='Отчество*'
						name='middleName'
						placeholder='Введите отчество'
						control={control}
						errorMessage={errors.middleName?.message}
						disabled={!isEditing}
					/>

					<ControlledTextInput
						label='Идентификационный номер*'
						name='identificationNumber'
						placeholder='Введите фамилию идентификационный номер'
						control={control}
						errorMessage={errors.identificationNumber?.message}
						disabled={!isEditing}
					/>

					<ControlledTextInput
						label='Логин*'
						name='userName'
						placeholder='Введите логин'
						control={control}
						errorMessage={errors.userName?.message}
						disabled={!isEditing}
					/>
				</Box>

				{isEditing && (
					<Button type='submit' className={classes.submitBtn} color='#13A3B9'>
						Сохранить
					</Button>
				)}
			</form>
		</Stack>
	)
}
