import { useAuth } from '@clerk/react'
import { type ReactNode, useEffect } from 'react'

import { setClerkTokenGetter } from '@/lib/axios'

type ClerkAxiosBridgeProps = {
  children: ReactNode
}

/** Wires Clerk session token into the shared Axios instance for harasy-microservice-api. */
export function ClerkAxiosBridge({ children }: ClerkAxiosBridgeProps) {
  const { getToken, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) {
      setClerkTokenGetter(null)
      return
    }
    setClerkTokenGetter(() => getToken())
    return () => {
      setClerkTokenGetter(null)
    }
  }, [getToken, isSignedIn])

  return <>{children}</>
}
