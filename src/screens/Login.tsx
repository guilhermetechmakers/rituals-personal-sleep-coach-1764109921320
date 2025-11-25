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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      // TODO: Implement login API call
      console.log('Login:', data);
      // Navigate to dashboard on success
    } catch (error) {
      console.error('Login error:', error);
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
              Welcome Back
            </Text>
            <Text className="text-body text-neutral-dark mb-8 opacity-80">
              Sign in to continue your sleep journey
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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={errors.password?.message}
                />
              )}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('PasswordReset')}
              className="self-end mb-6"
            >
              <Text className="text-accent text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              loading={loading}
              className="mb-4"
            >
              Sign In
            </Button>

            <View className="flex-row items-center justify-center gap-2 mb-6">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-small text-neutral-dark opacity-60">OR</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social OAuth buttons would go here */}
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
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-accent font-medium">Sign Up</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {}}
              className="mt-6 items-center"
            >
              <Text className="text-accent text-sm font-medium">
                Try as Guest
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
