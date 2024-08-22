import { z } from 'zod'
import { NextResponse } from 'next/server'

import { database } from '@/db'

const updateSchema = z.object({
  lastName: z.string().min(1, 'Required'),
  middleName: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  identificationNumber: z.string().min(1, 'Required'),
  userName: z.string().min(1, 'Required'),
})

export async function PUT(req: Request) {
  const headers = req.headers
  const userId = headers.get('userId') || ''

  const { lastName, middleName, firstName, identificationNumber, userName } = await req.json()

  const validatedFields = updateSchema.safeParse({
    lastName,
    middleName,
    firstName,
    identificationNumber,
    userName,
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
    const updatedUser = await database.user.update({
      where: { id: userId },
      data: {
        lastName,
        middleName,
        firstName,
        identificationNumber,
        userName,
      },
    })
    return NextResponse.json({ user: updatedUser })
  }
  catch (error) {
    console.error(error)

    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
