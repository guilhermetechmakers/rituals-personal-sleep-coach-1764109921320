import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { OnboardingAnswers, UserAssessment, RitualPreview } from '@/types';

export const onboardingKeys = {
  assessment: ['onboarding', 'assessment'] as const,
  preview: ['onboarding', 'preview'] as const,
};

export function useSaveAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: OnboardingAnswers) => {
      return api.post<UserAssessment>('/onboarding/assessment', { answers });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.assessment });
    },
  });
}

export function useGenerateRitualPreview() {
  return useMutation({
    mutationFn: async (answers: OnboardingAnswers) => {
      return api.post<RitualPreview>('/onboarding/preview', { answers });
    },
  });
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: OnboardingAnswers) => {
      const response = await api.post<{ assessment: UserAssessment; ritual_preview: RitualPreview }>(
        '/onboarding/complete',
        { answers }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: onboardingKeys.assessment });
      // Invalidate user data to refresh onboarding status
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    },
  });
}
