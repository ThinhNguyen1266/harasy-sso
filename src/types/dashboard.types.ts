export type DashboardActivity = {
  id: string
  title: string
  description: string
  occurredAt: string
}

export type DashboardStats = {
  tenantsCount: number
  pendingInvites: number
  planName: string
}
