import type { Tenant, TenantMember } from '@/types/tenant.types'

export const mockTenants: Tenant[] = [
  {
    id: 'ten_acme',
    name: 'Acme Corp',
    slug: 'acme',
    logoUrl: null,
    customDomain: 'auth.acme.com',
    role: 'owner',
    memberCount: 14,
    isActive: true,
  },
  {
    id: 'ten_northwind',
    name: 'Northwind Traders',
    slug: 'northwind',
    logoUrl: null,
    customDomain: null,
    role: 'admin',
    memberCount: 6,
    isActive: false,
  },
  {
    id: 'ten_contoso',
    name: 'Contoso',
    slug: 'contoso',
    logoUrl: null,
    customDomain: null,
    role: 'member',
    memberCount: 42,
    isActive: false,
  },
]

export const mockTenantMembersByTenantId: Record<string, TenantMember[]> = {
  ten_acme: [
    {
      id: 'mem_1',
      userId: 'user_01',
      displayName: 'Anh Thịnh',
      email: 'thinh@harasy.io',
      role: 'owner',
      joinedAt: '2024-01-10T08:00:00.000Z',
    },
    {
      id: 'mem_2',
      userId: 'user_02',
      displayName: 'Minh An',
      email: 'minh@harasy.io',
      role: 'admin',
      joinedAt: '2024-02-02T08:00:00.000Z',
    },
    {
      id: 'mem_3',
      userId: 'user_03',
      displayName: 'Lan Pham',
      email: 'lan@harasy.io',
      role: 'member',
      joinedAt: '2024-03-15T08:00:00.000Z',
    },
  ],
  ten_northwind: [
    {
      id: 'mem_n1',
      userId: 'user_01',
      displayName: 'Anh Thịnh',
      email: 'thinh@harasy.io',
      role: 'admin',
      joinedAt: '2024-06-01T08:00:00.000Z',
    },
  ],
  ten_contoso: [
    {
      id: 'mem_c1',
      userId: 'user_01',
      displayName: 'Anh Thịnh',
      email: 'thinh@harasy.io',
      role: 'member',
      joinedAt: '2025-01-20T08:00:00.000Z',
    },
  ],
}
