import { TextInput } from '@mantine/core'
import cx from 'clsx'

import classes from './index.module.css'

export default TextInput.extend({
	defaultProps: {
		size: 'lg',
		radius: 5
	},
	classNames: (_, props) => ({
		root: classes.inputWrapper,

		input: cx(classes.input, {
			[classes.inputError]: props.error
		}),

		label: classes.label,

		error: classes.errorMessage
	})
})
