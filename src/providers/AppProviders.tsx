import { ClerkProvider } from '@clerk/react'
import { enUS, viVN } from '@clerk/localizations'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'

import { ClerkPublishableKeyMissing } from '@/components/shared/ClerkPublishableKeyMissing'
import i18n from '@/i18n/config'
import { buildClerkAppearance } from '@/lib/clerk-appearance'
import { clerkPublishableKey, hasClerkPublishableKey } from '@/lib/clerk-env'
import { ClerkAxiosBridge } from '@/providers/ClerkAxiosBridge'

type AppProvidersProps = {
  children: ReactNode
  queryClient: QueryClient
}

function ClerkSetup({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [lang, setLang] = useState(i18n.language)

  useEffect(() => {
    const handler = (lng: string) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => void i18n.off('languageChanged', handler)
  }, [])

  const localization = lang.startsWith('vi') ? viVN : enUS

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignOutUrl="/login"
      signInUrl="/login"
      signUpUrl="/register"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      localization={localization}
      appearance={buildClerkAppearance(resolvedTheme)}
    >
      {children}
    </ClerkProvider>
  )
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  if (!hasClerkPublishableKey()) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="harasy-theme" disableTransitionOnChange>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <ClerkPublishableKeyMissing />
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="harasy-theme" disableTransitionOnChange>
      <I18nextProvider i18n={i18n}>
        <ClerkSetup>
          <QueryClientProvider client={queryClient}>
            <ClerkAxiosBridge>{children}</ClerkAxiosBridge>
          </QueryClientProvider>
        </ClerkSetup>
      </I18nextProvider>
    </ThemeProvider>
  )
}
