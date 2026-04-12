import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/i18n/config'

type AppProvidersProps = {
  children: ReactNode
  queryClient: QueryClient
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="harasy-theme" disableTransitionOnChange>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </I18nextProvider>
    </ThemeProvider>
  )
}
