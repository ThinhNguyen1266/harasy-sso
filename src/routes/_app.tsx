import { useAuth } from '@clerk/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { AppShell } from '@/components/shared/AppShell'
import { FullPageSpinner } from '@/components/shared/FullPageSpinner'

export const Route = createFileRoute('/_app')({
  component: AppGuard,
})

function AppGuard() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      void navigate({ to: '/login' })
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return <FullPageSpinner />
  if (!isSignedIn) return null
  return <AppShell />
}
