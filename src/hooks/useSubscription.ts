import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionApi } from '@/lib/subscription-api';
import type {
  Subscription,
  Plan,
  Transaction,
  PromoCode,
  PaymentMethod,
  SubscriptionCheckout,
  SubscriptionUpdate,
  PaginatedResponse,
} from '@/types';
import { toast } from '@/lib/toast';

export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  current: () => [...subscriptionKeys.all, 'current'] as const,
  plans: () => [...subscriptionKeys.all, 'plans'] as const,
  plan: (id: string) => [...subscriptionKeys.plans(), id] as const,
  transactions: () => [...subscriptionKeys.all, 'transactions'] as const,
  transaction: (id: string) => [...subscriptionKeys.transactions(), id] as const,
  paymentMethods: () => [...subscriptionKeys.all, 'payment-methods'] as const,
};

// Current subscription
export function useSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current(),
    queryFn: () => subscriptionApi.getSubscription(),
    staleTime: 1000 * 60 * 5,
  });
}

// Plans
export function usePlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: () => subscriptionApi.getPlans(),
    staleTime: 1000 * 60 * 60, // Plans don't change often
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: subscriptionKeys.plan(id),
    queryFn: () => subscriptionApi.getPlan(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

// Create subscription
export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscriptionCheckout) => subscriptionApi.createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.transactions() });
      toast.success('Subscription activated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create subscription');
    },
  });
}

// Update subscription
export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscriptionUpdate) => subscriptionApi.updateSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      toast.success('Subscription updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update subscription');
    },
  });
}

// Cancel subscription
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => subscriptionApi.cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
      toast.success('Subscription will be canceled at the end of the billing period');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });
}

// Transactions
export function useTransactions(page = 1, limit = 20) {
  return useQuery({
    queryKey: [...subscriptionKeys.transactions(), page, limit],
    queryFn: () => subscriptionApi.getTransactions(page, limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: subscriptionKeys.transaction(id),
    queryFn: () => subscriptionApi.getTransaction(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// Promo codes
export function useValidatePromoCode() {
  return useMutation({
    mutationFn: (code: string) => subscriptionApi.validatePromoCode(code),
    onError: (error: Error) => {
      toast.error(error.message || 'Invalid promo code');
    },
  });
}

// Payment methods
export function usePaymentMethods() {
  return useQuery({
    queryKey: subscriptionKeys.paymentMethods(),
    queryFn: () => subscriptionApi.getPaymentMethods(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { type: 'card'; token: string }) =>
      subscriptionApi.addPaymentMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.paymentMethods() });
      toast.success('Payment method added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add payment method');
    },
  });
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionApi.setDefaultPaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.paymentMethods() });
      toast.success('Default payment method updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update payment method');
    },
  });
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionApi.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.paymentMethods() });
      toast.success('Payment method removed');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove payment method');
    },
  });
}

// Billing portal
export function useBillingPortal() {
  return useMutation<{ url: string }, Error>({
    mutationFn: () => subscriptionApi.getBillingPortalUrl(),
    onSuccess: (data) => {
      // In a real app, you'd open the URL in a browser
      // For React Native, use Linking.openURL(data.url)
      toast.info('Redirecting to billing portal...');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to open billing portal');
    },
  });
}
