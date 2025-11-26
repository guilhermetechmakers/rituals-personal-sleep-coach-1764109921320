import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Plan, PromoCode } from '@/types';

interface SubscriptionConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: Plan | null;
  promoCode?: PromoCode | null;
  loading?: boolean;
}

export function SubscriptionConfirmationModal({
  visible,
  onClose,
  onConfirm,
  plan,
  promoCode,
  loading,
}: SubscriptionConfirmationModalProps) {
  if (!plan) return null;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const calculateDiscount = () => {
    if (!promoCode) return 0;
    if (promoCode.discount_type === 'percentage') {
      return (plan.price * promoCode.discount_value) / 100;
    }
    return promoCode.discount_value;
  };

  const calculateFinalPrice = () => {
    const discount = calculateDiscount();
    return Math.max(0, plan.price - discount);
  };

  const discount = calculateDiscount();
  const finalPrice = calculateFinalPrice();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Confirm Subscription"
      variant="center"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View>
            <Text className="text-h2 text-neutral-dark font-semibold mb-2">
              {plan.name}
            </Text>
            <Text className="text-body text-neutral-dark opacity-70">
              {plan.interval === 'month' ? 'Monthly' : 'Annual'} billing
            </Text>
          </View>

          <View className="bg-neutral-light p-4 rounded-lg">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-body text-neutral-dark">Plan Price</Text>
              <Text className="text-body text-neutral-dark font-semibold">
                {formatPrice(plan.price)}/{plan.interval === 'month' ? 'mo' : 'yr'}
              </Text>
            </View>
            {promoCode && discount > 0 && (
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-body text-success">Discount</Text>
                <Text className="text-body text-success font-semibold">
                  -{formatPrice(discount)}
                </Text>
              </View>
            )}
            <View className="border-t border-border pt-2 mt-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-h2 text-neutral-dark font-semibold">Total</Text>
                <Text className="text-h2 text-primary font-semibold">
                  {formatPrice(finalPrice)}/{plan.interval === 'month' ? 'mo' : 'yr'}
                </Text>
              </View>
            </View>
          </View>

          {plan.trial_period_days && (
            <View className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
              <Text className="text-small text-neutral-dark">
                <Text className="font-semibold">{plan.trial_period_days}-day free trial</Text> starts
                immediately. You'll be charged after the trial period ends.
              </Text>
            </View>
          )}

          <View>
            <Text className="text-base font-semibold text-neutral-dark mb-2">
              What's included:
            </Text>
            {plan.features.map((feature, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-success mr-2">✓</Text>
                <Text className="text-body text-neutral-dark flex-1">{feature}</Text>
              </View>
            ))}
          </View>

          <View className="bg-neutral-light p-4 rounded-lg">
            <Text className="text-small text-neutral-dark opacity-70">
              By confirming, you agree to our Terms of Service and Privacy Policy. Your
              subscription will automatically renew unless canceled.
            </Text>
          </View>

          <View className="flex-row gap-3 mt-4">
            <Button variant="secondary" onPress={onClose} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={onConfirm}
              className="flex-1"
              loading={loading}
            >
              Confirm & Subscribe
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
