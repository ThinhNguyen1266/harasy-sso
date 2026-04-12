import { createFileRoute, redirect } from '@tanstack/react-router'

import { AppShell } from '@/components/shared/AppShell'
import { ensureSessionFromStorage } from '@/stores/auth.store'

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    if (!ensureSessionFromStorage()) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppShell,
})
