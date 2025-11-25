import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '@/navigation/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTodayRitual } from '@/hooks/useRituals';
import { useSleepScore, useLogSleep } from '@/hooks/useSleep';
import { useTodayHabits, useToggleHabit } from '@/hooks/useHabits';
import { useWeeklyTrends } from '@/hooks/useTrends';
import { RitualStartModal } from '@/components/RitualStartModal';
import { SleepDetailModal } from '@/components/SleepDetailModal';
import { LogSleepForm } from '@/components/LogSleepForm';
import { AdjustScheduleForm } from '@/components/AdjustScheduleForm';
import { WeeklyTrendsChart } from '@/components/WeeklyTrendsChart';
import type { RitualStep } from '@/types';
import { toast } from '@/lib/toast';

type NavigationProp = BottomTabNavigationProp<MainTabParamList>;

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [ritualModalVisible, setRitualModalVisible] = useState(false);
  const [selectedStep, setSelectedStep] = useState<RitualStep | null>(null);
  const [sleepDetailVisible, setSleepDetailVisible] = useState(false);
  const [logSleepVisible, setLogSleepVisible] = useState(false);
  const [adjustScheduleVisible, setAdjustScheduleVisible] = useState(false);

  // Data fetching
  const { data: todayRitual, isLoading: ritualLoading, refetch: refetchRitual } = useTodayRitual();
  const { data: sleepScore, isLoading: scoreLoading, refetch: refetchScore } = useSleepScore();
  const { data: habits, isLoading: habitsLoading, refetch: refetchHabits } = useTodayHabits();
  const { data: weeklyTrends, isLoading: trendsLoading, refetch: refetchTrends } = useWeeklyTrends();
  
  // Mutations
  const logSleepMutation = useLogSleep();
  const toggleHabitMutation = useToggleHabit();

  const isLoading = ritualLoading || scoreLoading || habitsLoading || trendsLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchRitual(),
      refetchScore(),
      refetchHabits(),
      refetchTrends(),
    ]);
    setRefreshing(false);
  };

  const handleStartRitual = (step: RitualStep, type: 'wind-down' | 'in-bed' | 'morning') => {
    setSelectedStep(step);
    setRitualModalVisible(true);
  };

  const handleConfirmRitual = () => {
    if (selectedStep) {
      if (selectedStep.type === 'in-bed') {
        // Navigate to guided player
        navigation.navigate('Player', { sessionId: selectedStep.audio_url });
      } else {
        // Navigate to ritual builder or start wind-down flow
        navigation.navigate('Rituals');
      }
      setRitualModalVisible(false);
      setSelectedStep(null);
    }
  };

  const handleToggleHabit = async (habitId: string, completed: boolean) => {
    try {
      await toggleHabitMutation.mutateAsync({ id: habitId, completed: !completed });
      toast.success(completed ? 'Habit marked as incomplete' : 'Habit completed!');
    } catch (error) {
      toast.error('Failed to update habit');
    }
  };

  const handleLogSleep = async (data: {
    time_in_bed: number;
    sleep_latency: number;
    total_sleep_time: number;
    awakenings: number;
    sleep_quality: number;
  }) => {
    try {
      await logSleepMutation.mutateAsync({
        date: new Date().toISOString().split('T')[0],
        ...data,
      });
      toast.success('Sleep logged successfully');
      setLogSleepVisible(false);
      refetchScore();
    } catch (error) {
      toast.error('Failed to log sleep');
    }
  };

  const handleAdjustSchedule = async (data: { bedtime: string; wake_time: string }) => {
    // TODO: Implement schedule adjustment API call
    toast.success('Schedule updated successfully');
    setAdjustScheduleVisible(false);
  };

  const handleConnectWearable = () => {
    navigation.navigate('Profile');
  };

  const handleViewFullReport = () => {
    // TODO: Navigate to detailed report screen
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2C3E8A" />
        }
      >
        <View className="px-4 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-6">
            Good Morning
          </Text>

          {/* Today's Ritual Card */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Today's Ritual
            </Text>
            {ritualLoading ? (
              <View className="gap-4">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </View>
            ) : todayRitual && todayRitual.steps.length > 0 ? (
              <>
                <View className="mb-4">
                  {todayRitual.steps
                    .filter((step) => step.type === 'wind-down' || step.type === 'in-bed')
                    .map((step) => (
                      <RitualStep
                        key={step.id}
                        step={step}
                        onStart={() => handleStartRitual(step, step.type)}
                      />
                    ))}
                </View>
                <View className="flex-row gap-3">
                  {todayRitual.steps.find((s) => s.type === 'wind-down') && (
                    <Button
                      variant="primary"
                      className="flex-1"
                      onPress={() => {
                        const windDownStep = todayRitual.steps.find((s) => s.type === 'wind-down');
                        if (windDownStep) handleStartRitual(windDownStep, 'wind-down');
                      }}
                    >
                      Start Wind-down
                    </Button>
                  )}
                  {todayRitual.steps.find((s) => s.type === 'in-bed') && (
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onPress={() => {
                        const inBedStep = todayRitual.steps.find((s) => s.type === 'in-bed');
                        if (inBedStep) handleStartRitual(inBedStep, 'in-bed');
                      }}
                    >
                      Play Audio
                    </Button>
                  )}
                </View>
              </>
            ) : (
              <View className="py-8 items-center">
                <Text className="text-body text-neutral-dark opacity-60 mb-4">
                  No ritual scheduled for today
                </Text>
                <Button
                  variant="primary"
                  onPress={() => navigation.navigate('Rituals')}
                >
                  Create Ritual
                </Button>
              </View>
            )}
          </Card>

          {/* Sleep Score Tile */}
          <Card className="mb-6" onPress={() => setSleepDetailVisible(true)}>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-lg font-semibold text-neutral-dark">
                Sleep Score
              </Text>
              {sleepScore?.delta !== undefined && sleepScore.delta !== 0 && (
                <View className="flex-row items-center gap-1">
                  <Text
                    className={`text-sm font-medium ${
                      sleepScore.delta > 0 ? 'text-success' : 'text-error'
                    }`}
                  >
                    {sleepScore.delta > 0 ? '↑' : '↓'} {Math.abs(sleepScore.delta)}
                  </Text>
                </View>
              )}
            </View>
            {scoreLoading ? (
              <Skeleton className="h-12 w-24 rounded-lg" />
            ) : (
              <>
                <Text className="text-4xl font-bold text-primary mb-2">
                  {sleepScore?.score ?? '--'}
                </Text>
                <Text className="text-small text-neutral-dark opacity-60">
                  Last night
                </Text>
              </>
            )}
          </Card>

          {/* Habits & Streaks */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Habits & Streaks
            </Text>
            {habitsLoading ? (
              <View className="gap-3">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </View>
            ) : habits && habits.length > 0 ? (
              <View className="gap-3">
                {habits.map((habit) => (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    onToggle={() => handleToggleHabit(habit.id, habit.completed_today)}
                    loading={toggleHabitMutation.isPending}
                  />
                ))}
              </View>
            ) : (
              <View className="py-8 items-center">
                <Text className="text-body text-neutral-dark opacity-60">
                  No habits tracked yet
                </Text>
              </View>
            )}
          </Card>

          {/* Weekly Trends Chart */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Weekly Trends
            </Text>
            <WeeklyTrendsChart
              data={weeklyTrends}
              isLoading={trendsLoading}
              metric="latency"
            />
          </Card>

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Quick Actions
            </Text>
            <View className="gap-3">
              <Button variant="secondary" onPress={() => setLogSleepVisible(true)}>
                Log Sleep
              </Button>
              <Button
                variant="secondary"
                onPress={() => setAdjustScheduleVisible(true)}
              >
                Adjust Schedule
              </Button>
              <Button variant="secondary" onPress={handleConnectWearable}>
                Connect Wearable
              </Button>
              <Button variant="minimal" onPress={handleViewFullReport}>
                View Full Report
              </Button>
            </View>
          </View>

          {/* Notification Summary */}
          <Card>
            <Text className="text-body text-neutral-dark mb-2">
              Next reminder: Wind-down in 2 hours
            </Text>
            <Button
              variant="minimal"
              onPress={() => navigation.navigate('Profile')}
              className="self-start"
            >
              Manage Notifications
            </Button>
          </Card>
        </View>
      </ScrollView>

      {/* Modals */}
      <RitualStartModal
        visible={ritualModalVisible}
        onClose={() => {
          setRitualModalVisible(false);
          setSelectedStep(null);
        }}
        onConfirm={handleConfirmRitual}
        step={selectedStep}
      />

      <SleepDetailModal
        visible={sleepDetailVisible}
        onClose={() => setSleepDetailVisible(false)}
        sleepScore={sleepScore || null}
      />

      <LogSleepForm
        visible={logSleepVisible}
        onClose={() => setLogSleepVisible(false)}
        onSubmit={handleLogSleep}
        loading={logSleepMutation.isPending}
      />

      <AdjustScheduleForm
        visible={adjustScheduleVisible}
        onClose={() => setAdjustScheduleVisible(false)}
        onSubmit={handleAdjustSchedule}
        loading={false}
      />
    </SafeAreaView>
  );
}

function RitualStep({
  step,
  onStart,
}: {
  step: RitualStep;
  onStart: () => void;
}) {
  return (
    <View className="flex-row gap-4 mb-4">
      <Text className="text-small text-neutral-dark opacity-60 w-16">
        {step.start_time || '--:--'}
      </Text>
      <View className="flex-1">
        <Text className="text-base font-semibold text-neutral-dark mb-1">
          {step.title}
        </Text>
        <Text className="text-small text-neutral-dark opacity-70">
          {step.description}
        </Text>
        {step.duration && (
          <Text className="text-small text-neutral-dark opacity-60 mt-1">
            {step.duration} min
          </Text>
        )}
      </View>
    </View>
  );
}

function HabitItem({
  habit,
  onToggle,
  loading,
}: {
  habit: { name: string; current_streak: number; completed_today: boolean };
  onToggle: () => void;
  loading: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-border last:border-0">
      <View className="flex-1">
        <Text className="text-base font-medium text-neutral-dark mb-1">
          {habit.name}
        </Text>
        <Text className="text-small text-neutral-dark opacity-60">
          {habit.current_streak} day streak
        </Text>
      </View>
      <TouchableOpacity
        onPress={onToggle}
        disabled={loading}
        className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
          habit.completed_today
            ? 'bg-success border-success'
            : 'border-input'
        }`}
        activeOpacity={0.7}
      >
        {habit.completed_today && <Text className="text-white text-xs">✓</Text>}
      </TouchableOpacity>
    </View>
  );
}
