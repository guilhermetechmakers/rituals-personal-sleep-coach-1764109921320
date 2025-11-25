import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const scheduleSchema = z.object({
  bedtime: z.string().min(1, 'Required'),
  wake_time: z.string().min(1, 'Required'),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface AdjustScheduleFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { bedtime: string; wake_time: string }) => void;
  loading?: boolean;
  currentBedtime?: string;
  currentWakeTime?: string;
}

export function AdjustScheduleForm({
  visible,
  onClose,
  onSubmit,
  loading,
  currentBedtime,
  currentWakeTime,
}: AdjustScheduleFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      bedtime: currentBedtime || '',
      wake_time: currentWakeTime || '',
    },
  });

  const handleFormSubmit = (data: ScheduleFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Adjust Schedule" variant="bottom-sheet">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Bedtime (HH:mm)
            </Text>
            <Controller
              control={control}
              name="bedtime"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 22:00"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.bedtime && (
              <Text className="text-sm text-error mt-1">{errors.bedtime.message}</Text>
            )}
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Wake Time (HH:mm)
            </Text>
            <Controller
              control={control}
              name="wake_time"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 07:00"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.wake_time && (
              <Text className="text-sm text-error mt-1">{errors.wake_time.message}</Text>
            )}
          </View>

          <View className="flex-row gap-3 mt-4">
            <Button variant="secondary" onPress={onClose} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={handleSubmit(handleFormSubmit)}
              className="flex-1"
              loading={loading}
            >
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
