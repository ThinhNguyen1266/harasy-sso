import type { ClerkProviderProps } from '@clerk/react'

import logoLightUrl from '@/assets/logo-light.png'
import logoUrl from '@/assets/logo.png'

type ClerkAppearance = NonNullable<ClerkProviderProps['appearance']>

/**
 * Maps Harasy brand tokens (see index.css) to Clerk appearance variables for light / dark.
 * Hex values approximate the OKLCH palette used in Tailwind @theme.
 */
export function buildClerkAppearance(resolvedTheme: string | undefined): ClerkAppearance {
  const isDark = resolvedTheme === 'dark'
  const logoImageUrl = isDark ? logoUrl : logoLightUrl

  return {
    variables: {
      colorPrimary: isDark ? '#d4893b' : '#c8782a',
      colorBackground: isDark ? '#1c1510' : '#faf8f4',
      colorText: isDark ? '#f0ebe2' : '#2e200e',
      colorTextSecondary: isDark ? '#a89a8a' : '#6b5d4f',
      colorInputBackground: isDark ? '#231d15' : '#ffffff',
      colorInputText: isDark ? '#f0ebe2' : '#2e200e',
      colorDanger: isDark ? '#e85d4c' : '#c43d2e',
      borderRadius: '0.5rem',
      fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    },
    options: {
      logoImageUrl,
      logoPlacement: 'inside',
    },
  }
}
