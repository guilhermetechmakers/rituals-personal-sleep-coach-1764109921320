import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { RitualStep } from '@/types';

interface RitualStartModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  step: RitualStep | null;
  loading?: boolean;
}

export function RitualStartModal({
  visible,
  onClose,
  onConfirm,
  step,
  loading,
}: RitualStartModalProps) {
  return (
    <Modal visible={visible} onClose={onClose} title="Start Ritual" variant="center">
      <View className="gap-4">
        {step && (
          <>
            <Text className="text-body text-neutral-dark">
              Are you ready to start <Text className="font-semibold">{step.title}</Text>?
            </Text>
            {step.description && (
              <Text className="text-small text-neutral-dark opacity-70">
                {step.description}
              </Text>
            )}
            {step.duration && (
              <Text className="text-small text-neutral-dark opacity-60">
                Duration: {step.duration} minutes
              </Text>
            )}
          </>
        )}

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
            Start
          </Button>
        </View>
      </View>
    </Modal>
  );
}
