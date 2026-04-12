import type { TenantRole } from './tenant.types'

export type TenantInvitation = {
  id: string
  tenantId: string
  tenantName: string
  email: string
  role: TenantRole
  invitedByName: string
  createdAt: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
}
