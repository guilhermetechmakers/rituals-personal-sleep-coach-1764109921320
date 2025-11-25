import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { SleepSession, SleepScore } from '@/types';

export const sleepKeys = {
  all: ['sleep'] as const,
  sessions: () => [...sleepKeys.all, 'sessions'] as const,
  session: (id: string) => [...sleepKeys.sessions(), id] as const,
  score: () => [...sleepKeys.all, 'score'] as const,
  recent: () => [...sleepKeys.all, 'recent'] as const,
};

export function useRecentSleepSessions() {
  return useQuery({
    queryKey: sleepKeys.recent(),
    queryFn: () => api.get<SleepSession[]>('/sleep/sessions/recent'),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSleepScore() {
  return useQuery({
    queryKey: sleepKeys.score(),
    queryFn: () => api.get<SleepScore>('/sleep/score'),
    staleTime: 1000 * 60 * 10,
  });
}

export function useLogSleep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (session: Partial<SleepSession>) => api.post<SleepSession>('/sleep/sessions', session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sleepKeys.all });
    },
  });
}
