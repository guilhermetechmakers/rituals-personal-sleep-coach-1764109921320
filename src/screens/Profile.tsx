import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    timezone: 'America/New_York',
    sleep_window: '22:00 - 07:00',
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-6">
            Profile
          </Text>

          {/* Profile Summary */}
          <Card className="mb-6">
            <View className="items-center mb-4">
              <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-3">
                <Text className="text-primary text-3xl font-semibold">
                  {user.name.charAt(0)}
                </Text>
              </View>
              <Text className="text-h2 text-neutral-dark font-semibold mb-1">
                {user.name}
              </Text>
              <Text className="text-body text-neutral-dark opacity-70">
                {user.email}
              </Text>
            </View>
            <View className="border-t border-border pt-4 gap-3">
              <ProfileRow label="Timezone" value={user.timezone} />
              <ProfileRow label="Sleep Window" value={user.sleep_window} />
            </View>
          </Card>

          {/* Connected Accounts */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Connected Accounts
            </Text>
            <View className="gap-3">
              <IntegrationItem name="Apple Health" connected={false} />
              <IntegrationItem name="Google Fit" connected={true} />
              <IntegrationItem name="Oura Ring" connected={false} />
            </View>
          </Card>

          {/* Account Actions */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Account
            </Text>
            <View className="gap-3">
              <Button variant="secondary" onPress={() => {}}>
                Export Data
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Change Password
              </Button>
              <Button variant="minimal" onPress={() => {}}>
                Delete Account
              </Button>
            </View>
          </Card>

          {/* Subscription Summary */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Subscription
            </Text>
            <View className="mb-4">
              <Text className="text-base font-medium text-neutral-dark mb-1">
                Free Plan
              </Text>
              <Text className="text-small text-neutral-dark opacity-70">
                Upgrade for unlimited audio and integrations
              </Text>
            </View>
            <Button variant="primary" onPress={() => {}}>
              View Plans
            </Button>
          </Card>

          {/* Settings Link */}
          <Button variant="secondary" onPress={() => {}}>
            Settings & Preferences
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-body text-neutral-dark opacity-70">{label}</Text>
      <Text className="text-body text-neutral-dark font-medium">{value}</Text>
    </View>
  );
}

function IntegrationItem({ name, connected }: { name: string; connected: boolean }) {
  return (
    <View className="flex-row items-center justify-between p-3 rounded-lg bg-neutral-light">
      <Text className="text-base font-medium text-neutral-dark">{name}</Text>
      <TouchableOpacity
        className={`px-4 py-2 rounded-md ${
          connected ? 'bg-success/20' : 'bg-primary/20'
        }`}
      >
        <Text className={`text-sm font-medium ${
          connected ? 'text-success' : 'text-primary'
        }`}>
          {connected ? 'Connected' : 'Connect'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
