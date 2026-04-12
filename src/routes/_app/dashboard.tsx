import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useDashboardActivitiesQuery, useDashboardStatsQuery } from '@/features/dashboard/hooks/useDashboard'
import { useAuthStore } from '@/stores/auth.store'

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardRoute,
})

function DashboardRoute() {
  const { t } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const session = useAuthStore((s) => s.session)
  const stats = useDashboardStatsQuery()
  const activities = useDashboardActivitiesQuery()

  const name = session?.user.displayName ?? t('dashboard.welcomeFallback')

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('dashboard.welcome', { name })}
        description={t('dashboard.description')}
        actions={
          <Link to="/invitations">
            <Badge variant="secondary" className="cursor-pointer">
              {tc('nav.invitations')}
            </Badge>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stats.tenants')}</CardTitle>
            <CardDescription>{t('dashboard.stats.tenantsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {stats.isLoading ? '—' : stats.data?.tenantsCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stats.invites')}</CardTitle>
            <CardDescription>{t('dashboard.stats.invitesDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {stats.isLoading ? '—' : stats.data?.pendingInvites}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stats.plan')}</CardTitle>
            <CardDescription>{t('dashboard.stats.planDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{stats.isLoading ? '—' : stats.data?.planName}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.activity.title')}</CardTitle>
          <CardDescription>{t('dashboard.activity.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.isLoading ? <p className="text-sm text-muted-foreground">{tc('loading')}</p> : null}
          {activities.data?.map((a, idx) => (
            <div key={a.id}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(a.occurredAt).toLocaleString()}</div>
              </div>
              {idx < (activities.data?.length ?? 0) - 1 ? <Separator className="mt-3" /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
