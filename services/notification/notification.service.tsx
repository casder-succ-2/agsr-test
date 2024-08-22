import { showNotification } from '@mantine/notifications'

interface Options {
  autoClose?: number | boolean
}

export const notificationService = {
  showSuccess: (message: string, options: Options = {}) => {
    showNotification({
      ...options,
      message,
      color: 'green',
    })
  },

  showError: (message: string, options: Options = {}) => {
    showNotification({
      ...options,
      message,
      color: 'red',
    })
  },
}
