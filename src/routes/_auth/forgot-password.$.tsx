import { createFileRoute } from '@tanstack/react-router'

import { ForgotPasswordRoute } from '@/routes/_auth/forgot-password'

export const Route = createFileRoute('/_auth/forgot-password/$')({
  component: ForgotPasswordRoute,
})
