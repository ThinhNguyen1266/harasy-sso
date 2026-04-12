import type { Session } from '@/types/auth.types'

export const mockSession: Session = {
  user: {
    id: 'user_01',
    email: 'thinh@harasy.io',
    displayName: 'Anh Thịnh',
    avatarUrl: null,
  },
  accessToken: 'mock_access_token',
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
}
