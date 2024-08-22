'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import classes from './styles.module.css'

import { notificationService } from '@/services'

import { ControlledTextInput } from '@/app/components'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
  selectAccount,
  updateContactInfoAsync,
} from '@/lib/store/features/account/accountSlice'

const schema = z.object({
  email: z.string().email().min(1, 'Required'),
  phoneNumber: z.string().min(1, 'Required'),
})

type FormType = z.infer<typeof schema>

export function ContactsFrom() {
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
      email: '',
      phoneNumber: '',
    },
  })

  const onSubmit = (data: FormType) => {
    dispatch(updateContactInfoAsync(data))
      .unwrap()
      .then(() => {
        setEditing(false)
        notificationService.showSuccess('Контакты успешно обновлены')
      })
  }
  const handleEdit = () => {
    setEditing(!isEditing)
    reset({
      email: account?.email || '',
      phoneNumber: account?.phoneNumber || '',
    })
  }

  useEffect(() => {
    reset({
      email: account?.email || '',
      phoneNumber: account?.phoneNumber || '',
    })
  }, [account?.email, account?.phoneNumber, reset])

  return (
    <Stack gap={20}>
      <Group justify="space-between">
        <Text className={classes.title}>Контакты</Text>

        <Button
          variant="subtle"
          onClick={handleEdit}
          className={classes.editBtn}
        >
          Редактировать
        </Button>
      </Group>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.personalInfo}>
          <ControlledTextInput
            label="Адресс электроной почты*"
            name="email"
            placeholder="Введите почтовый адрес"
            control={control}
            errorMessage={errors.email?.message}
            disabled={!isEditing}
          />

          <ControlledTextInput
            label="Мобильный номер*"
            name="phoneNumber"
            placeholder="Введите номер телефона"
            control={control}
            errorMessage={errors.phoneNumber?.message}
            disabled={!isEditing}
          />
        </Box>

        {isEditing && (
          <Button type="submit" className={classes.submitBtn} color="#13A3B9">
            Сохранить
          </Button>
        )}
      </form>
    </Stack>
  )
}
