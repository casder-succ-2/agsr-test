import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { database } from '@/db'
import { generateTokens, verifyRefreshToken } from '@/lib/jwt'

export async function GET() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refresh_token')

  const { sub } = await verifyRefreshToken(refreshToken?.value || '')

  const user = await database.user.findFirst({
    where: { id: sub },
  })

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { as, rf } = await generateTokens(user)

  cookies().set('auth_token', as, { path: '/' })
  cookies().set('refresh_token', rf, { path: '/', httpOnly: true })

  const updatedUser = await database.user.update({
    where: { id: sub },
    data: { refreshToken: rf },
  })

  return NextResponse.json({ updatedUser })
}
