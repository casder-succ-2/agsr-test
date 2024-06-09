import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mockData = [
	{
		name: 'Automated Information System 1',
		metadata: 33,
		electronicServices: 33,
		references: 33
	},
	{
		name: 'Automated Information System 2',
		metadata: 22,
		electronicServices: 22,
		references: 22
	},
	{
		name: 'Automated Information System 3',
		metadata: 0,
		electronicServices: 54,
		references: 52
	},
	{
		name: 'Automated Information System 4',
		metadata: 0,
		electronicServices: 52,
		references: 52
	}
]

async function upsertMockData(data) {
	const systems = await prisma.automatedInformationSystem.createMany({ data })
	const user = await prisma.user.create({
		data: {
			email: 'test@gmail.com',
			///password: qwe12345
			password: '$2b$10$pKNbrdcVy6MKpblnMVGpqes74Dupy7a/gBnenOm73f0DbCmv1ipBK'
		}
	})

	return { systems, user }
}

async function seed() {
	const data = await upsertMockData(mockData)

	console.log(data, 'mock data inserted')
}

seed()
	.catch(async e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
