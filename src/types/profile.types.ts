export type UserProfile = {
  id: string
  email: string
  displayName: string
  phone: string | null
  jobTitle: string | null
  timezone: string
  avatarUrl: string | null
  twoFactorEnabled: boolean
}
