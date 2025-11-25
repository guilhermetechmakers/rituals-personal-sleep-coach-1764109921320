import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Habit } from '@/types';

export const habitKeys = {
  all: ['habits'] as const,
  lists: () => [...habitKeys.all, 'list'] as const,
  list: (filters: string) => [...habitKeys.lists(), { filters }] as const,
  details: () => [...habitKeys.all, 'detail'] as const,
  detail: (id: string) => [...habitKeys.details(), id] as const,
  today: () => [...habitKeys.all, 'today'] as const,
};

export function useTodayHabits() {
  return useQuery({
    queryKey: habitKeys.today(),
    queryFn: () => api.get<Habit[]>('/habits/today'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useToggleHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      api.patch<Habit>(`/habits/${id}`, { completed_today: completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
}
