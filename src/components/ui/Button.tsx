import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'default' | 'large' | 'small';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  className,
  style,
  textStyle,
}: ButtonProps) {
  const baseClasses = 'rounded-lg items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-transparent border-2 border-primary',
    minimal: 'bg-transparent',
  };

  const sizeClasses = {
    default: 'h-11 px-6',
    large: 'h-14 px-8',
    small: 'h-9 px-4',
  };

  const textVariantClasses = {
    primary: 'text-white font-medium',
    secondary: 'text-primary font-medium',
    minimal: 'text-accent font-medium',
  };

  const textSizeClasses = {
    default: 'text-base',
    large: 'text-lg',
    small: 'text-sm',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
      style={style}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : '#2C3E8A'} 
          size="small" 
        />
      ) : (
        <Text
          className={cn(
            textVariantClasses[variant],
            textSizeClasses[size]
          )}
          style={textStyle}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
