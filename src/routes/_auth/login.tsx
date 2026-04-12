import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { AuthLayout } from '@/components/shared/AuthLayout'
import { LoginForm } from '@/features/auth/components/LoginForm'

export const Route = createFileRoute('/_auth/login')({
  component: LoginRoute,
})

function LoginRoute() {
  const { t } = useTranslation('auth')
  return (
    <AuthLayout title={t('login.title')} description={t('login.description')}>
      <LoginForm />
    </AuthLayout>
  )
}
