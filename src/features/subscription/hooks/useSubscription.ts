import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import * as subscriptionService from '@/services/subscription.service'
import type { SubscriptionPlanId } from '@/types/subscription.types'

const subscriptionKey = ['subscription'] as const
const plansKey = ['subscription', 'plans'] as const

export function useSubscriptionQuery() {
  return useQuery({
    queryKey: subscriptionKey,
    queryFn: subscriptionService.getSubscription,
  })
}

export function usePlansQuery() {
  return useQuery({
    queryKey: plansKey,
    queryFn: subscriptionService.getPlans,
  })
}

export function useChangePlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (planId: SubscriptionPlanId) => subscriptionService.changePlan(planId),
    onSuccess: (next) => {
      qc.setQueryData(subscriptionKey, next)
    },
  })
}

export function useCancelSubscription() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (cancelAtPeriodEnd: boolean) => subscriptionService.cancelSubscription(cancelAtPeriodEnd),
    onSuccess: (next) => {
      qc.setQueryData(subscriptionKey, next)
    },
  })
}
