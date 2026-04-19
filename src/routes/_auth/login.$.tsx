import { createFileRoute } from '@tanstack/react-router'

import { LoginRoute } from '@/routes/_auth/login'

export const Route = createFileRoute('/_auth/login/$')({
  component: LoginRoute,
})
