import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface WeeklyTrend {
  date: string;
  sleep_latency: number; // minutes
  total_sleep_time: number; // minutes
  sleep_quality: number; // 1-10 scale
}

export const trendKeys = {
  all: ['trends'] as const,
  weekly: () => [...trendKeys.all, 'weekly'] as const,
  monthly: () => [...trendKeys.all, 'monthly'] as const,
};

export function useWeeklyTrends() {
  return useQuery({
    queryKey: trendKeys.weekly(),
    queryFn: () => api.get<WeeklyTrend[]>('/sleep/trends/weekly'),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
