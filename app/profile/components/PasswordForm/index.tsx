import { useState } from 'react'
import { z } from 'zod'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import classes from './styles.module.css'
import { ControlledPasswordInput } from '@/app/components'

import { notificationService } from '@/services'

import { useAppDispatch } from '@/lib/store/hooks'
import {
  changePasswordAsync,
} from '@/lib/store/features/account/accountSlice'

const schema = z
  .object({
    password: z.string().min(1, 'Required'),
    newPassword: z.string().min(1, 'Required'),
    confirmPassword: z.string().min(1, 'Required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords should match',
    path: ['confirmPassword'],
  })

type FormType = z.infer<typeof schema>

export function PasswordForm() {
  const [isEditing, setEditing] = useState(false)

  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: FormType) => {
    dispatch(changePasswordAsync(data))
      .unwrap()
      .then(() => {
        setEditing(false)
        notificationService.showSuccess('Пароль успешно обновлен')
        reset({
          password: '',
          newPassword: '',
          confirmPassword: '',
        })
      })
      .catch((err) => {
        setError(
          'password',
          { message: err.message || '' },
          { shouldFocus: true },
        )
      })
  }
  const handleEdit = () => {
    setEditing(!isEditing)
    reset({})
  }

  return (
    <Stack gap={20}>
      <Group justify="space-between">
        <Text className={classes.title}>Пароль</Text>

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
          <ControlledPasswordInput
            label="Текущий пароль"
            name="password"
            placeholder="Введите текущий пароль"
            control={control}
            errorMessage={errors.password?.message}
            disabled={!isEditing}
          />

          <ControlledPasswordInput
            label="Новый пароль"
            name="newPassword"
            placeholder="Введите новый пароль"
            control={control}
            errorMessage={errors.newPassword?.message}
            disabled={!isEditing}
            style={{
              gridRowStart: 2,
            }}
          />

          <ControlledPasswordInput
            label="Подтвердите пароль"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            control={control}
            errorMessage={errors.confirmPassword?.message}
            disabled={!isEditing}
            style={{
              gridRowStart: 2,
            }}
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
