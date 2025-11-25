import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from '@/components/ui/Button';
import type { AuthStackParamList } from '@/navigation/types';

type EmailVerificationRouteProp = RouteProp<AuthStackParamList, 'EmailVerification'>;

export default function EmailVerificationScreen() {
  const route = useRoute<EmailVerificationRouteProp>();
  const { email } = route.params;
  const [cooldown, setCooldown] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    setCooldown(60);
    // TODO: Implement resend verification email
  };

  if (verified) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-light">
        <View className="flex-1 px-6 pt-12 justify-center">
          <View className="bg-success/10 rounded-full w-16 h-16 items-center justify-center mb-6 self-center">
            <Text className="text-success text-3xl">✓</Text>
          </View>
          <Text className="text-h2 text-neutral-dark font-semibold mb-4 text-center">
            Email Verified
          </Text>
          <Text className="text-body text-neutral-dark opacity-80 text-center mb-8">
            Your email has been successfully verified.
          </Text>
          <Button
            onPress={() => {}}
            variant="primary"
          >
            Continue
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <View className="flex-1 px-6 pt-12 justify-center">
        <Text className="text-h1 text-neutral-dark font-semibold mb-2">
          Verify Your Email
        </Text>
        <Text className="text-body text-neutral-dark mb-8 opacity-80">
          We've sent a verification link to{'\n'}
          <Text className="font-semibold">{email}</Text>
        </Text>

        <View className="bg-white rounded-xl p-6 mb-6 shadow-card">
          <Text className="text-body text-neutral-dark mb-4">
            Please check your email and click the verification link to activate your account.
          </Text>
          <Text className="text-small text-neutral-dark opacity-60">
            Didn't receive the email? Check your spam folder or try resending.
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleResend}
          disabled={cooldown > 0}
          className={`mb-6 ${cooldown > 0 ? 'opacity-50' : ''}`}
        >
          <Text className="text-accent text-center font-medium">
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Verification Email'}
          </Text>
        </TouchableOpacity>

        <Button
          onPress={() => setVerified(true)}
          variant="primary"
        >
          I've Verified My Email
        </Button>
      </View>
    </SafeAreaView>
  );
}
