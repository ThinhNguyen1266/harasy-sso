import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useRequestPasswordReset,
  useResetPassword,
  useVerifyPasswordResetOtp,
} from '@/features/auth/hooks/useAuthMutations'
import {
  createForgotEmailSchema,
  createForgotNewPasswordSchema,
  createForgotOtpSchema,
} from '@/features/auth/schemas/auth.schemas'

type Step = 'email' | 'otp' | 'password'

export function ForgotPasswordWizard() {
  const { t, i18n } = useTranslation('auth')
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')

  const forgotEmailSchema = useMemo(() => createForgotEmailSchema(t), [t])
  const forgotOtpSchema = useMemo(() => createForgotOtpSchema(t), [t])
  const forgotNewPasswordSchema = useMemo(() => createForgotNewPasswordSchema(t), [t])

  const requestReset = useRequestPasswordReset()
  const verifyOtp = useVerifyPasswordResetOtp()
  const resetPassword = useResetPassword()

  const emailForm = useForm<z.infer<ReturnType<typeof createForgotEmailSchema>>>({
    resolver: zodResolver(forgotEmailSchema),
    defaultValues: { email: '' },
  })

  const otpForm = useForm<z.infer<ReturnType<typeof createForgotOtpSchema>>>({
    resolver: zodResolver(forgotOtpSchema),
    defaultValues: { code: '' },
  })

  const passwordForm = useForm<z.infer<ReturnType<typeof createForgotNewPasswordSchema>>>({
    resolver: zodResolver(forgotNewPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  const otpHint = step === 'otp' ? <p className="text-xs text-muted-foreground">{t('forgot.otpHint')}</p> : null

  return (
    <div key={i18n.language} className="space-y-6">
      {step === 'email' ? (
        <form
          className="space-y-4"
          onSubmit={emailForm.handleSubmit(async (values) => {
            await requestReset.mutateAsync(values)
            setEmail(values.email)
            setStep('otp')
          })}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">{t('forgot.email')}</Label>
            <Input id="email" type="email" autoComplete="email" {...emailForm.register('email')} />
            {emailForm.formState.errors.email ? (
              <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={requestReset.isPending}>
            {requestReset.isPending ? t('forgot.sending') : t('forgot.sendCode')}
          </Button>
        </form>
      ) : null}

      {step === 'otp' ? (
        <form
          className="space-y-4"
          onSubmit={otpForm.handleSubmit(async (values) => {
            const res = await verifyOtp.mutateAsync({ email, code: values.code })
            if (!res.ok) {
              otpForm.setError('code', { message: t('forgot.invalidCode') })
              return
            }
            setStep('password')
          })}
          noValidate
        >
          {otpHint}
          <div className="space-y-2">
            <Label htmlFor="code">{t('forgot.codeLabel')}</Label>
            <Input id="code" inputMode="numeric" autoComplete="one-time-code" {...otpForm.register('code')} />
            {otpForm.formState.errors.code ? (
              <p className="text-sm text-destructive">{otpForm.formState.errors.code.message}</p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setStep('email')}>
              {t('forgot.back')}
            </Button>
            <Button type="submit" className="flex-1 cursor-pointer" disabled={verifyOtp.isPending}>
              {verifyOtp.isPending ? t('forgot.verifying') : t('forgot.verify')}
            </Button>
          </div>
        </form>
      ) : null}

      {step === 'password' ? (
        <form
          className="space-y-4"
          onSubmit={passwordForm.handleSubmit(async (values) => {
            await resetPassword.mutateAsync({ email, newPassword: values.newPassword })
            await navigate({ to: '/login' })
          })}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t('forgot.newPassword')}</Label>
            <Input id="newPassword" type="password" autoComplete="new-password" {...passwordForm.register('newPassword')} />
            {passwordForm.formState.errors.newPassword ? (
              <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('forgot.confirmNewPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...passwordForm.register('confirmPassword')}
            />
            {passwordForm.formState.errors.confirmPassword ? (
              <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={resetPassword.isPending}>
            {resetPassword.isPending ? t('forgot.updating') : t('forgot.updatePassword')}
          </Button>
        </form>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        <Link to="/login" className="font-medium text-primary hover:underline cursor-pointer">
          {t('forgot.backToSignIn')}
        </Link>
      </p>
    </div>
  )
}
