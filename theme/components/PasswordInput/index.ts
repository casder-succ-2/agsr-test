import { PasswordInput } from '@mantine/core'
import cx from 'clsx'

import classes from './index.module.css'

export default PasswordInput.extend({
  defaultProps: {
    size: 'lg',
    radius: 5,
  },

  classNames: (_, props) => ({
    root: classes.inputWrapper,

    innerInput: cx(classes.input, {
      [classes.inputError]: props.error,
    }),

    input: cx(classes.input, {
      [classes.inputError]: props.error,
    }),

    label: classes.label,

    error: classes.errorMessage,
  }),
})
