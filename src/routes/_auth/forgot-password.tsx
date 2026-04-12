import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { AuthLayout } from '@/components/shared/AuthLayout'
import { ForgotPasswordWizard } from '@/features/auth/components/ForgotPasswordWizard'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordRoute,
})

function ForgotPasswordRoute() {
  const { t } = useTranslation('auth')
  return (
    <AuthLayout title={t('forgot.title')} description={t('forgot.description')}>
      <ForgotPasswordWizard />
    </AuthLayout>
  )
}
