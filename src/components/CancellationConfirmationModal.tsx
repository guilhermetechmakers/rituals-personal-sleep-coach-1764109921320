import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Subscription } from '@/types';

interface CancellationConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscription: Subscription | null;
  loading?: boolean;
}

export function CancellationConfirmationModal({
  visible,
  onClose,
  onConfirm,
  subscription,
  loading,
}: CancellationConfirmationModalProps) {
  if (!subscription) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Cancel Subscription"
      variant="center"
    >
      <View className="gap-4">
        <Text className="text-body text-neutral-dark">
          Are you sure you want to cancel your subscription? You'll continue to have access
          until {subscription.current_period_end ? formatDate(subscription.current_period_end) : 'the end of your billing period'}.
        </Text>

        <View className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
          <Text className="text-base font-semibold text-warning mb-2">
            What happens when you cancel:
          </Text>
          <View className="gap-2">
            <Text className="text-small text-neutral-dark">
              • You'll keep access until {subscription.current_period_end ? formatDate(subscription.current_period_end) : 'the end of your billing period'}
            </Text>
            <Text className="text-small text-neutral-dark">
              • Your subscription will not renew automatically
            </Text>
            <Text className="text-small text-neutral-dark">
              • You can resubscribe anytime to restore full access
            </Text>
          </View>
        </View>

        <View className="bg-neutral-light p-4 rounded-lg">
          <Text className="text-small text-neutral-dark opacity-70">
            Consider downgrading to a free plan instead to keep basic features. You can always
            upgrade again later.
          </Text>
        </View>

        <View className="flex-row gap-3 mt-2">
          <Button variant="secondary" onPress={onClose} className="flex-1" disabled={loading}>
            Keep Subscription
          </Button>
          <Button
            variant="primary"
            onPress={onConfirm}
            className="flex-1"
            loading={loading}
          >
            Cancel Subscription
          </Button>
        </View>
      </View>
    </Modal>
  );
}
