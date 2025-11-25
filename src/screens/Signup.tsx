import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { AuthStackParamList } from '@/navigation/types';
import type { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<AuthStackParamList>;

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().optional(),
  referral_code: z.string().optional(),
  consent: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      consent: false,
    },
  });

  const consent = watch('consent');

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      // TODO: Implement signup API call
      console.log('Signup:', data);
      // Navigate to email verification on success
      navigation.navigate('EmailVerification', { email: data.email });
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerClassName="flex-grow">
          <View className="flex-1 px-6 pt-12 pb-8 justify-center">
            <Text className="text-h1 text-neutral-dark font-semibold mb-2">
              Create Account
            </Text>
            <Text className="text-body text-neutral-dark mb-8 opacity-80">
              Start your personalized sleep journey
            </Text>

            <Controller
              control={control}
              name="full_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name (Optional)"
                  placeholder="John Doe"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  error={errors.full_name?.message}
                />
              )}
            />

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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="At least 8 characters"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="referral_code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Referral Code (Optional)"
                  placeholder="Enter referral code"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.referral_code?.message}
                />
              )}
            />

            <View className="mb-6">
              <TouchableOpacity
                onPress={() => control._formValues.consent = !consent}
                className="flex-row items-start gap-3"
              >
                <View className={`w-5 h-5 rounded border-2 items-center justify-center mt-0.5 ${
                  consent ? 'bg-primary border-primary' : 'border-input'
                }`}>
                  {consent && <Text className="text-white text-xs">✓</Text>}
                </View>
                <Text className="text-body text-neutral-dark flex-1">
                  I agree to the{' '}
                  <Text className="text-accent">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-accent">Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
              {errors.consent && (
                <Text className="text-error text-sm mt-1">{errors.consent.message}</Text>
              )}
            </View>

            <Button
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              loading={loading}
              className="mb-4"
            >
              Create Account
            </Button>

            <View className="flex-row items-center justify-center gap-2 mb-6">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-small text-neutral-dark opacity-60">OR</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            <View className="gap-3 mb-6">
              <Button variant="secondary" onPress={() => {}}>
                Continue with Google
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Continue with Apple
              </Button>
            </View>

            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-body text-neutral-dark opacity-70">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-accent font-medium">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
