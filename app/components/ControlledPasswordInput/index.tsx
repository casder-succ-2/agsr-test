'use client'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { PasswordInputProps } from '@mantine/core'
import { PasswordInput } from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

import classes from './index.module.css'

interface ControlledPasswordInputProps
  extends Omit<PasswordInputProps, 'error'> {
  name: string
  control: Control<any>
  errorMessage?: string
}

export function ControlledPasswordInput({
  name,
  control,
  errorMessage,
  ...rest
}: ControlledPasswordInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PasswordInput
          {...rest}
          {...field}
          classNames={{
            input: classes.input,
          }}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <IconEye /> : <IconEyeOff />}
          error={errorMessage}
        />
      )}
    />
  )
}
