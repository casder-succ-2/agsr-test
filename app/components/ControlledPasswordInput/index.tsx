import { Control, Controller } from 'react-hook-form'
import { PasswordInput, PasswordInputProps } from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

import classes from './index.module.css'

interface ControlledPasswordInputProps
	extends Omit<PasswordInputProps, 'error'> {
	name: string
	control: Control<any>
	errorMessage?: string
}

export const ControlledPasswordInput = ({
	name,
	control,
	errorMessage,
	...rest
}: ControlledPasswordInputProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<PasswordInput
				{...rest}
				{...field}
				classNames={{
					input: classes.input
				}}
				visibilityToggleIcon={({ reveal }) =>
					reveal ? <IconEye /> : <IconEyeOff />
				}
				error={errorMessage}
			/>
		)}
	/>
)
