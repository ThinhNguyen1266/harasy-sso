import type { TenantInvitation } from '@/types/invitation.types'

export const mockInvitations: TenantInvitation[] = [
  {
    id: 'inv_1',
    tenantId: 'ten_fabrikam',
    tenantName: 'Fabrikam',
    email: 'thinh@harasy.io',
    role: 'admin',
    invitedByName: 'Alex Rivera',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'inv_2',
    tenantId: 'ten_tailspin',
    tenantName: 'Tailspin Toys',
    email: 'thinh@harasy.io',
    role: 'member',
    invitedByName: 'Jordan Lee',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  },
]
