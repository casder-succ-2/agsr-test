import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { verifyAccessToken } from './lib/jwt'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const bearerToken = cookieStore.get('auth_token')

  try {
    const newHeaders = new Headers(req.headers)
    const { id } = await verifyAccessToken(bearerToken?.value || '')

    newHeaders.set('userId', id)

    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    })
  }
  catch (error) {
    console.error(error)

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}

export const config = {
  matcher: [
    '/api/system/:path*',
    '/api/account/change-contact-info',
    '/api/account/change-password',
    '/api/account/logout',
    '/api/account/update',
    '/api/account',
  ],
}
