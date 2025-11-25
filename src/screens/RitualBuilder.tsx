import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { RitualStep } from '@/types';

export default function RitualBuilderScreen() {
  // Mock ritual data
  const [ritual, setRitual] = useState<RitualStep[]>([
    { id: '1', type: 'wind-down', title: 'Wind Down', description: 'Begin relaxation routine', duration: 30, order: 1, start_time: '20:00' },
    { id: '2', type: 'in-bed', title: 'In-Bed Audio', description: 'Guided sleep session', duration: 20, order: 2, start_time: '20:30' },
  ]);

  const totalDuration = ritual.reduce((sum, step) => sum + step.duration, 0);

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-2">
            Ritual Builder
          </Text>
          <Text className="text-body text-neutral-dark opacity-80 mb-6">
            Your personalized daily ritual plan
          </Text>

          {/* Ritual Timeline */}
          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-h2 text-neutral-dark font-semibold">
                Today's Ritual
              </Text>
              <Text className="text-small text-neutral-dark opacity-60">
                {totalDuration} min total
              </Text>
            </View>

            {ritual.map((step, index) => (
              <RitualStepCard
                key={step.id}
                step={step}
                index={index}
                onEdit={() => {}}
                onReorder={() => {}}
              />
            ))}
          </Card>

          {/* Edit Controls */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Customize
            </Text>
            <View className="gap-3">
              <Button variant="secondary" onPress={() => {}}>
                Reorder Steps
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Adjust Duration
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Replace Step
              </Button>
            </View>
          </Card>

          {/* Ritual Variants */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Variants
            </Text>
            <View className="gap-3">
              <VariantButton title="Short" description="15-20 min" onPress={() => {}} />
              <VariantButton title="Travel" description="Adapted for travel" onPress={() => {}} />
              <VariantButton title="Shift Work" description="For night shifts" onPress={() => {}} />
            </View>
          </Card>

          {/* Save & Schedule */}
          <View className="gap-3">
            <Button variant="primary" onPress={() => {}}>
              Save & Schedule
            </Button>
            <Button variant="minimal" onPress={() => {}}>
              Export (PDF)
            </Button>
            <Button variant="minimal" onPress={() => {}}>
              Add to Calendar
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RitualStepCard({
  step,
  index,
  onEdit,
  onReorder,
}: {
  step: RitualStep;
  index: number;
  onEdit: () => void;
  onReorder: () => void;
}) {
  return (
    <View className="flex-row gap-4 mb-4 pb-4 border-b border-border last:border-0">
      <View className="w-12 items-center">
        <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
          <Text className="text-primary font-semibold text-sm">{index + 1}</Text>
        </View>
        {index < 2 && <View className="w-0.5 h-8 bg-border mt-1" />}
      </View>
      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <View className="flex-1">
            <Text className="text-base font-semibold text-neutral-dark mb-1">
              {step.title}
            </Text>
            <Text className="text-small text-neutral-dark opacity-70 mb-2">
              {step.description}
            </Text>
            {step.start_time && (
              <Text className="text-small text-primary font-medium">
                {step.start_time} • {step.duration} min
              </Text>
            )}
          </View>
        </View>
        <View className="flex-row gap-2 mt-2">
          <TouchableOpacity onPress={onEdit} className="px-3 py-1.5 rounded-md bg-neutral-light">
            <Text className="text-small text-neutral-dark">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onReorder} className="px-3 py-1.5 rounded-md bg-neutral-light">
            <Text className="text-small text-neutral-dark">Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function VariantButton({ title, description, onPress }: { title: string; description: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-4 rounded-lg border border-input bg-white"
    >
      <Text className="text-base font-semibold text-neutral-dark mb-1">{title}</Text>
      <Text className="text-small text-neutral-dark opacity-70">{description}</Text>
    </TouchableOpacity>
  );
}
