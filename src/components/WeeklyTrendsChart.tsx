import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryArea } from 'victory-native';
import type { WeeklyTrend } from '@/hooks/useTrends';
import { Skeleton } from '@/components/ui/Skeleton';

interface WeeklyTrendsChartProps {
  data: WeeklyTrend[] | undefined;
  isLoading: boolean;
  metric: 'latency' | 'duration' | 'quality';
}

export function WeeklyTrendsChart({ data, isLoading, metric }: WeeklyTrendsChartProps) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64; // Account for padding

  if (isLoading) {
    return (
      <View className="h-48 items-center justify-center">
        <Skeleton className="w-full h-full rounded-lg" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="h-48 items-center justify-center bg-neutral-light rounded-lg">
        <Text className="text-body text-neutral-dark opacity-60">
          No data available
        </Text>
      </View>
    );
  }

  const chartData = data.map((item, index) => {
    let yValue: number;
    if (metric === 'latency') {
      yValue = item.sleep_latency;
    } else if (metric === 'duration') {
      yValue = item.total_sleep_time;
    } else {
      yValue = item.sleep_quality;
    }
    return {
      x: index + 1,
      y: yValue,
      label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const yAxisLabel = {
    latency: 'Minutes',
    duration: 'Minutes',
    quality: 'Score (1-10)',
  }[metric];

  const maxY = Math.max(...chartData.map((d) => d.y)) * 1.1;
  const minY = Math.max(0, Math.min(...chartData.map((d) => d.y)) * 0.9);

  return (
    <View className="h-48">
      <VictoryChart
        width={chartWidth}
        height={192}
        theme={VictoryTheme.material}
        padding={{ left: 50, right: 20, top: 20, bottom: 40 }}
        domain={{ y: [minY, maxY] }}
      >
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: '#E9EDF5' },
            tickLabels: { fill: '#6B7280', fontSize: 10 },
            grid: { stroke: '#E9EDF5', strokeDasharray: '4,4' },
            axisLabel: { fill: '#6B7280', fontSize: 10, padding: 30 },
          }}
          label={yAxisLabel}
        />
        <VictoryAxis
          style={{
            axis: { stroke: '#E9EDF5' },
            tickLabels: { fill: '#6B7280', fontSize: 10 },
          }}
          tickFormat={(t) => {
            const item = data[t - 1];
            if (!item) return '';
            return new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }}
        />
        <VictoryArea
          data={chartData}
          style={{
            data: {
              fill: '#2C3E8A',
              fillOpacity: 0.2,
              stroke: '#2C3E8A',
              strokeWidth: 2,
            },
          }}
        />
        <VictoryLine
          data={chartData}
          style={{
            data: {
              stroke: '#2C3E8A',
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}
