import { createFileRoute } from '@tanstack/react-router'

import { RegisterRoute } from '@/routes/_auth/register'

export const Route = createFileRoute('/_auth/register/$')({
  component: RegisterRoute,
})
