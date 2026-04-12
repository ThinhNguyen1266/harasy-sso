import { Languages, Monitor, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type ThemeLanguageToolbarProps = {
  className?: string
  /** Larger hit targets on auth pages */
  variant?: 'default' | 'compact'
}

export function ThemeLanguageToolbar({ className, variant = 'default' }: ThemeLanguageToolbarProps) {
  const { t, i18n } = useTranslation('common')
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const iconBtn =
    variant === 'compact' ? 'h-8 w-8' : 'h-9 w-9'

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="icon" className={cn('cursor-pointer shrink-0', iconBtn)} aria-label={t('theme.toggle')}>
            {!mounted ? <Sun className="h-4 w-4" /> : resolvedTheme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[10rem]">
          <DropdownMenuLabel>{t('theme.toggle')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme ?? 'system'} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light" className="cursor-pointer">
              <Sun className="mr-2 h-4 w-4" />
              {t('theme.light')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" />
              {t('theme.dark')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system" className="cursor-pointer">
              <Monitor className="mr-2 h-4 w-4" />
              {t('theme.system')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="icon" className={cn('cursor-pointer shrink-0', iconBtn)} aria-label={t('language.label')}>
            <Languages className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('language.label')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => void i18n.changeLanguage('en')}>
            {t('language.en')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => void i18n.changeLanguage('vi')}>
            {t('language.vi')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
