import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { User } from '@/types';

export const authKeys = {
  user: ['auth', 'user'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: async () => {
      const response = await api.get<User>('/users/me');
      return response;
    },
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
      // Store token
      if (response.token) {
        const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
        await AsyncStorage.setItem('auth_token', response.token);
      }
      return response;
    },
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(authKeys.user, data.user);
      }
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string; full_name?: string }) => {
      return api.post<{ user: User; token: string }>('/auth/register', data);
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout', {});
      const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
      await AsyncStorage.removeItem('auth_token');
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
