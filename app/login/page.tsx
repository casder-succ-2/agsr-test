'use client'

import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Center, Stack, Title } from '@mantine/core'

import { ControlledTextInput, ControlledPasswordInput } from '@/app/components'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
	signIn,
	selectAccount,
	selectStatus,
	selectError
} from '@/lib/store/features/account/accountSlice'

import classes from './styles.module.css'

const schema = z.object({
	email: z
		.string()
		.min(1, 'Please enter email')
		.email('Email format is incorrect.'),
	password: z.string().min(1, 'Please enter password')
})

type FormType = z.infer<typeof schema>

export default function LoginPage() {
	const dispatch = useAppDispatch()
	const account = useAppSelector(selectAccount)
	const accountStatus = useAppSelector(selectStatus)
	const error = useAppSelector(selectError)

	console.log(error)

	const {
		control,
		setError,
		handleSubmit,
		formState: { errors }
	} = useForm<FormType>({
		resolver: zodResolver(schema)
	})

	const onSubmit = (data: FormType) => {
		dispatch(signIn(data))
	}

	useEffect(() => {
		if (accountStatus === 'failed') {
			setError('password', { message: error || '' }, { shouldFocus: true })
		}
	}, [accountStatus, error, setError])

	return (
		<Center h='100%'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={40}>
					<Title fz='48px'>Вход</Title>

					<Stack gap={20}>
						<ControlledTextInput
							label='Почта'
							name='email'
							placeholder='Введите логин'
							control={control}
							errorMessage={errors.email?.message}
						/>

						<ControlledPasswordInput
							label='Пароль'
							name='password'
							placeholder='Введите пароль'
							control={control}
							errorMessage={errors.password?.message}
						/>

						<Button
							size='56px'
							type='submit'
							variant='filled'
							className={classes.submitBtn}
							loading={accountStatus === 'loading'}
						>
							Вход
						</Button>

						<Button size='56px' className={classes.btn} variant='outline'>
							Авторизация с использованием ЕС ИФЮЛ
						</Button>
					</Stack>
				</Stack>
			</form>
		</Center>
	)
}
