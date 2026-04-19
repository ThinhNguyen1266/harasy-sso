import { useTranslation } from 'react-i18next'

import { AppLogo } from '@/components/shared/AppLogo'
import { ThemeLanguageToolbar } from '@/components/shared/ThemeLanguageToolbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ClerkPublishableKeyMissing() {
  const { t } = useTranslation('common')

  return (
    <div className="relative min-h-dvh bg-background px-4 py-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <AppLogo />
          <ThemeLanguageToolbar variant="compact" className="shrink-0" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('clerkConfig.missingKeyTitle')}</CardTitle>
            <CardDescription>{t('clerkConfig.missingKeyDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ol className="list-decimal space-y-2 pl-5">
              <li>{t('clerkConfig.stepCopy')}</li>
              <li>
                <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">VITE_CLERK_PUBLISHABLE_KEY=pk_test_…</code>
              </li>
              <li>{t('clerkConfig.stepRestart')}</li>
            </ol>
            <p className="text-xs">{t('clerkConfig.docsHint')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
