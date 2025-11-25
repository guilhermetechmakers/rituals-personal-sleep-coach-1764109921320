import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-6xl mb-6">🔍</Text>
        <Text className="text-h1 text-neutral-dark font-semibold mb-4 text-center">
          Page Not Found
        </Text>
        <Text className="text-body text-neutral-dark opacity-80 mb-8 text-center">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button variant="primary" onPress={() => {}}>
          Go to Dashboard
        </Button>
      </View>
    </SafeAreaView>
  );
}
