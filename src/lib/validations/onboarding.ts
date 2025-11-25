import { z } from 'zod';

// Step 1: Welcome (no validation needed, just informational)

// Step 2: Sleep Schedule
export const sleepScheduleSchema = z.object({
  bedtime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:mm)').optional(),
  wake_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:mm)').optional(),
  sleep_latency: z.coerce.number().min(0).max(300).optional(),
});

// Step 3: Habits
export const habitsSchema = z.object({
  caffeine: z.object({
    daily_intake: z.coerce.number().min(0).max(20).optional(),
    last_cup_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:mm)').optional(),
  }).optional(),
  alcohol: z.object({
    consumes_alcohol: z.boolean().optional(),
    weekly_consumption: z.coerce.number().min(0).max(50).optional(),
    last_drink_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:mm)').optional(),
  }).optional(),
  naps: z.object({
    takes_naps: z.boolean().optional(),
    nap_frequency: z.enum(['daily', 'few_times_week', 'rarely', 'never']).optional(),
    nap_duration: z.coerce.number().min(5).max(180).optional(),
    nap_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:mm)').optional(),
  }).optional(),
});

// Step 4: Medications
export const medicationsSchema = z.object({
  takes_sleep_meds: z.boolean().optional(),
  medication_list: z.array(z.string()).optional(),
  other_medications: z.array(z.string()).optional(),
});

// Step 5: Preferences
export const preferencesSchema = z.object({
  audio_voice: z.enum(['male', 'female', 'neutral']).optional(),
  audio_style: z.enum(['calm', 'energetic', 'meditative']).optional(),
  light_sensitivity: z.enum(['low', 'medium', 'high']).optional(),
  device_integration_opt_in: z.boolean().optional(),
  preferred_integrations: z.array(z.enum(['apple_health', 'google_fit', 'oura', 'fitbit', 'garmin'])).optional(),
});

// Step 6: Safety Flags
export const safetyFlagsSchema = z.object({
  severe_insomnia: z.boolean().optional(),
  sleep_apnea_symptoms: z.boolean().optional(),
  restless_legs: z.boolean().optional(),
  narcolepsy_symptoms: z.boolean().optional(),
  other_concerns: z.string().max(500).optional(),
});

// Combined schema for final submission
export const onboardingSchema = z.object({
  sleep_schedule: sleepScheduleSchema.optional(),
  habits: habitsSchema.optional(),
  medications: medicationsSchema.optional(),
  preferences: preferencesSchema.optional(),
  severity: z.object({
    sleep_latency_minutes: z.coerce.number().min(0).max(300).optional(),
    sleep_quality_rating: z.coerce.number().min(1).max(10).optional(),
    awakenings_per_night: z.coerce.number().min(0).max(20).optional(),
    sleep_efficiency: z.coerce.number().min(0).max(100).optional(),
  }).optional(),
  safety_flags: safetyFlagsSchema.optional(),
});

export type SleepScheduleForm = z.infer<typeof sleepScheduleSchema>;
export type HabitsForm = z.infer<typeof habitsSchema>;
export type MedicationsForm = z.infer<typeof medicationsSchema>;
export type PreferencesForm = z.infer<typeof preferencesSchema>;
export type SafetyFlagsForm = z.infer<typeof safetyFlagsSchema>;
export type OnboardingForm = z.infer<typeof onboardingSchema>;
