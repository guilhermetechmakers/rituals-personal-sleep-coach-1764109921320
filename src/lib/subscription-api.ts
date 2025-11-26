// Subscription API functions
import { api } from './api';
import type {
  Plan,
  Subscription,
  Transaction,
  PromoCode,
  PaymentMethod,
  SubscriptionCheckout,
  SubscriptionUpdate,
  PaginatedResponse,
} from '@/types';

export const subscriptionApi = {
  // Plans
  getPlans: () => api.get<Plan[]>('/subscriptions/plans'),
  getPlan: (id: string) => api.get<Plan>(`/subscriptions/plans/${id}`),

  // Current subscription
  getSubscription: () => api.get<Subscription>('/subscriptions/current'),
  createSubscription: (data: SubscriptionCheckout) =>
    api.post<Subscription>('/subscriptions', data),
  updateSubscription: (data: SubscriptionUpdate) =>
    api.patch<Subscription>('/subscriptions/current', data),
  cancelSubscription: () =>
    api.post<Subscription>('/subscriptions/current/cancel', {}),

  // Transactions
  getTransactions: (page = 1, limit = 20) =>
    api.get<PaginatedResponse<Transaction>>(
      `/subscriptions/transactions?page=${page}&limit=${limit}`
    ),
  getTransaction: (id: string) =>
    api.get<Transaction>(`/subscriptions/transactions/${id}`),
  downloadReceipt: (id: string) =>
    api.get<{ url: string }>(`/subscriptions/transactions/${id}/receipt`),

  // Promo codes
  validatePromoCode: (code: string) =>
    api.post<PromoCode>('/subscriptions/promo-codes/validate', { code }),
  applyPromoCode: (code: string, subscriptionId: string) =>
    api.post<Subscription>(
      `/subscriptions/${subscriptionId}/promo-code`,
      { code }
    ),

  // Payment methods
  getPaymentMethods: () => api.get<PaymentMethod[]>('/subscriptions/payment-methods'),
  addPaymentMethod: (data: {
    type: 'card';
    token: string; // Stripe payment method token
  }) => api.post<PaymentMethod>('/subscriptions/payment-methods', data),
  setDefaultPaymentMethod: (id: string) =>
    api.patch<PaymentMethod>(`/subscriptions/payment-methods/${id}/default`, {}),
  deletePaymentMethod: (id: string) =>
    api.delete(`/subscriptions/payment-methods/${id}`),

  // Billing portal
  getBillingPortalUrl: () =>
    api.post<{ url: string }>('/subscriptions/billing-portal', {}),
};
