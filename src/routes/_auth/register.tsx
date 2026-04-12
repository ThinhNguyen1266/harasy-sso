import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { AuthLayout } from '@/components/shared/AuthLayout'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterRoute,
})

function RegisterRoute() {
  const { t } = useTranslation('auth')
  return (
    <AuthLayout title={t('register.title')} description={t('register.description')}>
      <RegisterForm />
    </AuthLayout>
  )
}
