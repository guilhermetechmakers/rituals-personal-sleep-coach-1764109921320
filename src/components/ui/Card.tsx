import React from 'react';
import { View, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, className, style, onPress }: CardProps) {
  const TouchableComponent = onPress ? require('react-native').TouchableOpacity : View;
  
  return (
    <TouchableComponent
      onPress={onPress}
      className={cn(
        'bg-white rounded-xl p-4 shadow-card',
        className
      )}
      style={style}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </TouchableComponent>
  );
}
