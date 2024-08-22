import { z } from 'zod'
import { NextResponse } from 'next/server'

import { database } from '@/db'

const updateSchema = z.object({
  email: z.string().min(1, 'Required'),
  phoneNumber: z.string().min(1, 'Required'),
})

export async function PUT(req: Request) {
  const headers = req.headers
  const userId = headers.get('userId') || ''

  const { email, phoneNumber } = await req.json()

  const validatedFields = updateSchema.safeParse({
    email,
    phoneNumber,
  })

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        ...validatedFields.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  try {
    const user = await database.user.update({
      where: { id: userId },
      data: {
        email,
        phoneNumber,
      },
    })

    return NextResponse.json({ user })
  }
  catch (error) {
    console.error(error)

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
