import { delay } from '@/lib/utils'
import { mockTenantMembersByTenantId, mockTenants } from '@/mocks/tenant.mock'
import type { Tenant, TenantMember, TenantRole } from '@/types/tenant.types'

export async function getTenants(): Promise<Tenant[]> {
  await delay(320)
  return mockTenants
}

export async function getTenant(tenantId: string): Promise<Tenant | null> {
  await delay(250)
  return mockTenants.find((t) => t.id === tenantId) ?? null
}

export async function getTenantMembers(tenantId: string): Promise<TenantMember[]> {
  await delay(300)
  return mockTenantMembersByTenantId[tenantId] ?? []
}

export async function setActiveTenant(tenantId: string): Promise<Tenant[]> {
  await delay(200)
  return mockTenants.map((t) => ({ ...t, isActive: t.id === tenantId }))
}

export type InviteMemberInput = {
  tenantId: string
  email: string
  role: TenantRole
}

export async function inviteMember(input: InviteMemberInput): Promise<{ ok: true }> {
  await delay(400)
  void input
  return { ok: true }
}

export type UpdateTenantSettingsInput = {
  tenantId: string
  name: string
  slug: string
  customDomain: string | null
}

export async function updateTenantSettings(input: UpdateTenantSettingsInput): Promise<Tenant> {
  await delay(400)
  const existing = mockTenants.find((t) => t.id === input.tenantId)
  if (!existing) {
    throw new Error('Tenant not found')
  }
  return {
    ...existing,
    name: input.name,
    slug: input.slug,
    customDomain: input.customDomain,
  }
}
