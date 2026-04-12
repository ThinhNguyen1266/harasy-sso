import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(6, t('validation.passwordMin6')),
    rememberMe: z.boolean().optional(),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>

export function createRegisterSchema(t: TFunction) {
  return z
    .object({
      displayName: z.string().min(2, t('validation.nameShort')),
      email: z.string().email(t('validation.email')),
      password: z.string().min(8, t('validation.passwordMin8')),
      confirmPassword: z.string(),
      acceptTerms: z.boolean().refine((v) => v === true, { message: t('validation.acceptTerms') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsMismatch'),
      path: ['confirmPassword'],
    })
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>

export function createForgotEmailSchema(t: TFunction) {
  return z.object({
    email: z.string().email(t('validation.email')),
  })
}

export function createForgotOtpSchema(t: TFunction) {
  return z.object({
    code: z.string().length(6, t('validation.otpLength')),
  })
}

export function createForgotNewPasswordSchema(t: TFunction) {
  return z
    .object({
      newPassword: z.string().min(8, t('validation.passwordMin8')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordsMismatch'),
      path: ['confirmPassword'],
    })
}
