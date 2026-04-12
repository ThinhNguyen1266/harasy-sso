import { useTranslation } from 'react-i18next'

import logoUrl from '@/assets/logo.png'
import { cn } from '@/lib/utils'

export function AppLogo({ className }: { className?: string }) {
  const { t } = useTranslation('common')

  return (
    <div className={cn('flex items-center gap-3 text-foreground', className)}>
      <img src={logoUrl} alt={t('brand.logoAlt')} className="h-9 w-auto max-w-[140px] object-contain object-left dark:brightness-110" />
      <div className="leading-tight">
        <div className="text-xs font-medium text-muted-foreground">{t('brand.tagline')}</div>
      </div>
    </div>
  )
}
