import type { DashboardActivity, DashboardStats } from '@/types/dashboard.types'

export const mockDashboardStats: DashboardStats = {
  tenantsCount: 3,
  pendingInvites: 2,
  planName: 'Pro',
}

export const mockDashboardActivities: DashboardActivity[] = [
  {
    id: 'act_1',
    title: 'Signed in from a new device',
    description: 'Chrome on macOS · Ho Chi Minh City',
    occurredAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act_2',
    title: 'Tenant switched',
    description: 'Active tenant set to Acme Corp',
    occurredAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act_3',
    title: 'Profile updated',
    description: 'Display name and timezone changed',
    occurredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
