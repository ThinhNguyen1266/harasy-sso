import { useClerk, useUser } from '@clerk/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import {
  Building2,
  CreditCard,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLogo } from '@/components/shared/AppLogo'
import { ThemeLanguageToolbar } from '@/components/shared/ThemeLanguageToolbar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function AppShell() {
  const { t } = useTranslation('common')
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { user } = useUser()
  const { signOut } = useClerk()
  const queryClient = useQueryClient()
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = useMemo(
    () =>
      [
        { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
        { to: '/profile', label: t('nav.profile'), icon: UserRound },
        { to: '/subscription', label: t('nav.subscription'), icon: CreditCard },
        { to: '/tenants', label: t('nav.tenants'), icon: Building2 },
        { to: '/invitations', label: t('nav.invitations'), icon: Inbox },
      ] as const,
    [t],
  )

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-background">
        <div className="flex min-h-dvh">
          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-40 w-64 border-r bg-card transition-transform duration-200 md:static md:translate-x-0',
              mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            )}
          >
            <div className="flex h-14 items-center gap-2 border-b px-4">
              <AppLogo />
            </div>
            <nav className="flex flex-col gap-1 p-3">
              {nav.map((item) => {
                const active = pathname === item.to || pathname.startsWith(`${item.to}/`)
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
                      active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          {mobileOpen ? (
            <button
              type="button"
              aria-label={t('actions.closeMenu')}
              className="fixed inset-0 z-30 bg-black/30 md:hidden cursor-pointer"
              onClick={() => setMobileOpen(false)}
            />
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col md:pl-0">
            <header className="flex h-14 items-center gap-3 border-b px-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="md:hidden cursor-pointer"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={t('actions.openMenu')}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="min-w-0 flex-1 text-sm text-muted-foreground">{t('brand.identity')}</div>
              <ThemeLanguageToolbar variant="compact" className="shrink-0" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? t('account')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="text-sm font-medium">{user?.fullName ?? user?.username}</div>
                    <div className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile">{t('nav.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => {
                      void queryClient.clear()
                      void signOut({ redirectUrl: '/login' })
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t('actions.logOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>

            <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-4 md:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
