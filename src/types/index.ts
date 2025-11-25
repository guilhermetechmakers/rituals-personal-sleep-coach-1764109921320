// Core types for Rituals app

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  timezone: string;
  sleep_window_start?: string;
  sleep_window_end?: string;
  created_at: string;
  updated_at: string;
}

export interface Ritual {
  id: string;
  user_id: string;
  date: string;
  steps: RitualStep[];
  total_duration: number; // in minutes
  variant?: 'standard' | 'short' | 'travel' | 'shift-work';
  created_at: string;
  updated_at: string;
}

export interface RitualStep {
  id: string;
  type: 'wind-down' | 'in-bed' | 'morning';
  title: string;
  description: string;
  duration: number; // in minutes
  start_time?: string; // HH:mm format
  audio_url?: string;
  order: number;
}

export interface SleepSession {
  id: string;
  user_id: string;
  date: string;
  time_in_bed: number; // minutes
  sleep_latency: number; // minutes
  total_sleep_time: number; // minutes
  awakenings: number;
  sleep_quality: number; // 1-10 scale
  source: 'manual' | 'apple_health' | 'google_fit' | 'oura' | 'fitbit' | 'garmin';
  confidence_score?: number; // 0-1 for imported data
  created_at: string;
  updated_at: string;
}

export interface SleepScore {
  date: string;
  score: number; // 0-100
  delta?: number; // change from previous day
  factors: {
    latency: number;
    duration: number;
    quality: number;
    consistency: number;
  };
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  type: 'ritual_completion' | 'journal_entry' | 'wind_down_time' | 'morning_routine';
  current_streak: number;
  longest_streak: number;
  completed_today: boolean;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  type: 'pre-sleep' | 'morning';
  content: string;
  mood_tags?: string[];
  quality_rating?: number; // 1-10
  energy_level?: number; // 1-10
  dream_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface GuidedSession {
  id: string;
  title: string;
  description: string;
  type: 'wind-down' | 'in-bed';
  duration: number; // minutes
  audio_url: string;
  segments: SessionSegment[];
  transcript?: string;
  created_at: string;
}

export interface SessionSegment {
  id: string;
  title: string;
  start_time: number; // seconds from start
  duration: number; // seconds
}

export interface WearableIntegration {
  id: string;
  user_id: string;
  provider: 'apple_health' | 'google_fit' | 'oura' | 'fitbit' | 'garmin';
  connected: boolean;
  last_sync?: string;
  access_token?: string; // encrypted
  refresh_token?: string; // encrypted
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'premium_monthly' | 'premium_annual';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_end?: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
}

export interface OnboardingAnswers {
  sleep_schedule?: {
    bedtime?: string; // HH:mm format
    wake_time?: string; // HH:mm format
    timezone?: string;
    sleep_latency?: number; // minutes
  };
  habits?: {
    caffeine?: {
      daily_intake?: number; // cups
      last_cup_time?: string; // HH:mm format
    };
    alcohol?: {
      consumes_alcohol?: boolean;
      weekly_consumption?: number; // drinks per week
      last_drink_time?: string; // HH:mm format (on days consumed)
    };
    naps?: {
      takes_naps?: boolean;
      nap_frequency?: 'daily' | 'few_times_week' | 'rarely' | 'never';
      nap_duration?: number; // minutes
      nap_time?: string; // HH:mm format
    };
  };
  medications?: {
    takes_sleep_meds?: boolean;
    medication_list?: string[];
    other_medications?: string[]; // medications that might affect sleep
  };
  preferences?: {
    audio_voice?: 'male' | 'female' | 'neutral';
    audio_style?: 'calm' | 'energetic' | 'meditative';
    light_sensitivity?: 'low' | 'medium' | 'high';
    device_integration_opt_in?: boolean;
    preferred_integrations?: ('apple_health' | 'google_fit' | 'oura' | 'fitbit' | 'garmin')[];
  };
  severity?: {
    sleep_latency_minutes?: number;
    sleep_quality_rating?: number; // 1-10
    awakenings_per_night?: number;
    sleep_efficiency?: number; // percentage
  };
  safety_flags?: {
    severe_insomnia?: boolean;
    sleep_apnea_symptoms?: boolean;
    restless_legs?: boolean;
    narcolepsy_symptoms?: boolean;
    other_concerns?: string;
  };
}

export interface UserAssessment {
  id: string;
  user_id: string;
  answers: OnboardingAnswers;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RitualPreview {
  estimated_duration: number; // minutes
  steps_count: number;
  wind_down_time?: string; // HH:mm
  in_bed_time?: string; // HH:mm
  morning_time?: string; // HH:mm
}
