import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import * as tenantService from '@/services/tenant.service'
import type { TenantRole } from '@/types/tenant.types'

const tenantsKey = ['tenants'] as const

export function useTenantsQuery() {
  return useQuery({
    queryKey: tenantsKey,
    queryFn: tenantService.getTenants,
  })
}

export function useTenantQuery(tenantId: string) {
  return useQuery({
    queryKey: [...tenantsKey, tenantId],
    queryFn: () => tenantService.getTenant(tenantId),
    enabled: Boolean(tenantId),
  })
}

export function useTenantMembersQuery(tenantId: string) {
  return useQuery({
    queryKey: [...tenantsKey, tenantId, 'members'],
    queryFn: () => tenantService.getTenantMembers(tenantId),
    enabled: Boolean(tenantId),
  })
}

export function useSetActiveTenant() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: tenantService.setActiveTenant,
    onSuccess: (next) => {
      qc.setQueryData(tenantsKey, next)
    },
  })
}

export function useInviteMember(tenantId: string) {
  return useMutation({
    mutationFn: (input: { email: string; role: TenantRole }) =>
      tenantService.inviteMember({ tenantId, ...input }),
  })
}

export function useUpdateTenantSettings(tenantId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: { name: string; slug: string; customDomain: string | null }) =>
      tenantService.updateTenantSettings({ tenantId, ...input }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: tenantsKey })
      await qc.invalidateQueries({ queryKey: [...tenantsKey, tenantId] })
    },
  })
}
