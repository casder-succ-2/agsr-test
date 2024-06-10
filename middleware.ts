import { cookies } from 'next/headers'
import { verifyToken } from './lib/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const cookieStore = cookies()
	const bearerToken = cookieStore.get('auth_token')

	try {
		const newHeaders = new Headers(req.headers)
		const { id } = await verifyToken(bearerToken?.value || '')

		newHeaders.set('userId', id)

		return NextResponse.next({
			request: {
				headers: newHeaders,
			},
		})
	} catch (error) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
	}
}

export const config = {
	matcher: [
		'/api/system/:path*',
		'/api/account/change-contact-info',
		'/api/account/change-password',
		'/api/account/update',
		'/api/account',
	],
}
