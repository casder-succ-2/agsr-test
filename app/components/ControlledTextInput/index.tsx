'use client'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { TextInputProps } from '@mantine/core'
import { TextInput } from '@mantine/core'

interface ControlledTextInputProps extends TextInputProps {
  name: string
  control: Control<any>
  errorMessage?: string
}

export function ControlledTextInput({
  name,
  control,
  errorMessage,
  ...rest
}: ControlledTextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput {...rest} {...field} error={errorMessage} autoComplete="off" />
      )}
    />
  )
}
