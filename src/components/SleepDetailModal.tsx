import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { SleepScore } from '@/types';

interface SleepDetailModalProps {
  visible: boolean;
  onClose: () => void;
  sleepScore: SleepScore | null;
}

export function SleepDetailModal({ visible, onClose, sleepScore }: SleepDetailModalProps) {
  if (!sleepScore) return null;

  return (
    <Modal visible={visible} onClose={onClose} title="Sleep Score Details" variant="center">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="items-center">
            <Text className="text-5xl font-bold text-primary mb-2">
              {sleepScore.score}
            </Text>
            <Text className="text-body text-neutral-dark opacity-60">
              Overall Sleep Score
            </Text>
            {sleepScore.delta !== undefined && sleepScore.delta !== 0 && (
              <View className="flex-row items-center gap-1 mt-2">
                <Text
                  className={`text-base font-medium ${
                    sleepScore.delta > 0 ? 'text-success' : 'text-error'
                  }`}
                >
                  {sleepScore.delta > 0 ? '↑' : '↓'} {Math.abs(sleepScore.delta)} from previous day
                </Text>
              </View>
            )}
          </View>

          {sleepScore.factors && (
            <View className="gap-4">
              <Text className="text-h2 text-neutral-dark font-semibold">
                Contributing Factors
              </Text>

              <View className="gap-3">
                <FactorItem label="Sleep Latency" value={sleepScore.factors.latency} />
                <FactorItem label="Sleep Duration" value={sleepScore.factors.duration} />
                <FactorItem label="Sleep Quality" value={sleepScore.factors.quality} />
                <FactorItem label="Consistency" value={sleepScore.factors.consistency} />
              </View>
            </View>
          )}

          <Button variant="primary" onPress={onClose} className="mt-4">
            Close
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
}

function FactorItem({ label, value }: { label: string; value: number }) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-border">
      <Text className="text-body text-neutral-dark">{label}</Text>
      <Text className="text-base font-semibold text-primary">{value}/100</Text>
    </View>
  );
}
