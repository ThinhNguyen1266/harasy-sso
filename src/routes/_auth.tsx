import { useAuth } from '@clerk/react'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { FullPageSpinner } from '@/components/shared/FullPageSpinner'

export const Route = createFileRoute('/_auth')({
  component: AuthLayoutShell,
})

function AuthLayoutShell() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void navigate({ to: '/dashboard' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return <FullPageSpinner />
  if (isSignedIn) return null
  return <Outlet />
}
