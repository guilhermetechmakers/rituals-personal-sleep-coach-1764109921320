import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, className, style, onPress }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={cn(
          'bg-white rounded-xl p-4 shadow-card',
          className
        )}
        style={style}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return (
    <View
      className={cn(
        'bg-white rounded-xl p-4 shadow-card',
        className
      )}
      style={style}
    >
      {children}
    </View>
  );
}
