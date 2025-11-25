import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Onboarding: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Signup: undefined;
  PasswordReset: undefined;
  EmailVerification: { email: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Rituals: undefined;
  Player: undefined;
  Journal: undefined;
  Profile: undefined;
};

export type RitualStackParamList = {
  RitualBuilder: { ritualId?: string };
  RitualDetail: { ritualId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  SleepTracking: undefined;
  Pricing: undefined;
  Help: undefined;
};
