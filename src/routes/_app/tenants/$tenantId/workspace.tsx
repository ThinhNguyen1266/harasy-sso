import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { PageHeader } from '@/components/shared/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useInviteMember, useTenantMembersQuery, useTenantQuery } from '@/features/tenant/hooks/useTenants'
import { cn } from '@/lib/utils'
import type { TenantRole } from '@/types/tenant.types'

export const Route = createFileRoute('/_app/tenants/$tenantId/workspace')({
  component: TenantWorkspaceRoute,
})

function TenantWorkspaceRoute() {
  const { t, i18n } = useTranslation('app')
  const { t: tc } = useTranslation('common')
  const { tenantId } = Route.useParams()
  const tenant = useTenantQuery(tenantId)
  const members = useTenantMembersQuery(tenantId)
  const invite = useInviteMember(tenantId)

  const inviteSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t('validation.email')),
        role: z.enum(['admin', 'member']),
      }),
    [t],
  )

  type InviteForm = z.infer<typeof inviteSchema>

  const form = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '', role: 'member' },
  })

  if (tenant.isLoading) {
    return <p className="text-sm text-muted-foreground">{tc('loading')}</p>
  }

  if (!tenant.data) {
    return (
      <div className="space-y-3">
        <PageHeader title={t('workspace.notFound')} />
        <Button asChild variant="outline" className="cursor-pointer">
          <Link to="/tenants">{t('workspace.back')}</Link>
        </Button>
      </div>
    )
  }

  if (tenant.data.role !== 'owner') {
    return (
      <div className="space-y-3">
        <PageHeader title={t('workspace.restrictedTitle')} description={t('workspace.restrictedDesc')} />
        <Card>
          <CardHeader>
            <CardTitle>{t('workspace.accessTitle')}</CardTitle>
            <CardDescription>
              {t('workspace.accessDesc', {
                name: tenant.data.name,
                role: tc(`roles.${tenant.data.role}`),
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link to="/tenants">{t('workspace.back')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('workspace.title', { name: tenant.data.name })}
        description={t('workspace.description')}
        actions={
          <Button asChild variant="outline" className="cursor-pointer">
            <Link to="/tenants/$tenantId/settings" params={{ tenantId }}>
              {t('workspace.tenantSettings')}
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('workspace.members')}</CardTitle>
            <CardDescription>{t('workspace.membersDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('workspace.user')}</TableHead>
                  <TableHead>{t('workspace.role')}</TableHead>
                  <TableHead className="text-right">{t('workspace.joined')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.data?.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="font-medium">{m.displayName}</div>
                      <div className="text-xs text-muted-foreground">{m.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{tc(`roles.${m.role}`)}</Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(m.joinedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('workspace.invite.title')}</CardTitle>
            <CardDescription>{t('workspace.invite.desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              key={i18n.language}
              className="space-y-3"
              onSubmit={form.handleSubmit(async (values) => {
                await invite.mutateAsync({ email: values.email, role: values.role as TenantRole })
                form.reset({ email: '', role: values.role })
              })}
            >
              <div className="space-y-2">
                <Label htmlFor="email">{t('workspace.invite.email')}</Label>
                <Input id="email" type="email" {...form.register('email')} />
                {form.formState.errors.email ? (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t('workspace.invite.role')}</Label>
                <select
                  id="role"
                  className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors duration-200 cursor-pointer',
                  )}
                  {...form.register('role')}
                >
                  <option value="admin">{t('workspace.invite.admin')}</option>
                  <option value="member">{t('workspace.invite.member')}</option>
                </select>
              </div>
              <Button type="submit" className="w-full cursor-pointer" disabled={invite.isPending}>
                {invite.isPending ? t('workspace.invite.sending') : t('workspace.invite.send')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle>{t('workspace.danger.title')}</CardTitle>
          <CardDescription>{t('workspace.danger.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button type="button" variant="destructive" className="cursor-pointer" disabled>
            {t('workspace.danger.transfer')}
          </Button>
          <Button type="button" variant="destructive" className="cursor-pointer" disabled>
            {t('workspace.danger.delete')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
