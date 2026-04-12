import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSetActiveTenant, useTenantsQuery } from '@/features/tenant/hooks/useTenants'
import type { TenantRole } from '@/types/tenant.types'

export const Route = createFileRoute('/_app/tenants/')({
  component: TenantsIndexRoute,
})

function roleBadgeVariant(role: TenantRole) {
  if (role === 'owner') return 'default' as const
  if (role === 'admin') return 'secondary' as const
  return 'outline' as const
}

function TenantsIndexRoute() {
  const { t } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const tenants = useTenantsQuery()
  const setActive = useSetActiveTenant()

  return (
    <div className="space-y-6">
      <PageHeader title={t('tenants.title')} description={t('tenants.description')} />

      <div className="grid gap-4 md:grid-cols-2">
        {tenants.isLoading ? <p className="text-sm text-muted-foreground">{tc('loading')}</p> : null}
        {tenants.data?.map((tenant) => (
          <Card key={tenant.id} className={tenant.isActive ? 'border-primary' : ''}>
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <CardTitle className="truncate">{tenant.name}</CardTitle>
                <CardDescription className="truncate">
                  {tenant.slug}.harasy.app{tenant.customDomain ? ` · ${tenant.customDomain}` : ''}
                </CardDescription>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <Badge variant={roleBadgeVariant(tenant.role)}>{tc(`roles.${tenant.role}`)}</Badge>
                {tenant.isActive ? <Badge variant="secondary">{t('tenants.active')}</Badge> : null}
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                disabled={setActive.isPending || tenant.isActive}
                onClick={() => setActive.mutate(tenant.id)}
              >
                {t('tenants.setActive')}
              </Button>
              <Button type="button" size="sm" variant="secondary" className="cursor-pointer" asChild>
                <Link to="/tenants/$tenantId/settings" params={{ tenantId: tenant.id }}>
                  {t('tenants.settings')}
                </Link>
              </Button>
              {tenant.role === 'owner' ? (
                <Button type="button" size="sm" className="cursor-pointer" asChild>
                  <Link to="/tenants/$tenantId/workspace" params={{ tenantId: tenant.id }}>
                    {t('tenants.workspace')}
                  </Link>
                </Button>
              ) : (
                <Button type="button" size="sm" className="cursor-pointer" disabled title={t('tenants.ownerOnly')}>
                  {t('tenants.workspace')}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
