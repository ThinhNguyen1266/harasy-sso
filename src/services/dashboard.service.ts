import { delay } from '@/lib/utils'
import { mockDashboardActivities, mockDashboardStats } from '@/mocks/dashboard.mock'
import type { DashboardActivity, DashboardStats } from '@/types/dashboard.types'

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(250)
  return mockDashboardStats
}

export async function getDashboardActivities(): Promise<DashboardActivity[]> {
  await delay(280)
  return mockDashboardActivities
}
