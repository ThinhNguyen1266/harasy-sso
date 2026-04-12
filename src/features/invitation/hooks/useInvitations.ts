import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import * as invitationService from '@/services/invitation.service'

const invitationsKey = ['invitations'] as const

export function useInvitationsQuery() {
  return useQuery({
    queryKey: invitationsKey,
    queryFn: invitationService.getInvitations,
  })
}

export function useAcceptInvitation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: invitationService.acceptInvitation,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: invitationsKey })
      await qc.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}

export function useDeclineInvitation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: invitationService.declineInvitation,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: invitationsKey })
    },
  })
}
