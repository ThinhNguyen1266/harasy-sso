import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Session } from '@/types/auth.types'

type AuthState = {
  session: Session | null
  setSession: (session: Session | null) => void
}

const storageKey = 'harasy_sso_session_v1'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
    }),
    {
      name: storageKey,
      partialize: (state) => ({ session: state.session }),
    },
  ),
)

export function getStoredSession(): Session | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state?: { session?: Session | null } }
    return parsed.state?.session ?? null
  } catch {
    return null
  }
}

/** Sync in-memory store from persisted storage (TanStack `beforeLoad` runs before rehydration). */
export function ensureSessionFromStorage(): Session | null {
  const current = useAuthStore.getState().session
  if (current) return current
  const stored = getStoredSession()
  if (stored) {
    useAuthStore.getState().setSession(stored)
    return stored
  }
  return null
}
