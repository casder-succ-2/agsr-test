'use client'

import { useLayoutEffect } from 'react'
import { Center, Loader } from '@mantine/core'

import { getAuthCookie } from '@/lib/cookies'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
  getAccoutnAsync,
  selectAccount,
  selectStatus,
} from '@/lib/store/features/account/accountSlice'
import { increment } from '@/lib/store/features/notification/notificationSlice'

interface Props {
  children?: React.ReactNode
}

export function AuthLayout({ children }: Props) {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const account = useAppSelector(selectAccount)

  const auth_token = getAuthCookie('auth_token')

  useLayoutEffect(() => {
    if (auth_token) {
      dispatch(increment())
      dispatch(getAccoutnAsync())
    }
  }, [auth_token, dispatch])

  if (!account && status === 'loading') {
    return (
      <Center h="100dvh">
        <Loader size="xl" type="bars" color="#13A3B9" />
      </Center>
    )
  }

  return <div>{children}</div>
}
