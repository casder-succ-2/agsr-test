'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Center, Stack, Title } from '@mantine/core'

import classes from './styles.module.css'
import { ControlledPasswordInput, ControlledTextInput } from '@/app/components'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
  selectError,
  selectStatus,
  signIn,
} from '@/lib/store/features/account/accountSlice'

const schema = z.object({
  email: z
    .string()
    .min(1, 'Please enter email')
    .email('Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
})

type FormType = z.infer<typeof schema>

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const accountStatus = useAppSelector(selectStatus)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: FormType) => {
    setLoading(true)
    dispatch(signIn(data))
      .unwrap()
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (accountStatus === 'failed') {
      setError('password', { message: error || '' }, { shouldFocus: true })
    }
  }, [accountStatus, error, setError])

  return (
    <Center h="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={40}>
          <Title fz="48px">Вход</Title>

          <Stack gap={20}>
            <ControlledTextInput
              label="Почта"
              name="email"
              placeholder="Введите логин"
              control={control}
              errorMessage={errors.email?.message}
            />

            <ControlledPasswordInput
              label="Пароль"
              name="password"
              placeholder="Введите пароль"
              control={control}
              errorMessage={errors.password?.message}
            />

            <Button
              size="56px"
              type="submit"
              variant="filled"
              className={classes.submitBtn}
              loading={loading}
            >
              Вход
            </Button>

            <Button size="56px" className={classes.btn} variant="outline">
              Авторизация с использованием ЕС ИФЮЛ
            </Button>
          </Stack>
        </Stack>
      </form>
    </Center>
  )
}
