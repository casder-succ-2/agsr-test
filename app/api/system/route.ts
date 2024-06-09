import { z } from 'zod'
import { NextResponse } from 'next/server'

import { database } from '@/db'

const schema = z.object({
	page: z.string().transform(Number).default('1'),
	perPage: z.string().transform(Number).default('25'),
	searchValue: z.string().default(' '),
})

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const page = searchParams.get('page')
	const perPage = searchParams.get('perPage')
	const searchValue = searchParams.get('searchValue')

	const { success, error, data } = schema.safeParse({
		page,
		perPage,
		searchValue,
	})

	if (!success) {
		return NextResponse.json(
			{
				...error.flatten().fieldErrors,
			},
			{ status: 400 },
		)
	}

	const searchValueFilter = {
		OR: [
			{
				name: {
					contains: `%${searchValue}%`,
				},
			},
		],
	}

	const [list, count] = await Promise.all([
		database.automatedInformationSystem.findMany({
			where: {
				...(searchValue && searchValueFilter),
			},
			orderBy: { createdAt: 'desc' },
			skip: data.page === 1 ? 0 : (data.page - 1) * data.perPage,
			take: data.perPage,
		}),
		database.automatedInformationSystem.count({}),
	])

	return NextResponse.json({ list, count: searchValue ? list.length : count })
}

export async function POST(req: Request) {
	const system = await database.automatedInformationSystem.create({
		data: {
			name: `Automated Information System ${Math.floor(Math.random() * 100)}`,
			metadata: Math.floor(Math.random() * 100),
			electronicServices: Math.floor(Math.random() * 100),
			references: Math.floor(Math.random() * 100),
		},
	})

	return NextResponse.json({ system })
}
