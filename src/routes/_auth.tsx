import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { ensureSessionFromStorage } from '@/stores/auth.store'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ location }) => {
    const authed = Boolean(ensureSessionFromStorage())
    const path = location.pathname
    if (authed && (path === '/login' || path === '/register' || path === '/forgot-password')) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => <Outlet />,
})
