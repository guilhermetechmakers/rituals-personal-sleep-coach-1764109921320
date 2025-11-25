import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import type { AuthStackParamList } from '@/navigation/types';
import type { StackNavigationProp } from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<AuthStackParamList>;

export default function LandingScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-6 pt-12 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-4">
            Your Personal Sleep Coach
          </Text>
          <Text className="text-body text-neutral-dark mb-8 opacity-80">
            Generate daily personalized pre-sleep and morning rituals to reduce sleep latency and improve sleep quality.
          </Text>
          <View className="flex-row gap-4">
            <Button
              onPress={() => navigation.navigate('Signup')}
              variant="primary"
              className="flex-1"
            >
              Get Started
            </Button>
            <Button
              onPress={() => navigation.navigate('Login')}
              variant="secondary"
              className="flex-1"
            >
              Sign In
            </Button>
          </View>
        </View>

        {/* Feature Tiles */}
        <View className="px-6 mb-8">
          <Text className="text-h2 text-neutral-dark font-semibold mb-4">
            Features
          </Text>
          <View className="gap-4">
            <FeatureTile
              title="Ritual Builder"
              description="Personalized daily rituals tailored to your sleep patterns"
            />
            <FeatureTile
              title="Morning Optimization"
              description="Start your day right with science-backed morning routines"
            />
            <FeatureTile
              title="Guided Audio Sessions"
              description="Calming audio-first sessions for wind-down and in-bed relaxation"
            />
          </View>
        </View>

        {/* How It Works */}
        <View className="px-6 mb-8">
          <Text className="text-h2 text-neutral-dark font-semibold mb-4">
            How It Works
          </Text>
          <View className="gap-6">
            <StepCard step={1} title="Complete Assessment" description="Tell us about your sleep patterns and preferences" />
            <StepCard step={2} title="Get Your Ritual" description="Receive a personalized daily ritual plan" />
            <StepCard step={3} title="Track Progress" description="Monitor your sleep quality and improve over time" />
          </View>
        </View>

        {/* Pricing Teaser */}
        <View className="px-6 mb-8">
          <Text className="text-h2 text-neutral-dark font-semibold mb-4">
            Start Your Journey
          </Text>
          <Text className="text-body text-neutral-dark mb-6 opacity-80">
            Free to start. Upgrade for unlimited audio, integrations, and advanced analytics.
          </Text>
          <Button
            onPress={() => navigation.navigate('Signup')}
            variant="primary"
          >
            Try Free
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureTile({ title, description }: { title: string; description: string }) {
  return (
    <View className="bg-white rounded-xl p-4 shadow-card">
      <Text className="text-lg font-semibold text-neutral-dark mb-2">{title}</Text>
      <Text className="text-body text-neutral-dark opacity-70">{description}</Text>
    </View>
  );
}

function StepCard({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <View className="flex-row gap-4">
      <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
        <Text className="text-white font-semibold text-lg">{step}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold text-neutral-dark mb-1">{title}</Text>
        <Text className="text-body text-neutral-dark opacity-70">{description}</Text>
      </View>
    </View>
  );
}
