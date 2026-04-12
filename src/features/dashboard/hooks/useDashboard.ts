import { useQuery } from '@tanstack/react-query'

import * as dashboardService from '@/services/dashboard.service'

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getDashboardStats,
  })
}

export function useDashboardActivitiesQuery() {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: dashboardService.getDashboardActivities,
  })
}
