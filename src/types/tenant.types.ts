export type TenantRole = 'owner' | 'admin' | 'member'

export type Tenant = {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  customDomain: string | null
  role: TenantRole
  memberCount: number
  isActive: boolean
}

export type TenantMember = {
  id: string
  userId: string
  displayName: string
  email: string
  role: TenantRole
  joinedAt: string
}
