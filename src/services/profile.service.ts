import { delay } from '@/lib/utils'
import { mockUserProfile } from '@/mocks/profile.mock'
import type { UserProfile } from '@/types/profile.types'

export type UpdateProfileInput = Partial<
  Pick<UserProfile, 'displayName' | 'phone' | 'jobTitle' | 'timezone' | 'avatarUrl'>
>

export type ChangePasswordInput = {
  currentPassword: string
  newPassword: string
}

export async function getProfile(): Promise<UserProfile> {
  await delay(300)
  return mockUserProfile
}

export async function updateProfile(input: UpdateProfileInput): Promise<UserProfile> {
  await delay(350)
  return { ...mockUserProfile, ...input }
}

export async function changePassword(input: ChangePasswordInput): Promise<{ ok: true }> {
  await delay(400)
  void input
  return { ok: true }
}

export async function updateTwoFactor(enabled: boolean): Promise<{ twoFactorEnabled: boolean }> {
  await delay(300)
  return { twoFactorEnabled: enabled }
}
