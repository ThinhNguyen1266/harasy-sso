import { delay } from '@/lib/utils'
import { mockSubscriptionPlans, mockUserSubscription } from '@/mocks/subscription.mock'
import type { SubscriptionPlan, SubscriptionPlanId, UserSubscription } from '@/types/subscription.types'

export async function getSubscription(): Promise<UserSubscription> {
  await delay(320)
  return mockUserSubscription
}

export async function getPlans(): Promise<SubscriptionPlan[]> {
  await delay(280)
  return mockSubscriptionPlans
}

export async function changePlan(planId: SubscriptionPlanId): Promise<UserSubscription> {
  await delay(450)
  return { ...mockUserSubscription, planId }
}

export async function cancelSubscription(cancelAtPeriodEnd: boolean): Promise<UserSubscription> {
  await delay(400)
  return { ...mockUserSubscription, cancelAtPeriodEnd }
}
