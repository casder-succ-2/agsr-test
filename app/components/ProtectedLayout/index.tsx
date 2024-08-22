'use client'

import { useLayoutEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { selectAccount } from '@/lib/store/features/account/accountSlice'

interface Props {
  children?: React.ReactNode
}

export function ProtectedLayout({ children }: Props) {
  const pathName = usePathname()

  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)

  useLayoutEffect(() => {
    if (!account && pathName !== '/login') {
      redirect('/login')
    }

    if (account && pathName === '/login') {
      redirect('/')
    }
  }, [account, dispatch, pathName])

  return <>{children}</>
}
