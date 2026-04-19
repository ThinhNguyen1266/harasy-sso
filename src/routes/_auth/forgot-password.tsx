import { SignIn } from '@clerk/react'
import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '@/components/shared/AuthLayout'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordRoute,
})

export function ForgotPasswordRoute() {
  return (
    <AuthLayout>
      <div className="flex w-full justify-center [&_.cl-rootBox]:w-full [&_.cl-card]:shadow-none">
        <SignIn
          routing="path"
          path="/forgot-password"
          signInUrl="/login"
          signUpUrl="/register"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </AuthLayout>
  )
}
