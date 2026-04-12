import type { SubscriptionPlan, UserSubscription } from '@/types/subscription.types'

export const mockUserSubscription: UserSubscription = {
  planId: 'pro',
  status: 'active',
  billingInterval: 'monthly',
  currentPeriodEnd: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
  cancelAtPeriodEnd: false,
  usage: {
    seatsUsed: 12,
    seatsLimit: 25,
    apiCallsUsed: 420_000,
    apiCallsLimit: 1_000_000,
    storageGbUsed: 38,
    storageGbLimit: 100,
  },
}

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals exploring Harasy.',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'USD',
    features: ['1 tenant', '2 seats', 'Community support'],
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Small teams getting started.',
    priceMonthly: 29,
    priceYearly: 290,
    currency: 'USD',
    features: ['Up to 3 tenants', '10 seats', 'Email support', 'SSO-ready'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Growing SaaS with advanced needs.',
    priceMonthly: 99,
    priceYearly: 990,
    currency: 'USD',
    highlighted: true,
    features: ['Unlimited tenants', '25 seats', 'Priority support', 'Audit logs', 'Custom domains'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Security, scale, and dedicated support.',
    priceMonthly: 499,
    priceYearly: 4990,
    currency: 'USD',
    features: ['Dedicated success manager', 'SLA', 'VPC option', 'Advanced compliance'],
  },
]
