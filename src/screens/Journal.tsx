import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import type { JournalEntry } from '@/types';

// Local type for display purposes (without required database fields)
type JournalEntryDisplay = Pick<JournalEntry, 'id' | 'date' | 'type' | 'content'>;

export default function JournalScreen() {
  const [entries, setEntries] = useState<JournalEntryDisplay[]>([
    { id: '1', date: new Date().toISOString(), type: 'pre-sleep', content: 'Feeling calm and ready for sleep...' },
    { id: '2', date: new Date(Date.now() - 86400000).toISOString(), type: 'morning', content: 'Slept well, feeling refreshed' },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-8">
          <Text className="text-h1 text-neutral-dark font-semibold mb-2">
            Sleep Journal
          </Text>
          <Text className="text-body text-neutral-dark opacity-80 mb-6">
            Track your thoughts and sleep patterns
          </Text>

          {/* Quick Actions */}
          <View className="flex-row gap-3 mb-6">
            <Button variant="primary" className="flex-1" onPress={() => {}}>
              Pre-Sleep Entry
            </Button>
            <Button variant="secondary" className="flex-1" onPress={() => {}}>
              Morning Entry
            </Button>
          </View>

          {/* Entry History */}
          <View className="mb-6">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Recent Entries
            </Text>
            {entries.map(entry => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </View>

          {/* Empty State */}
          {entries.length === 0 && (
            <Card className="items-center py-12">
              <Text className="text-4xl mb-4">📔</Text>
              <Text className="text-h2 text-neutral-dark font-semibold mb-2">
                No Entries Yet
              </Text>
              <Text className="text-body text-neutral-dark opacity-70 mb-6 text-center">
                Start journaling to track your sleep journey
              </Text>
              <Button variant="primary" onPress={() => {}}>
                Create First Entry
              </Button>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function JournalEntryCard({ entry }: { entry: JournalEntryDisplay }) {
  return (
    <Card className="mb-4">
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1">
          <Text className="text-base font-semibold text-neutral-dark mb-1">
            {entry.type === 'pre-sleep' ? 'Pre-Sleep' : 'Morning'} Entry
          </Text>
          <Text className="text-small text-neutral-dark opacity-60">
            {format(new Date(entry.date), 'MMM d, yyyy • h:mm a')}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded ${
          entry.type === 'pre-sleep' ? 'bg-accent/20' : 'bg-primary/20'
        }`}>
          <Text className={`text-xs font-medium ${
            entry.type === 'pre-sleep' ? 'text-accent' : 'text-primary'
          }`}>
            {entry.type === 'pre-sleep' ? 'Evening' : 'Morning'}
          </Text>
        </View>
      </View>
      <Text className="text-body text-neutral-dark opacity-80 mb-3">
        {entry.content}
      </Text>
      <TouchableOpacity>
        <Text className="text-accent text-sm font-medium">View Full Entry</Text>
      </TouchableOpacity>
    </Card>
  );
}
