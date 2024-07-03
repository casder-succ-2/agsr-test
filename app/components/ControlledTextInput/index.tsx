'use client'

import { Controller, Control } from 'react-hook-form'
import { TextInput, TextInputProps } from '@mantine/core'

interface ControlledTextInputProps extends TextInputProps {
	name: string
	control: Control<any>
	errorMessage?: string
}

export const ControlledTextInput = ({
	name,
	control,
	errorMessage,
	...rest
}: ControlledTextInputProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<TextInput {...rest} {...field} error={errorMessage} autoComplete='off' />
		)}
	/>
)
