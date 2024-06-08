import { Controller, Control } from 'react-hook-form'
import { TextInput, TextInputProps } from '@mantine/core'

import cx from 'clsx'

import classes from './index.module.css'

interface ControlledTextInputProps extends TextInputProps {
	name: string
	control: Control<any>
	errorMessage?: string
	defaultValue?: string
}

export const ControlledTextInput = ({
	name,
	control,
	errorMessage,
	defaultValue = '',
	...rest
}: ControlledTextInputProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<TextInput
				{...rest}
				{...field}
				error={errorMessage}
				defaultValue={defaultValue}
				autoComplete='off'
			/>
		)}
	/>
)
