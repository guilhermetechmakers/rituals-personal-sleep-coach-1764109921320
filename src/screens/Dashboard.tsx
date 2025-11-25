import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardScreen() {
  // Mock data - replace with actual data fetching
  const sleepScore = { score: 85, delta: 5 };
  const habits = [
    { id: '1', name: 'Ritual Completion', streak: 7, completed: true },
    { id: '2', name: 'Journal Entry', streak: 5, completed: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-6">
            Good Morning
          </Text>

          {/* Today's Ritual Card */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Today's Ritual
            </Text>
            <View className="mb-4">
              <RitualStep time="8:00 PM" title="Wind Down" description="Begin relaxation routine" />
              <RitualStep time="9:00 PM" title="In-Bed Audio" description="Guided sleep session" />
            </View>
            <View className="flex-row gap-3">
              <Button variant="primary" className="flex-1" onPress={() => {}}>
                Start Wind-down
              </Button>
              <Button variant="secondary" className="flex-1" onPress={() => {}}>
                Play Audio
              </Button>
            </View>
          </Card>

          {/* Sleep Score Tile */}
          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold text-neutral-dark">
                Sleep Score
              </Text>
              {sleepScore.delta && (
                <View className="flex-row items-center gap-1">
                  <Text className={`text-sm font-medium ${
                    sleepScore.delta > 0 ? 'text-success' : 'text-error'
                  }`}>
                    {sleepScore.delta > 0 ? '↑' : '↓'} {Math.abs(sleepScore.delta)}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-4xl font-bold text-primary mb-2">
              {sleepScore.score}
            </Text>
            <Text className="text-small text-neutral-dark opacity-60">
              Last night
            </Text>
          </Card>

          {/* Habits & Streaks */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Habits & Streaks
            </Text>
            <View className="gap-3">
              {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </View>
          </Card>

          {/* Weekly Trends Chart */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Weekly Trends
            </Text>
            <View className="h-48 items-center justify-center bg-neutral-light rounded-lg">
              <Text className="text-body text-neutral-dark opacity-60">
                Chart placeholder - implement with victory-native
              </Text>
            </View>
          </Card>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Quick Actions
            </Text>
            <View className="gap-3">
              <Button variant="secondary" onPress={() => {}}>
                Log Sleep
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Adjust Schedule
              </Button>
              <Button variant="secondary" onPress={() => {}}>
                Connect Wearable
              </Button>
              <Button variant="minimal" onPress={() => {}}>
                View Full Report
              </Button>
            </View>
          </View>

          {/* Notification Summary */}
          <Card>
            <Text className="text-body text-neutral-dark mb-2">
              Next reminder: Wind-down in 2 hours
            </Text>
            <Button variant="minimal" onPress={() => {}} className="self-start">
              Manage Notifications
            </Button>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RitualStep({ time, title, description }: { time: string; title: string; description: string }) {
  return (
    <View className="flex-row gap-4 mb-4">
      <Text className="text-small text-neutral-dark opacity-60 w-16">
        {time}
      </Text>
      <View className="flex-1">
        <Text className="text-base font-semibold text-neutral-dark mb-1">
          {title}
        </Text>
        <Text className="text-small text-neutral-dark opacity-70">
          {description}
        </Text>
      </View>
    </View>
  );
}

function HabitItem({ habit }: { habit: { name: string; streak: number; completed: boolean } }) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-border last:border-0">
      <View className="flex-1">
        <Text className="text-base font-medium text-neutral-dark mb-1">
          {habit.name}
        </Text>
        <Text className="text-small text-neutral-dark opacity-60">
          {habit.streak} day streak
        </Text>
      </View>
      <TouchableOpacity
        className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
          habit.completed
            ? 'bg-success border-success'
            : 'border-input'
        }`}
      >
        {habit.completed && <Text className="text-white text-xs">✓</Text>}
      </TouchableOpacity>
    </View>
  );
}
