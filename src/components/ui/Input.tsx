import React from 'react';
import { TextInput, Text, View, ViewStyle, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  style?: ViewStyle;
}

export function Input({
  label,
  error,
  className,
  containerClassName,
  style,
  ...props
}: InputProps) {
  return (
    <View className={cn('mb-4', containerClassName)}>
      {label && (
        <Text className="text-neutral-dark text-sm font-medium mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          'h-11 px-4 rounded-md border border-input bg-white text-neutral-dark',
          error && 'border-error',
          className
        )}
        placeholderTextColor="#9CA3AF"
        style={style}
        {...props}
      />
      {error && (
        <Text className="text-error text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
