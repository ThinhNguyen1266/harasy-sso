import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCancelSubscription, useChangePlan, usePlansQuery, useSubscriptionQuery } from '@/features/subscription/hooks/useSubscription'
import type { SubscriptionPlanId } from '@/types/subscription.types'

export const Route = createFileRoute('/_app/subscription')({
  component: SubscriptionRoute,
})

function pct(used: number, limit: number) {
  if (limit <= 0) return 0
  return Math.min(100, Math.round((used / limit) * 100))
}

function SubscriptionRoute() {
  const { t } = useTranslation('app')
  const sub = useSubscriptionQuery()
  const plans = usePlansQuery()
  const changePlan = useChangePlan()
  const cancel = useCancelSubscription()

  const usage = sub.data?.usage

  return (
    <div className="space-y-6">
      <PageHeader title={t('subscription.title')} description={t('subscription.description')} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle>{t('subscription.currentPlan')}</CardTitle>
              <CardDescription>{t('subscription.currentPlanDesc')}</CardDescription>
            </div>
            <Badge variant="secondary">{sub.data?.status ?? '—'}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-2xl font-semibold capitalize">{sub.data?.planId ?? '—'}</div>
                <div className="text-sm text-muted-foreground">
                  {t('subscription.billing')}: {sub.data?.billingInterval ?? '—'} · {t('subscription.renews')}{' '}
                  {sub.data?.currentPeriodEnd ? new Date(sub.data.currentPeriodEnd).toLocaleDateString() : '—'}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  disabled={cancel.isPending}
                  onClick={() => cancel.mutate(!sub.data?.cancelAtPeriodEnd)}
                >
                  {sub.data?.cancelAtPeriodEnd ? t('subscription.keepSub') : t('subscription.cancelEnd')}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-sm font-medium">{t('subscription.seats')}</div>
                <Progress value={usage ? pct(usage.seatsUsed, usage.seatsLimit) : 0} />
                <div className="text-xs text-muted-foreground">
                  {usage?.seatsUsed ?? 0} / {usage?.seatsLimit ?? 0}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">{t('subscription.apiCalls')}</div>
                <Progress value={usage ? pct(usage.apiCallsUsed, usage.apiCallsLimit) : 0} />
                <div className="text-xs text-muted-foreground">
                  {usage?.apiCallsUsed.toLocaleString() ?? 0} / {usage?.apiCallsLimit.toLocaleString() ?? 0}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">{t('subscription.storage')}</div>
                <Progress value={usage ? pct(usage.storageGbUsed, usage.storageGbLimit) : 0} />
                <div className="text-xs text-muted-foreground">
                  {usage?.storageGbUsed ?? 0} GB / {usage?.storageGbLimit ?? 0} GB
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('subscription.needMore')}</CardTitle>
            <CardDescription>{t('subscription.needMoreDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{t('subscription.enterpriseBlurb')}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('subscription.compare')}</CardTitle>
          <CardDescription>{t('subscription.compareDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('subscription.planCol')}</TableHead>
                <TableHead>{t('subscription.monthly')}</TableHead>
                <TableHead>{t('subscription.yearly')}</TableHead>
                <TableHead className="text-right">{t('subscription.action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.data?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{p.name}</span>
                      {p.highlighted ? <Badge>{t('subscription.popular')}</Badge> : null}
                    </div>
                    <div className="text-xs text-muted-foreground">{p.description}</div>
                  </TableCell>
                  <TableCell>{p.priceMonthly === 0 ? t('subscription.free') : `$${p.priceMonthly}`}</TableCell>
                  <TableCell>{p.priceYearly === 0 ? '—' : `$${p.priceYearly}`}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant={p.id === sub.data?.planId ? 'secondary' : 'default'}
                      className="cursor-pointer"
                      disabled={changePlan.isPending || p.id === sub.data?.planId}
                      onClick={() => changePlan.mutate(p.id as SubscriptionPlanId)}
                    >
                      {p.id === sub.data?.planId ? t('subscription.current') : t('subscription.select')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">{t('subscription.footerNote')}</CardFooter>
      </Card>
    </div>
  )
}
