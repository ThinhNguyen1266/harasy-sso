import { useAuth } from '@clerk/react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { FullPageSpinner } from '@/components/shared/FullPageSpinner'

export const Route = createFileRoute('/')({
  component: IndexGate,
})

function IndexGate() {
  const { isLoaded, isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return
    void navigate({ to: isSignedIn ? '/dashboard' : '/login', replace: true })
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) return <FullPageSpinner />
  return null
}
