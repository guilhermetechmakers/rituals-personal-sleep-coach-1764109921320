import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetForm = z.infer<typeof resetSchema>;

export default function PasswordResetScreen() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetForm) => {
    setLoading(true);
    try {
      // TODO: Implement password reset API call
      console.log('Password reset:', data);
      setSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-light">
        <View className="flex-1 px-6 pt-12 justify-center">
          <View className="bg-success/10 rounded-full w-16 h-16 items-center justify-center mb-6 self-center">
            <Text className="text-success text-3xl">✓</Text>
          </View>
          <Text className="text-h2 text-neutral-dark font-semibold mb-4 text-center">
            Check Your Email
          </Text>
          <Text className="text-body text-neutral-dark opacity-80 text-center mb-8">
            We've sent password reset instructions to your email address.
          </Text>
          <Button
            onPress={() => {}}
            variant="primary"
          >
            Back to Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerClassName="flex-grow">
          <View className="flex-1 px-6 pt-12 pb-8 justify-center">
            <Text className="text-h1 text-neutral-dark font-semibold mb-2">
              Reset Password
            </Text>
            <Text className="text-body text-neutral-dark mb-8 opacity-80">
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              loading={loading}
              className="mb-4"
            >
              Send Reset Link
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
