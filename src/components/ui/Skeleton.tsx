import React from 'react';
import { View, ViewStyle, DimensionValue } from 'react-native';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  className?: string;
  style?: ViewStyle;
  rounded?: boolean;
}

export function Skeleton({ 
  width = '100%', 
  height = 20, 
  className, 
  style,
  rounded = false 
}: SkeletonProps) {
  return (
    <View
      className={cn(
        'bg-neutral-light',
        rounded && 'rounded-full',
        !rounded && 'rounded-md'
      )}
      style={[
        { width, height },
        style
      ]}
    />
  );
}
