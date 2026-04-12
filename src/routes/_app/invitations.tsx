import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAcceptInvitation, useDeclineInvitation, useInvitationsQuery } from '@/features/invitation/hooks/useInvitations'

export const Route = createFileRoute('/_app/invitations')({
  component: InvitationsRoute,
})

function InvitationsRoute() {
  const { t } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const invites = useInvitationsQuery()
  const accept = useAcceptInvitation()
  const decline = useDeclineInvitation()

  return (
    <div className="space-y-6">
      <PageHeader title={t('invitations.title')} description={t('invitations.description')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('invitations.pending')}</CardTitle>
          <CardDescription>{t('invitations.pendingDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invites.isLoading ? <p className="text-sm text-muted-foreground">{tc('loading')}</p> : null}
          {invites.data?.length ? null : !invites.isLoading ? (
            <p className="text-sm text-muted-foreground">{t('invitations.empty')}</p>
          ) : null}

          {invites.data?.map((i) => (
            <div key={i.id} className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-base font-semibold">{i.tenantName}</div>
                    <Badge variant="secondary">{tc(`roles.${i.role}`)}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t('invitations.invitedBy', {
                      name: i.invitedByName,
                      date: new Date(i.createdAt).toLocaleString(),
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">{t('invitations.sentTo', { email: i.email })}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer"
                    disabled={accept.isPending || decline.isPending}
                    onClick={() => accept.mutate(i.id)}
                  >
                    {t('invitations.accept')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={accept.isPending || decline.isPending}
                    onClick={() => decline.mutate(i.id)}
                  >
                    {t('invitations.decline')}
                  </Button>
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
