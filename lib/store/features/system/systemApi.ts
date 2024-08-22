import type { AutomatedInformationSystem } from '@prisma/client'

import { apiService } from '@/services'

export async function fetchSystemList(params: {
  page: number
  perPage: number
  searchValue: string
}) {
  try {
    const response = await apiService.get('/api/system', params)

    return response as { list: AutomatedInformationSystem[], count: number }
  }
  catch (error) {
    const e = error as { data: { message: string } }
    throw e.data.message
  }
}

export async function createSystem() {
  try {
    const response = await apiService.post('/api/system')

    return response as { system: AutomatedInformationSystem }
  }
  catch (error) {
    const e = error as { data: { message: string } }
    throw e.data.message
  }
}
