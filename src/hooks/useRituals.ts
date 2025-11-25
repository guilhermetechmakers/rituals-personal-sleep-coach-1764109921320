import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Ritual } from '@/types';

export const ritualKeys = {
  all: ['rituals'] as const,
  lists: () => [...ritualKeys.all, 'list'] as const,
  list: (filters: string) => [...ritualKeys.lists(), { filters }] as const,
  details: () => [...ritualKeys.all, 'detail'] as const,
  detail: (id: string) => [...ritualKeys.details(), id] as const,
  today: () => [...ritualKeys.all, 'today'] as const,
};

export function useTodayRitual() {
  return useQuery({
    queryKey: ritualKeys.today(),
    queryFn: () => api.get<Ritual>('/rituals/today'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRitual(id: string) {
  return useQuery({
    queryKey: ritualKeys.detail(id),
    queryFn: () => api.get<Ritual>(`/rituals/${id}`),
    enabled: !!id,
  });
}

export function useCreateRitual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ritual: Partial<Ritual>) => api.post<Ritual>('/rituals', ritual),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ritualKeys.all });
    },
  });
}

export function useUpdateRitual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Ritual> }) =>
      api.put<Ritual>(`/rituals/${id}`, updates),
    onSuccess: (updatedRitual) => {
      queryClient.setQueryData(ritualKeys.detail(updatedRitual.id), updatedRitual);
      queryClient.invalidateQueries({ queryKey: ritualKeys.all });
    },
  });
}
