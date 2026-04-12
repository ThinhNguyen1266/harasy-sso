import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegister } from '@/features/auth/hooks/useAuthMutations'
import { createRegisterSchema, type RegisterFormValues } from '@/features/auth/schemas/auth.schemas'

export function RegisterForm() {
  const { t, i18n } = useTranslation('auth')
  const navigate = useNavigate()
  const register = useRegister()

  const registerSchema = useMemo(() => createRegisterSchema(t), [t])

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await register.mutateAsync({
        displayName: values.displayName,
        email: values.email,
        password: values.password,
      })
      await navigate({ to: '/dashboard' })
    } catch {
      form.setError('root', { message: t('register.errorRoot') })
    }
  })

  return (
    <form key={i18n.language} className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="displayName">{t('register.displayName')}</Label>
        <Input id="displayName" autoComplete="name" {...form.register('displayName')} />
        {form.formState.errors.displayName ? (
          <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t('register.email')}</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
        {form.formState.errors.email ? (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t('register.password')}</Label>
        <Input id="password" type="password" autoComplete="new-password" {...form.register('password')} />
        {form.formState.errors.password ? (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
        <Input id="confirmPassword" type="password" autoComplete="new-password" {...form.register('confirmPassword')} />
        {form.formState.errors.confirmPassword ? (
          <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
        ) : null}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={Boolean(form.watch('acceptTerms'))}
          onCheckedChange={(v) => form.setValue('acceptTerms', v === true, { shouldValidate: true })}
        />
        <Label htmlFor="terms" className="cursor-pointer text-sm leading-snug">
          {t('register.terms')}
        </Label>
      </div>
      {form.formState.errors.acceptTerms ? (
        <p className="text-sm text-destructive">{form.formState.errors.acceptTerms.message as string}</p>
      ) : null}

      {form.formState.errors.root ? (
        <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
      ) : null}

      <Button type="submit" className="w-full cursor-pointer" disabled={register.isPending}>
        {register.isPending ? t('register.submitting') : t('register.submit')}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t('register.hasAccount')}{' '}
        <Link to="/login" className="font-medium text-primary hover:underline cursor-pointer">
          {t('register.signIn')}
        </Link>
      </p>
    </form>
  )
}
