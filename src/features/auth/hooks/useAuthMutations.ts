import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as authService from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  const qc = useQueryClient()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (session) => {
      setSession(session)
      void qc.invalidateQueries()
    },
  })
}

export function useRegister() {
  const setSession = useAuthStore((s) => s.setSession)
  const qc = useQueryClient()

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (session) => {
      setSession(session)
      void qc.invalidateQueries()
    },
  })
}

export function useLogout() {
  const setSession = useAuthStore((s) => s.setSession)
  const qc = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: async () => {
      setSession(null)
      await qc.clear()
    },
  })
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: authService.requestPasswordReset,
  })
}

export function useVerifyPasswordResetOtp() {
  return useMutation({
    mutationFn: authService.verifyPasswordResetOtp,
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
  })
}
