import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const logSleepSchema = z.object({
  time_in_bed: z.string().min(1, 'Required'),
  sleep_latency: z.string().min(1, 'Required'),
  total_sleep_time: z.string().min(1, 'Required'),
  awakenings: z.string().optional(),
  sleep_quality: z.string().min(1, 'Required'),
});

type LogSleepFormData = z.infer<typeof logSleepSchema>;

interface LogSleepFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    time_in_bed: number;
    sleep_latency: number;
    total_sleep_time: number;
    awakenings: number;
    sleep_quality: number;
  }) => void;
  loading?: boolean;
}

export function LogSleepForm({ visible, onClose, onSubmit, loading }: LogSleepFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LogSleepFormData>({
    resolver: zodResolver(logSleepSchema),
    defaultValues: {
      time_in_bed: '',
      sleep_latency: '',
      total_sleep_time: '',
      awakenings: '0',
      sleep_quality: '',
    },
  });

  const handleFormSubmit = (data: LogSleepFormData) => {
    onSubmit({
      time_in_bed: parseInt(data.time_in_bed, 10),
      sleep_latency: parseInt(data.sleep_latency, 10),
      total_sleep_time: parseInt(data.total_sleep_time, 10),
      awakenings: parseInt(data.awakenings || '0', 10),
      sleep_quality: parseInt(data.sleep_quality, 10),
    });
    reset();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Log Sleep" variant="bottom-sheet">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Time in Bed (minutes)
            </Text>
            <Controller
              control={control}
              name="time_in_bed"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 480"
                  keyboardType="numeric"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.time_in_bed && (
              <Text className="text-sm text-error mt-1">{errors.time_in_bed.message}</Text>
            )}
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Sleep Latency (minutes)
            </Text>
            <Controller
              control={control}
              name="sleep_latency"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 15"
                  keyboardType="numeric"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.sleep_latency && (
              <Text className="text-sm text-error mt-1">{errors.sleep_latency.message}</Text>
            )}
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Total Sleep Time (minutes)
            </Text>
            <Controller
              control={control}
              name="total_sleep_time"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 420"
                  keyboardType="numeric"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.total_sleep_time && (
              <Text className="text-sm text-error mt-1">{errors.total_sleep_time.message}</Text>
            )}
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Awakenings (optional)
            </Text>
            <Controller
              control={control}
              name="awakenings"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 2"
                  keyboardType="numeric"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Sleep Quality (1-10)
            </Text>
            <Controller
              control={control}
              name="sleep_quality"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., 7"
                  keyboardType="numeric"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.sleep_quality && (
              <Text className="text-sm text-error mt-1">{errors.sleep_quality.message}</Text>
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
