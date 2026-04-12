import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Github } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useLogin } from '@/features/auth/hooks/useAuthMutations'
import { createLoginSchema, type LoginFormValues } from '@/features/auth/schemas/auth.schemas'

export function LoginForm() {
  const { t, i18n } = useTranslation('auth')
  const navigate = useNavigate()
  const login = useLogin()

  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values)
      await navigate({ to: '/dashboard' })
    } catch {
      form.setError('root', { message: t('login.errorRoot') })
    }
  })

  return (
    <form key={i18n.language} className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">{t('login.email')}</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
        {form.formState.errors.email ? (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="password">{t('login.password')}</Label>
          <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline cursor-pointer">
            {t('login.forgotPassword')}
          </Link>
        </div>
        <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
        {form.formState.errors.password ? (
          <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember"
          checked={Boolean(form.watch('rememberMe'))}
          onCheckedChange={(v) => form.setValue('rememberMe', v === true)}
        />
        <Label htmlFor="remember" className="cursor-pointer">
          {t('login.rememberMe')}
        </Label>
      </div>

      {form.formState.errors.root ? (
        <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
      ) : null}

      <Button type="submit" className="w-full cursor-pointer" disabled={login.isPending}>
        {login.isPending ? t('login.submitting') : t('login.submit')}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{t('login.oauthDivider')}</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline" className="cursor-pointer" disabled>
          {t('login.google')}
        </Button>
        <Button type="button" variant="outline" className="cursor-pointer" disabled>
          <Github className="h-4 w-4" />
          {t('login.github')}
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {t('login.noAccount')}{' '}
        <Link to="/register" className="font-medium text-primary hover:underline cursor-pointer">
          {t('login.createOne')}
        </Link>
      </p>
    </form>
  )
}
