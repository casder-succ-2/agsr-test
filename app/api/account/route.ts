import { NextResponse } from 'next/server'
import { database } from '@/db'

export async function GET(req: Request) {
	const headers = req.headers
	const userId = headers.get('userId') || ''

	const user = await database.user.findFirst({ where: { id: userId } })

	return NextResponse.json({ user })
}
