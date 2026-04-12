import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { PageHeader } from '@/components/shared/PageHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  useChangePassword,
  useProfileQuery,
  useUpdateProfile,
  useUpdateTwoFactor,
} from '@/features/profile/hooks/useProfile'

export const Route = createFileRoute('/_app/profile')({
  component: ProfileRoute,
})

function ProfileRoute() {
  const { t, i18n } = useTranslation('app')
  const profile = useProfileQuery()
  const updateProfile = useUpdateProfile()
  const changePassword = useChangePassword()
  const update2fa = useUpdateTwoFactor()

  const profileSchema = useMemo(
    () =>
      z.object({
        displayName: z.string().min(2, t('validation.displayNameMin')),
        phone: z.string().optional(),
        jobTitle: z.string().optional(),
        timezone: z.string().min(2, t('validation.timezoneMin')),
      }),
    [t],
  )

  type ProfileForm = z.infer<typeof profileSchema>

  const passwordSchema = useMemo(
    () =>
      z
        .object({
          currentPassword: z.string().min(6, t('validation.passwordMin6')),
          newPassword: z.string().min(8, t('validation.passwordMin8')),
          confirmPassword: z.string(),
        })
        .refine((d) => d.newPassword === d.confirmPassword, {
          message: t('validation.passwordMismatch'),
          path: ['confirmPassword'],
        }),
    [t],
  )

  type PasswordForm = z.infer<typeof passwordSchema>

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      phone: '',
      jobTitle: '',
      timezone: 'Asia/Ho_Chi_Minh',
    },
  })

  useEffect(() => {
    if (!profile.data) return
    form.reset({
      displayName: profile.data.displayName,
      phone: profile.data.phone ?? '',
      jobTitle: profile.data.jobTitle ?? '',
      timezone: profile.data.timezone,
    })
  }, [profile.data, form])

  const pw = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  return (
    <div className="space-y-6">
      <PageHeader title={t('profile.title')} description={t('profile.description')} />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general" className="cursor-pointer">
            {t('profile.tabs.general')}
          </TabsTrigger>
          <TabsTrigger value="security" className="cursor-pointer">
            {t('profile.tabs.security')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.identity.title')}</CardTitle>
              <CardDescription>{t('profile.identity.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  {profile.data?.avatarUrl ? <AvatarImage src={profile.data.avatarUrl} alt="" /> : null}
                  <AvatarFallback>{profile.data?.displayName?.slice(0, 2).toUpperCase() ?? 'HR'}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{t('profile.identity.avatar')}</div>
                  <div className="text-xs text-muted-foreground">{t('profile.identity.avatarMock')}</div>
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer" disabled>
                    {t('profile.identity.upload')}
                  </Button>
                </div>
              </div>

              <Separator />

              <form
                key={`general-${i18n.language}`}
                className="grid gap-4 md:grid-cols-2"
                onSubmit={form.handleSubmit(async (values) => {
                  await updateProfile.mutateAsync({
                    displayName: values.displayName,
                    phone: values.phone || null,
                    jobTitle: values.jobTitle || null,
                    timezone: values.timezone,
                  })
                })}
              >
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">{t('profile.identity.email')}</Label>
                  <Input id="email" value={profile.data?.email ?? ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">{t('profile.identity.displayName')}</Label>
                  <Input id="displayName" {...form.register('displayName')} />
                  {form.formState.errors.displayName ? (
                    <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">{t('profile.identity.jobTitle')}</Label>
                  <Input id="jobTitle" {...form.register('jobTitle')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('profile.identity.phone')}</Label>
                  <Input id="phone" {...form.register('phone')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t('profile.identity.timezone')}</Label>
                  <Input id="timezone" {...form.register('timezone')} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="cursor-pointer" disabled={updateProfile.isPending || profile.isLoading}>
                    {updateProfile.isPending ? t('profile.identity.saving') : t('profile.identity.save')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.password.title')}</CardTitle>
                <CardDescription>{t('profile.password.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  key={`security-${i18n.language}`}
                  className="space-y-3"
                  onSubmit={pw.handleSubmit(async (values) => {
                    await changePassword.mutateAsync({
                      currentPassword: values.currentPassword,
                      newPassword: values.newPassword,
                    })
                    pw.reset()
                  })}
                >
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t('profile.password.current')}</Label>
                    <Input id="currentPassword" type="password" {...pw.register('currentPassword')} />
                    {pw.formState.errors.currentPassword ? (
                      <p className="text-sm text-destructive">{pw.formState.errors.currentPassword.message}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t('profile.password.new')}</Label>
                    <Input id="newPassword" type="password" {...pw.register('newPassword')} />
                    {pw.formState.errors.newPassword ? (
                      <p className="text-sm text-destructive">{pw.formState.errors.newPassword.message}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('profile.password.confirm')}</Label>
                    <Input id="confirmPassword" type="password" {...pw.register('confirmPassword')} />
                    {pw.formState.errors.confirmPassword ? (
                      <p className="text-sm text-destructive">{pw.formState.errors.confirmPassword.message}</p>
                    ) : null}
                  </div>
                  <Button type="submit" className="cursor-pointer" disabled={changePassword.isPending}>
                    {changePassword.isPending ? t('profile.password.submitting') : t('profile.password.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('profile.twoFactor.title')}</CardTitle>
                <CardDescription>{t('profile.twoFactor.description')}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  {t('profile.twoFactor.status', {
                    state: profile.data?.twoFactorEnabled ? t('profile.twoFactor.on') : t('profile.twoFactor.off'),
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{t('profile.twoFactor.enable')}</span>
                  <Switch
                    checked={Boolean(profile.data?.twoFactorEnabled)}
                    disabled={profile.isLoading || update2fa.isPending}
                    onCheckedChange={(v) => update2fa.mutate(v)}
                    className="cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
