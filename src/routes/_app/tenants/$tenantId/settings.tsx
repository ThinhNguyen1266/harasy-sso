import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useTenantQuery, useUpdateTenantSettings } from '@/features/tenant/hooks/useTenants'

export const Route = createFileRoute('/_app/tenants/$tenantId/settings')({
  component: TenantSettingsRoute,
})

function TenantSettingsRoute() {
  const { t, i18n } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const { tenantId } = Route.useParams()
  const tenant = useTenantQuery(tenantId)
  const update = useUpdateTenantSettings(tenantId)

  const settingsSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('validation.displayNameMin')),
        slug: z.string().min(2).regex(/^[a-z0-9-]+$/, t('validation.slug')),
        customDomain: z.string().optional(),
      }),
    [t],
  )

  type SettingsForm = z.infer<typeof settingsSchema>

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: '', slug: '', customDomain: '' },
  })

  useEffect(() => {
    if (!tenant.data) return
    form.reset({
      name: tenant.data.name,
      slug: tenant.data.slug,
      customDomain: tenant.data.customDomain ?? '',
    })
  }, [tenant.data, form])

  if (tenant.isLoading) {
    return <p className="text-sm text-muted-foreground">{tc('loading')}</p>
  }

  if (!tenant.data) {
    return (
      <div className="space-y-3">
        <PageHeader title={t('tenantSettings.notFound')} />
        <Button asChild variant="outline" className="cursor-pointer">
          <Link to="/tenants">{t('tenantSettings.back')}</Link>
        </Button>
      </div>
    )
  }

  const canWorkspace = tenant.data.role === 'owner'

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tenantSettings.title')}
        description={t('tenantSettings.description')}
        actions={
          canWorkspace ? (
            <Button asChild className="cursor-pointer">
              <Link to="/tenants/$tenantId/workspace" params={{ tenantId }}>
                {t('tenantSettings.openWorkspace')}
              </Link>
            </Button>
          ) : null
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div>
              <CardTitle>{t('tenantSettings.general')}</CardTitle>
              <CardDescription>{t('tenantSettings.generalDesc')}</CardDescription>
            </div>
            <Badge variant="secondary">{t('tenantSettings.role', { role: tc(`roles.${tenant.data.role}`) })}</Badge>
          </CardHeader>
          <CardContent>
            <form
              key={i18n.language}
              className="grid gap-4 md:grid-cols-2"
              onSubmit={form.handleSubmit(async (values) => {
                await update.mutateAsync({
                  name: values.name,
                  slug: values.slug,
                  customDomain: values.customDomain?.trim() ? values.customDomain.trim() : null,
                })
              })}
            >
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">{t('tenantSettings.name')}</Label>
                <Input id="name" {...form.register('name')} />
                {form.formState.errors.name ? (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">{t('tenantSettings.slug')}</Label>
                <Input id="slug" {...form.register('slug')} />
                {form.formState.errors.slug ? (
                  <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customDomain">{t('tenantSettings.domain')}</Label>
                <Input id="customDomain" placeholder="auth.example.com" {...form.register('customDomain')} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="cursor-pointer" disabled={update.isPending}>
                  {update.isPending ? t('tenantSettings.saving') : t('tenantSettings.save')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('tenantSettings.billing')}</CardTitle>
            <CardDescription>{t('tenantSettings.billingDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>{t('tenantSettings.billingBlurb')}</div>
            <Separator />
            <Button type="button" variant="outline" className="w-full cursor-pointer" asChild>
              <Link to="/subscription">{t('tenantSettings.goSubscription')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
