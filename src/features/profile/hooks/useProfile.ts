import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import * as profileService from '@/services/profile.service'

const profileKey = ['profile'] as const

export function useProfileQuery() {
  return useQuery({
    queryKey: profileKey,
    queryFn: profileService.getProfile,
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: (next) => {
      qc.setQueryData(profileKey, next)
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: profileService.changePassword,
  })
}

export function useUpdateTwoFactor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: profileService.updateTwoFactor,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: profileKey })
    },
  })
}
