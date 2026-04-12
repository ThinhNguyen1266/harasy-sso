import type { ReactNode } from 'react'

import loginBgUrl from '@/assets/loginbg.png'
import { AppLogo } from '@/components/shared/AppLogo'
import { ThemeLanguageToolbar } from '@/components/shared/ThemeLanguageToolbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type AuthLayoutProps = {
  title: string
  description?: string
  children: ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBgUrl})` }}
        aria-hidden
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b',
          'from-black/55 via-black/45 to-black/65',
          'dark:from-black/75 dark:via-black/65 dark:to-black/80',
        )}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-dvh flex-col px-4 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
          <div className="mb-6 flex items-start justify-between gap-4">
            <AppLogo className="drop-shadow-sm" />
            <ThemeLanguageToolbar variant="compact" className="shrink-0" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center pb-8">
            <div className="w-full max-w-md">
              <Card className="border-border/80 bg-card/95 shadow-none backdrop-blur-sm dark:bg-card/90">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  {description ? <CardDescription>{description}</CardDescription> : null}
                </CardHeader>
                <CardContent>{children}</CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
