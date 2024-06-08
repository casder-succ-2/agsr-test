'use client'

import { useLayoutEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import {
	selectAccount,
	getAccoutnAsync
} from '@/lib/store/features/account/accountSlice'

type Props = {
	children?: React.ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
	const { push } = useRouter()
	const pathName = usePathname()

	const dispatch = useAppDispatch()
	const account = useAppSelector(selectAccount)

	useLayoutEffect(() => {
		if (!account) {
			dispatch(getAccoutnAsync())
		}

		if (account && pathName === '/login') {
			push('/')
		}

		if (!account && pathName !== '/login') {
			push('/login')
		}
	}, [account, dispatch, pathName, push])

	return <>{children}</>
}
