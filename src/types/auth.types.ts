export type AuthUser = {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
}

export type Session = {
  user: AuthUser
  accessToken: string
  expiresAt: string
}
