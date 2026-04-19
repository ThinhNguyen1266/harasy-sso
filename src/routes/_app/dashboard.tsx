import { useOrganizationList, useSessionList, useUser } from '@clerk/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { DashboardActivity } from '@/types/dashboard.types'

export const Route = createFileRoute('/_app/dashboard')({
  component: DashboardRoute,
})

function DashboardRoute() {
  const { t } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const { user, isLoaded: isUserLoaded } = useUser()
  const {
    isLoaded: isOrgsLoaded,
    userMemberships,
    userInvitations,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
    userInvitations: {
      infinite: true,
      status: 'pending',
    },
  })
  const { isLoaded: isSessionsLoaded, sessions } = useSessionList()
  const sessionList = sessions ?? []

  const name = user?.firstName ?? user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? t('dashboard.welcomeFallback')
  const isStatsLoading = !isUserLoaded || !isOrgsLoaded

  const stats = {
    tenantsCount: userMemberships.data?.length ?? 0,
    pendingInvites: userInvitations.data?.length ?? 0,
    planName: (typeof user?.publicMetadata?.plan === 'string' ? user.publicMetadata.plan : null) ?? 'Free',
  }

  const activities = useMemo<DashboardActivity[]>(() => {
    if (!isUserLoaded || !user) return []

    const items: DashboardActivity[] = []
    const accountCreatedAt = user.createdAt?.toISOString() ?? new Date().toISOString()

    if (sessionList.length > 0) {
      const latestSession = sessionList[0]
      items.push({
        id: `session_${latestSession.id}`,
        title: 'Signed in',
        description: 'Recent authenticated session',
        occurredAt: latestSession.lastActiveAt?.toISOString() ?? user.lastSignInAt?.toISOString() ?? new Date().toISOString(),
      })
    } else if (user.lastSignInAt) {
      items.push({
        id: 'last_sign_in',
        title: 'Signed in',
        description: 'Recent account sign-in',
        occurredAt: user.lastSignInAt.toISOString(),
      })
    }

    if (userMemberships.data?.[0]?.organization?.name) {
      items.push({
        id: `membership_${userMemberships.data[0].id}`,
        title: 'Organization membership',
        description: `Member of ${userMemberships.data[0].organization.name}`,
        occurredAt: userMemberships.data[0].createdAt?.toISOString() ?? accountCreatedAt,
      })
    }

    if (user.updatedAt && user.createdAt && user.updatedAt.getTime() !== user.createdAt.getTime()) {
      items.push({
        id: 'profile_updated',
        title: 'Profile updated',
        description: 'Account details were updated',
        occurredAt: user.updatedAt.toISOString(),
      })
    }

    items.push({
      id: 'account_created',
      title: 'Account created',
      description: 'Welcome to Harasy',
      occurredAt: accountCreatedAt,
    })

    return items.sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
  }, [isUserLoaded, sessionList, user, userMemberships.data])

  const isActivitiesLoading = !isUserLoaded || !isSessionsLoaded || !isOrgsLoaded

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
            {isStatsLoading ? '—' : stats.tenantsCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stats.invites')}</CardTitle>
            <CardDescription>{t('dashboard.stats.invitesDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {isStatsLoading ? '—' : stats.pendingInvites}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.stats.plan')}</CardTitle>
            <CardDescription>{t('dashboard.stats.planDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{isStatsLoading ? '—' : stats.planName}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.activity.title')}</CardTitle>
          <CardDescription>{t('dashboard.activity.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isActivitiesLoading ? <p className="text-sm text-muted-foreground">{tc('loading')}</p> : null}
          {activities.map((a, idx) => (
            <div key={a.id}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(a.occurredAt).toLocaleString()}</div>
              </div>
              {idx < activities.length - 1 ? <Separator className="mt-3" /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
