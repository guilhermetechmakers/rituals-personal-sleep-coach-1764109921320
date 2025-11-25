import { Alert, Platform } from 'react-native';

// Simple toast utility for React Native
// In production, consider using react-native-toast-message or similar
export const toast = {
  success: (message: string) => {
    if (Platform.OS === 'web') {
      // For web, you could use a web toast library
      console.log(`✅ ${message}`);
    } else {
      Alert.alert('Success', message);
    }
  },
  error: (message: string) => {
    if (Platform.OS === 'web') {
      console.error(`❌ ${message}`);
    } else {
      Alert.alert('Error', message);
    }
  },
  info: (message: string) => {
    if (Platform.OS === 'web') {
      console.log(`ℹ️ ${message}`);
    } else {
      Alert.alert('Info', message);
    }
  },
  loading: (message: string) => {
    // For React Native, loading states are typically handled in UI
    console.log(`⏳ ${message}`);
  },
};
