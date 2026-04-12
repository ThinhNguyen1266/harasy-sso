import { delay } from '@/lib/utils'
import { mockSession } from '@/mocks/auth.mock'
import type { Session } from '@/types/auth.types'

export type LoginInput = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterInput = {
  displayName: string
  email: string
  password: string
}

export type ForgotPasswordRequestInput = { email: string }
export type ForgotPasswordVerifyOtpInput = { email: string; code: string }
export type ForgotPasswordResetInput = { email: string; newPassword: string }

export async function login(input: LoginInput): Promise<Session> {
  await delay(450)
  if (!input.email.includes('@')) {
    throw new Error('Invalid email')
  }
  if (input.password.length < 6) {
    throw new Error('Invalid credentials')
  }
  return {
    ...mockSession,
    user: {
      ...mockSession.user,
      email: input.email,
    },
  }
}

export async function register(input: RegisterInput): Promise<Session> {
  await delay(500)
  return {
    ...mockSession,
    user: {
      ...mockSession.user,
      email: input.email,
      displayName: input.displayName,
    },
  }
}

export async function logout(): Promise<void> {
  await delay(150)
}

export async function requestPasswordReset(input: ForgotPasswordRequestInput): Promise<{ sent: true }> {
  await delay(400)
  void input
  return { sent: true }
}

export async function verifyPasswordResetOtp(input: ForgotPasswordVerifyOtpInput): Promise<{ ok: boolean }> {
  await delay(350)
  return { ok: input.code === '123456' }
}

export async function resetPassword(input: ForgotPasswordResetInput): Promise<{ ok: true }> {
  await delay(350)
  void input
  return { ok: true }
}
