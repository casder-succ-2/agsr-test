import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'
import { database } from '@/db'

export async function PUT(req: Request) {
  const headers = req.headers
  const cookieStore = cookies()
  const userId = headers.get('userId') || ''

  const user = await database.user.update({
    where: { id: userId },
    data: {
      refreshToken: null,
    },
  })

  cookieStore.delete('refresh_token')

  return NextResponse.json({ user })
}
