import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';

// Screens
import LandingScreen from '@/screens/Landing';
import LoginScreen from '@/screens/Login';
import SignupScreen from '@/screens/Signup';
import PasswordResetScreen from '@/screens/PasswordReset';
import EmailVerificationScreen from '@/screens/EmailVerification';
import OnboardingScreen from '@/screens/Onboarding';
import DashboardScreen from '@/screens/Dashboard';
import RitualBuilderScreen from '@/screens/RitualBuilder';
import GuidedPlayerScreen from '@/screens/GuidedPlayer';
import JournalScreen from '@/screens/Journal';
import ProfileScreen from '@/screens/Profile';
import PricingScreen from '@/screens/Pricing';
import SubscriptionManagementScreen from '@/screens/SubscriptionManagement';
import NotFoundScreen from '@/screens/NotFound';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <AuthStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2C3E8A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E9EDF5',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <MainTabs.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name="home" color={color} />
          ),
        }}
      />
      <MainTabs.Screen 
        name="Rituals" 
        component={RitualBuilderScreen}
        options={{
          tabBarLabel: 'Rituals',
          tabBarIcon: ({ color }) => (
            <TabIcon name="calendar" color={color} />
          ),
        }}
      />
      <MainTabs.Screen 
        name="Player" 
        component={GuidedPlayerScreen}
        options={{
          tabBarLabel: 'Player',
          tabBarIcon: ({ color }) => (
            <TabIcon name="play" color={color} />
          ),
        }}
      />
      <MainTabs.Screen 
        name="Journal" 
        component={JournalScreen}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color }) => (
            <TabIcon name="book" color={color} />
          ),
        }}
      />
      <MainTabs.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <TabIcon name="user" color={color} />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
}

// Simple icon component (replace with actual icon library)
function TabIcon({ name, color }: { name: string; color: string }) {
  // Placeholder - replace with react-native-vector-icons or similar
  // For now, return a simple text indicator
  const iconMap: Record<string, string> = {
    home: '🏠',
    calendar: '📅',
    play: '▶️',
    book: '📔',
    user: '👤',
  };
  return <Text style={{ fontSize: 20 }}>{iconMap[name] || '•'}</Text>;
}

export default function AppNavigator() {
  // TODO: Add auth state check
  const isAuthenticated = false; // Replace with actual auth check

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <RootStack.Screen name="Main" component={MainNavigator} />
            <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
            <RootStack.Screen name="Pricing" component={PricingScreen} />
            <RootStack.Screen name="SubscriptionManagement" component={SubscriptionManagementScreen} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
        <RootStack.Screen name="NotFound" component={NotFoundScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
