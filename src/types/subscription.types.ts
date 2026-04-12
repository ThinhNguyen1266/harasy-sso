export type BillingInterval = 'monthly' | 'yearly'

export type SubscriptionPlanId = 'free' | 'starter' | 'pro' | 'enterprise'

export type SubscriptionPlan = {
  id: SubscriptionPlanId
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  currency: string
  features: string[]
  highlighted?: boolean
}

export type SubscriptionUsage = {
  seatsUsed: number
  seatsLimit: number
  apiCallsUsed: number
  apiCallsLimit: number
  storageGbUsed: number
  storageGbLimit: number
}

export type UserSubscription = {
  planId: SubscriptionPlanId
  status: 'active' | 'trialing' | 'past_due' | 'canceled'
  billingInterval: BillingInterval
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  usage: SubscriptionUsage
}
