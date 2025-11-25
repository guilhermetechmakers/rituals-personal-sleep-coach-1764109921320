import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { cn } from '@/lib/utils';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'center' | 'bottom-sheet';
  className?: string;
}

export function Modal({
  visible,
  onClose,
  title,
  children,
  variant = Platform.OS === 'web' ? 'center' : 'bottom-sheet',
  className,
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType={variant === 'bottom-sheet' ? 'slide' : 'fade'}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.overlay}
      >
        <View
          style={styles.container}
          className={cn(
            variant === 'bottom-sheet' ? 'justify-end' : 'justify-center items-center',
            className
          )}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className={cn(
              'bg-white rounded-t-3xl',
              variant === 'center' && 'rounded-3xl',
              variant === 'bottom-sheet' && 'w-full max-w-md mx-auto',
              variant === 'center' && 'w-full max-w-md mx-6',
              'p-6'
            )}
          >
            {title && (
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-h2 text-neutral-dark font-semibold">
                  {title}
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Text className="text-2xl text-neutral-dark opacity-60">×</Text>
                </TouchableOpacity>
              </View>
            )}
            {children}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
  },
});
