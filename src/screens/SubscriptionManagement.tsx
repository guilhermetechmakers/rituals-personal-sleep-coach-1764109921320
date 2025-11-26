import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, MainTabParamList } from '@/navigation/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  useSubscription,
  useTransactions,
  useCancelSubscription,
  useBillingPortal,
  usePaymentMethods,
} from '@/hooks/useSubscription';
import { CancellationConfirmationModal } from '@/components/CancellationConfirmationModal';
import { PaymentForm } from '@/components/PaymentForm';
import { toast } from '@/lib/toast';
import type { PaymentMethod, Transaction } from '@/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

export default function SubscriptionManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [cancellationVisible, setCancellationVisible] = useState(false);
  const [paymentFormVisible, setPaymentFormVisible] = useState(false);
  const [transactionsPage, setTransactionsPage] = useState(1);

  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions(transactionsPage);
  const { data: paymentMethods, isLoading: paymentMethodsLoading } = usePaymentMethods();
  const cancelSubscription = useCancelSubscription();
  const billingPortal = useBillingPortal();

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'trialing':
        return 'text-accent';
      case 'past_due':
        return 'text-warning';
      case 'canceled':
        return 'text-error';
      default:
        return 'text-neutral-dark';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'trialing':
        return 'Trial';
      case 'past_due':
        return 'Past Due';
      case 'canceled':
        return 'Canceled';
      default:
        return status;
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription.mutateAsync();
      setCancellationVisible(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleOpenBillingPortal = async () => {
    try {
      const result = await billingPortal.mutateAsync();
      if (result?.url) {
        await Linking.openURL(result.url);
      }
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handlePaymentSubmit = (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    zipCode: string;
  }) => {
    // In a real app, you'd save the payment method via API
    toast.success('Payment method added successfully');
    setPaymentFormVisible(false);
  };

  const getPlanName = (planType: string) => {
    switch (planType) {
      case 'free':
        return 'Free Plan';
      case 'premium_monthly':
        return 'Premium Monthly';
      case 'premium_annual':
        return 'Premium Annual';
      default:
        return planType;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 pt-6">
          <Text className="text-h1 text-neutral-dark font-semibold mb-6">
            Subscription
          </Text>

          {/* Current Subscription */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Current Plan
            </Text>
            {subscriptionLoading ? (
              <Skeleton className="h-32 w-full rounded-lg" />
            ) : subscription ? (
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-neutral-dark mb-1">
                      {getPlanName(subscription.plan)}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text className={`text-small font-medium ${getStatusColor(subscription.status)}`}>
                        {getStatusBadge(subscription.status)}
                      </Text>
                      {subscription.trial_end && new Date(subscription.trial_end) > new Date() && (
                        <Text className="text-small text-neutral-dark opacity-70">
                          • Trial ends {formatDate(subscription.trial_end)}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                {subscription.current_period_end && (
                  <View className="bg-neutral-light p-3 rounded-lg">
                    <Text className="text-small text-neutral-dark opacity-70 mb-1">
                      {subscription.status === 'canceled'
                        ? 'Access until'
                        : 'Next billing date'}
                    </Text>
                    <Text className="text-base font-semibold text-neutral-dark">
                      {formatDate(subscription.current_period_end)}
                    </Text>
                  </View>
                )}

                <View className="flex-row gap-3">
                  {subscription.status === 'active' && (
                    <Button
                      variant="secondary"
                      onPress={() => {
                        const parent = navigation.getParent();
                        if (parent) {
                          (parent as StackNavigationProp<RootStackParamList>).navigate('Pricing');
                        }
                      }}
                      className="flex-1"
                    >
                      Change Plan
                    </Button>
                  )}
                  {subscription.status === 'active' && (
                    <Button
                      variant="minimal"
                      onPress={() => setCancellationVisible(true)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                  {subscription.status === 'canceled' && (
                    <Button
                      variant="primary"
                      onPress={() => {
                        const parent = navigation.getParent();
                        if (parent) {
                          (parent as StackNavigationProp<RootStackParamList>).navigate('Pricing');
                        }
                      }}
                      className="flex-1"
                    >
                      Resubscribe
                    </Button>
                  )}
                </View>
              </View>
            ) : (
              <View className="py-8 items-center">
                <Text className="text-body text-neutral-dark opacity-60 mb-4">
                  No active subscription
                </Text>
                <Button
                  variant="primary"
                  onPress={() => {
                    const parent = navigation.getParent();
                    if (parent) {
                      (parent as StackNavigationProp<RootStackParamList>).navigate('Pricing');
                    }
                  }}
                >
                  View Plans
                </Button>
              </View>
            )}
          </Card>

          {/* Payment Methods */}
          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-h2 text-neutral-dark font-semibold">
                Payment Methods
              </Text>
              <Button
                variant="minimal"
                size="small"
                onPress={() => setPaymentFormVisible(true)}
              >
                Add Card
              </Button>
            </View>
            {paymentMethodsLoading ? (
              <Skeleton className="h-20 w-full rounded-lg" />
            ) : paymentMethods && paymentMethods.length > 0 ? (
              <View className="gap-3">
                {paymentMethods.map((method: PaymentMethod) => (
                  <View
                    key={method.id}
                    className="flex-row items-center justify-between p-3 bg-neutral-light rounded-lg"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 bg-primary/10 rounded-lg items-center justify-center">
                        <Text className="text-lg">💳</Text>
                      </View>
                      <View>
                        <Text className="text-base font-medium text-neutral-dark">
                          {method.card_brand?.toUpperCase() || 'Card'} •••• {method.card_last4}
                        </Text>
                        <Text className="text-small text-neutral-dark opacity-70">
                          Expires {method.card_exp_month}/{method.card_exp_year}
                        </Text>
                      </View>
                    </View>
                    {method.is_default && (
                      <View className="bg-success/10 px-2 py-1 rounded">
                        <Text className="text-small text-success font-medium">Default</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View className="py-4">
                <Text className="text-body text-neutral-dark opacity-60 text-center">
                  No payment methods on file
                </Text>
              </View>
            )}
          </Card>

          {/* Billing History */}
          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-h2 text-neutral-dark font-semibold">
                Billing History
              </Text>
              <Button
                variant="minimal"
                size="small"
                onPress={handleOpenBillingPortal}
                loading={billingPortal.isPending}
              >
                View All
              </Button>
            </View>
            {transactionsLoading ? (
              <View className="gap-3">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </View>
            ) : transactions?.data && transactions.data.length > 0 ? (
              <View className="gap-3">
                {transactions.data.slice(0, 5).map((transaction: Transaction) => (
                  <TouchableOpacity
                    key={transaction.id}
                    className="flex-row items-center justify-between p-3 bg-neutral-light rounded-lg"
                    activeOpacity={0.7}
                  >
                    <View className="flex-1">
                      <Text className="text-base font-medium text-neutral-dark mb-1">
                        {transaction.description}
                      </Text>
                      <Text className="text-small text-neutral-dark opacity-70">
                        {formatDate(transaction.created_at)}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-base font-semibold text-neutral-dark">
                        {formatPrice(transaction.amount)}
                      </Text>
                      <Text
                        className={`text-small font-medium ${
                          transaction.status === 'succeeded'
                            ? 'text-success'
                            : transaction.status === 'failed'
                            ? 'text-error'
                            : 'text-warning'
                        }`}
                      >
                        {transaction.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
                {transactions.count > 5 && (
                  <Button
                    variant="minimal"
                    onPress={handleOpenBillingPortal}
                    className="mt-2"
                  >
                    View {transactions.count - 5} more transactions
                  </Button>
                )}
              </View>
            ) : (
              <View className="py-4">
                <Text className="text-body text-neutral-dark opacity-60 text-center">
                  No transactions yet
                </Text>
              </View>
            )}
          </Card>

          {/* Quick Actions */}
          <Card>
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Quick Actions
            </Text>
            <View className="gap-3">
              <Button
                variant="secondary"
                onPress={handleOpenBillingPortal}
                loading={billingPortal.isPending}
              >
                Open Billing Portal
              </Button>
              <Button
                variant="secondary"
                onPress={() => {
                  const parent = navigation.getParent();
                  if (parent) {
                    (parent as StackNavigationProp<RootStackParamList>).navigate('Pricing');
                  }
                }}
              >
                View All Plans
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Modals */}
      <CancellationConfirmationModal
        visible={cancellationVisible}
        onClose={() => setCancellationVisible(false)}
        onConfirm={handleCancelSubscription}
        subscription={subscription || null}
        loading={cancelSubscription.isPending}
      />

      <PaymentForm
        visible={paymentFormVisible}
        onClose={() => setPaymentFormVisible(false)}
        onSubmit={handlePaymentSubmit}
        loading={false}
      />
    </SafeAreaView>
  );
}
