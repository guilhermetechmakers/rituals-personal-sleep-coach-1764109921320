import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function GuidedPlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [minimalMode, setMinimalMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration] = useState(1200); // 20 minutes in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (minimalMode) {
    return (
      <View className="flex-1 bg-neutral-dark">
        <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-white text-2xl font-semibold mb-8 text-center">
              Guided Sleep Session
            </Text>
            
            <TouchableOpacity
              onPress={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 rounded-full bg-primary items-center justify-center mb-8"
            >
              <Text className="text-white text-4xl">
                {isPlaying ? '⏸' : '▶'}
              </Text>
            </TouchableOpacity>

            <Text className="text-white/80 text-lg mb-4">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </Text>

            <View className="w-full h-2 bg-white/20 rounded-full mb-8">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </View>

            <View className="flex-row gap-6">
              <TouchableOpacity
                onPress={() => setMinimalMode(false)}
                className="px-6 py-3 rounded-lg bg-white/10"
              >
                <Text className="text-white">Exit Minimal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="px-6 py-3 rounded-lg bg-white/10"
              >
                <Text className="text-white">Sleep Timer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-2">
            Guided Session
          </Text>
          <Text className="text-body text-neutral-dark opacity-80 mb-6">
            Audio-first playback for relaxation
          </Text>

          {/* Audio Player Controls */}
          <Card className="mb-6">
            <View className="items-center mb-6">
              <TouchableOpacity
                onPress={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-4"
              >
                <Text className="text-white text-3xl">
                  {isPlaying ? '⏸' : '▶'}
                </Text>
              </TouchableOpacity>
              <Text className="text-body text-neutral-dark opacity-60">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </Text>
            </View>

            <View className="w-full h-2 bg-neutral-light rounded-full mb-6">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <TouchableOpacity onPress={() => {}} className="p-3">
                <Text className="text-2xl">⏮</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="p-3">
                <Text className="text-lg text-neutral-dark">Volume</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="p-3">
                <Text className="text-lg text-neutral-dark">Speed</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="p-3">
                <Text className="text-2xl">⏭</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Session Outline */}
          <Card className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Session Outline
            </Text>
            <View className="gap-3">
              <SegmentCard title="Introduction" duration="2:00" />
              <SegmentCard title="Body Scan" duration="8:00" />
              <SegmentCard title="Breathing Exercise" duration="5:00" />
              <SegmentCard title="Visualization" duration="5:00" />
            </View>
          </Card>

          {/* Controls */}
          <View className="gap-3">
            <Button
              variant="primary"
              onPress={() => setMinimalMode(true)}
            >
              Minimal Visual Mode
            </Button>
            <Button variant="secondary" onPress={() => {}}>
              Download for Offline
            </Button>
            <Button variant="minimal" onPress={() => {}}>
              Sleep Timer
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SegmentCard({ title, duration }: { title: string; duration: string }) {
  return (
    <View className="flex-row items-center justify-between p-3 rounded-lg bg-neutral-light">
      <Text className="text-base font-medium text-neutral-dark">{title}</Text>
      <Text className="text-small text-neutral-dark opacity-60">{duration}</Text>
    </View>
  );
}
