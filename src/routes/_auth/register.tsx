import { SignUp } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '@/components/shared/AuthLayout'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterRoute,
})

export function RegisterRoute() {
  return (
    <AuthLayout>
      <div className="flex w-full justify-center [&_.cl-rootBox]:w-full [&_.cl-card]:shadow-none">
        <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/dashboard" />
      </div>
    </AuthLayout>
  )
}
