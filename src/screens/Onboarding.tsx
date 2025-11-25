import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, Control, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useCompleteOnboarding, useGenerateRitualPreview } from '@/hooks/useOnboarding';
import type { OnboardingAnswers, RitualPreview } from '@/types';
import {
  sleepScheduleSchema,
  habitsSchema,
  medicationsSchema,
  preferencesSchema,
  safetyFlagsSchema,
  type SleepScheduleForm,
  type HabitsForm,
  type MedicationsForm,
  type PreferencesForm,
  type SafetyFlagsForm,
} from '@/lib/validations/onboarding';
import { toast } from '@/lib/toast';

const TOTAL_STEPS = 7; // Welcome + 6 assessment steps

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [ritualPreview, setRitualPreview] = useState<RitualPreview | null>(null);
  
  const completeOnboarding = useCompleteOnboarding();
  const generatePreview = useGenerateRitualPreview();

  // Form controllers for each step
  const sleepScheduleForm = useForm<SleepScheduleForm>({
    resolver: zodResolver(sleepScheduleSchema),
    defaultValues: answers.sleep_schedule || {
      bedtime: undefined,
      wake_time: undefined,
      sleep_latency: undefined,
    },
  });

  const habitsForm = useForm<HabitsForm>({
    resolver: zodResolver(habitsSchema),
    defaultValues: answers.habits || {
      caffeine: {},
      alcohol: {},
      naps: {},
    },
  });

  const medicationsForm = useForm<MedicationsForm>({
    resolver: zodResolver(medicationsSchema),
    defaultValues: answers.medications || { takes_sleep_meds: false },
  });

  const preferencesForm = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: answers.preferences || {
      audio_voice: undefined,
      audio_style: undefined,
      light_sensitivity: undefined,
      device_integration_opt_in: false,
      preferred_integrations: undefined,
    },
  });

  const safetyFlagsForm = useForm<SafetyFlagsForm>({
    resolver: zodResolver(safetyFlagsSchema),
    defaultValues: answers.safety_flags || {
      severe_insomnia: false,
      sleep_apnea_symptoms: false,
      restless_legs: false,
      narcolepsy_symptoms: false,
      other_concerns: undefined,
    },
  });

  const handleNext = async () => {
    if (currentStep === 0) {
      // Welcome step - just proceed
      setCurrentStep(1);
      return;
    }

    if (currentStep === 1) {
      // Sleep Schedule
      const isValid = await sleepScheduleForm.trigger();
      if (!isValid) return;
      const data = sleepScheduleForm.getValues();
      setAnswers({ ...answers, sleep_schedule: data });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Habits
      const isValid = await habitsForm.trigger();
      if (!isValid) return;
      const data = habitsForm.getValues();
      setAnswers({ ...answers, habits: data });
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Medications
      const isValid = await medicationsForm.trigger();
      if (!isValid) return;
      const data = medicationsForm.getValues();
      setAnswers({ ...answers, medications: data });
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Preferences
      const isValid = await preferencesForm.trigger();
      if (!isValid) return;
      const data = preferencesForm.getValues();
      setAnswers({ ...answers, preferences: data });
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Safety Flags
      const isValid = await safetyFlagsForm.trigger();
      if (!isValid) return;
      const data = safetyFlagsForm.getValues();
      setAnswers({ ...answers, safety_flags: data });
      
      // Check for safety flags
      const hasFlags = Object.values(data).some(value => value === true || (typeof value === 'string' && value.length > 0));
      if (hasFlags) {
        setShowSafetyModal(true);
        return;
      }
      
      setCurrentStep(6);
    } else if (currentStep === 6) {
      // Summary - generate preview and complete
      await handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    try {
      // Generate preview first
      const previewResult = await generatePreview.mutateAsync(answers as OnboardingAnswers);
      setRitualPreview(previewResult);

      // Complete onboarding
      await completeOnboarding.mutateAsync(answers as OnboardingAnswers);
      
      toast.success('Onboarding complete! Your personalized ritual is ready.');
      
      // Navigate to dashboard
      (navigation as any).navigate('Main', { screen: 'Dashboard' });
    } catch (error) {
      console.error('Onboarding completion error:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    }
  };

  const handleSafetyModalContinue = () => {
    setShowSafetyModal(false);
    setCurrentStep(6);
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Progress Bar */}
        {currentStep > 0 && (
          <View className="px-6 pt-6 pb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-small text-neutral-dark opacity-60">
                Step {currentStep} of {TOTAL_STEPS - 1}
              </Text>
              <Text className="text-small text-neutral-dark opacity-60">
                {Math.round(progress)}%
              </Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        )}

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="px-6 py-6">
            {currentStep === 0 && (
              <WelcomeStep />
            )}
            {currentStep === 1 && (
              <ScheduleStep 
                control={sleepScheduleForm.control}
                errors={sleepScheduleForm.formState.errors}
              />
            )}
            {currentStep === 2 && (
              <HabitsStep 
                control={habitsForm.control}
                errors={habitsForm.formState.errors}
                watch={habitsForm.watch}
                setValue={habitsForm.setValue}
              />
            )}
            {currentStep === 3 && (
              <MedicationsStep 
                control={medicationsForm.control}
                errors={medicationsForm.formState.errors}
                watch={medicationsForm.watch}
                setValue={medicationsForm.setValue}
              />
            )}
            {currentStep === 4 && (
              <PreferencesStep 
                control={preferencesForm.control}
                errors={preferencesForm.formState.errors}
                watch={preferencesForm.watch}
                setValue={preferencesForm.setValue}
              />
            )}
            {currentStep === 5 && (
              <SafetyFlagsStep 
                control={safetyFlagsForm.control}
                errors={safetyFlagsForm.formState.errors}
                watch={safetyFlagsForm.watch}
                setValue={safetyFlagsForm.setValue}
              />
            )}
            {currentStep === 6 && (
              <SummaryStep 
                answers={answers}
                preview={ritualPreview}
                loading={completeOnboarding.isPending || generatePreview.isPending}
              />
            )}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View className="px-6 pb-8 pt-4 border-t border-border bg-white">
          <View className="flex-row gap-3">
            {currentStep > 0 && (
              <Button variant="secondary" onPress={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button 
              variant="primary" 
              onPress={handleNext} 
              className="flex-1"
              loading={completeOnboarding.isPending || generatePreview.isPending}
              disabled={completeOnboarding.isPending || generatePreview.isPending}
            >
              {currentStep === 0 ? 'Get Started' : 
               currentStep === TOTAL_STEPS - 1 ? 'Create My Ritual' : 'Next'}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Safety Flags Modal */}
      <Modal
        visible={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
        title="Important Health Notice"
        variant="center"
      >
        <View>
          <Text className="text-body text-neutral-dark mb-4">
            You've indicated some health concerns. While Rituals can help with sleep optimization, 
            we recommend consulting with a healthcare provider for:
          </Text>
          <View className="mb-4">
            {answers.safety_flags?.severe_insomnia && (
              <Text className="text-body text-neutral-dark mb-2">• Severe insomnia symptoms</Text>
            )}
            {answers.safety_flags?.sleep_apnea_symptoms && (
              <Text className="text-body text-neutral-dark mb-2">• Sleep apnea symptoms</Text>
            )}
            {answers.safety_flags?.restless_legs && (
              <Text className="text-body text-neutral-dark mb-2">• Restless legs syndrome</Text>
            )}
            {answers.safety_flags?.narcolepsy_symptoms && (
              <Text className="text-body text-neutral-dark mb-2">• Narcolepsy symptoms</Text>
            )}
          </View>
          <Card className="bg-warning/10 border-warning mb-4">
            <Text className="text-warning font-semibold mb-2">Clinical Resources</Text>
            <Text className="text-small text-neutral-dark mb-2">
              We can provide you with resources for finding sleep specialists in your area.
            </Text>
            <TouchableOpacity className="mt-2">
              <Text className="text-accent font-medium text-sm">View Resources</Text>
            </TouchableOpacity>
          </Card>
          <View className="flex-row gap-3">
            <Button variant="secondary" onPress={() => setShowSafetyModal(false)} className="flex-1">
              I Understand
            </Button>
            <Button variant="primary" onPress={handleSafetyModalContinue} className="flex-1">
              Continue
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Step Components

function WelcomeStep() {
  return (
    <View className="items-center">
      <View className="w-24 h-24 rounded-full bg-primary/10 items-center justify-center mb-6">
        <Text className="text-5xl">🌙</Text>
      </View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-4 text-center">
        Welcome to Rituals
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6 text-center px-4">
        Let's create your personalized sleep coaching experience. This assessment will take about 5 minutes 
        and helps us understand your sleep patterns, preferences, and goals.
      </Text>
      <Card className="w-full mb-4">
        <Text className="text-h2 text-neutral-dark font-semibold mb-3">
          What to Expect
        </Text>
        <View className="gap-3">
          <View className="flex-row items-start">
            <Text className="text-primary mr-3">1.</Text>
            <Text className="text-body text-neutral-dark flex-1">
              Tell us about your sleep schedule
            </Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-primary mr-3">2.</Text>
            <Text className="text-body text-neutral-dark flex-1">
              Share your habits and lifestyle
            </Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-primary mr-3">3.</Text>
            <Text className="text-body text-neutral-dark flex-1">
              Set your preferences
            </Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-primary mr-3">4.</Text>
            <Text className="text-body text-neutral-dark flex-1">
              Get your personalized ritual plan
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

function ScheduleStep({ control, errors }: { 
  control: Control<SleepScheduleForm>; 
  errors: FieldErrors<SleepScheduleForm>;
}) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Sleep Schedule
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Tell us about your typical sleep schedule
      </Text>
      
      <Controller
        control={control}
        name="bedtime"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Bedtime"
            placeholder="22:00"
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.bedtime?.message}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={control}
        name="wake_time"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Wake Time"
            placeholder="07:00"
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.wake_time?.message}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={control}
        name="sleep_latency"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Average Time to Fall Asleep (minutes)"
            placeholder="30"
            value={value?.toString() || ''}
            onChangeText={(text) => onChange(text ? Number(text) : undefined)}
            onBlur={onBlur}
            error={errors.sleep_latency?.message}
            keyboardType="numeric"
          />
        )}
      />
    </View>
  );
}

function HabitsStep({ control, errors, watch, setValue }: {
  control: Control<HabitsForm>;
  errors: FieldErrors<HabitsForm>;
  watch: UseFormWatch<HabitsForm>;
  setValue: UseFormSetValue<HabitsForm>;
}) {
  const naps = watch('naps');
  const alcohol = watch('alcohol');
  const takesNaps = naps?.takes_naps;
  const consumesAlcohol = alcohol?.consumes_alcohol;

  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Daily Habits
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Help us understand your lifestyle habits that affect sleep
      </Text>

      {/* Caffeine */}
      <View className="mb-6">
        <Text className="text-h2 text-neutral-dark font-semibold mb-3">Caffeine</Text>
        <Controller
          control={control}
          name="caffeine.daily_intake"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Daily Caffeine Intake (cups)"
              placeholder="2"
              value={value?.toString() || ''}
              onChangeText={(text) => onChange(text ? Number(text) : undefined)}
              onBlur={onBlur}
              error={errors.caffeine?.daily_intake?.message}
              keyboardType="numeric"
            />
          )}
        />
        <Controller
          control={control}
          name="caffeine.last_cup_time"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Last Cup Time"
              placeholder="14:00"
              value={(value as string | undefined) || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.caffeine?.last_cup_time?.message}
              keyboardType="numeric"
            />
          )}
        />
      </View>

      {/* Alcohol */}
      <View className="mb-6">
        <Text className="text-h2 text-neutral-dark font-semibold mb-3">Alcohol</Text>
        <Text className="text-body text-neutral-dark opacity-70 mb-3">
          Do you consume alcohol?
        </Text>
        <View className="flex-row gap-3 mb-4">
          <TouchableOpacity
            onPress={() => setValue('alcohol.consumes_alcohol', true)}
            className={`flex-1 py-4 rounded-lg border-2 items-center ${
              consumesAlcohol === true ? 'border-primary bg-primary/10' : 'border-input'
            }`}
          >
            <Text className={`font-medium ${consumesAlcohol === true ? 'text-primary' : 'text-neutral-dark'}`}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue('alcohol.consumes_alcohol', false)}
            className={`flex-1 py-4 rounded-lg border-2 items-center ${
              consumesAlcohol === false ? 'border-primary bg-primary/10' : 'border-input'
            }`}
          >
            <Text className={`font-medium ${consumesAlcohol === false ? 'text-primary' : 'text-neutral-dark'}`}>
              No
            </Text>
          </TouchableOpacity>
        </View>
        {consumesAlcohol && (
          <>
            <Controller
              control={control}
              name="alcohol.weekly_consumption"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Weekly Consumption (drinks)"
                  placeholder="3"
                  value={value?.toString() || ''}
                  onChangeText={(text) => onChange(text ? Number(text) : undefined)}
                  onBlur={onBlur}
                  error={errors.alcohol?.weekly_consumption?.message}
                  keyboardType="numeric"
                  className="mb-4"
                />
              )}
            />
            <Controller
              control={control}
              name="alcohol.last_drink_time"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Typical Last Drink Time"
                  placeholder="20:00"
                  value={(value as string | undefined) || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.alcohol?.last_drink_time?.message}
                  keyboardType="numeric"
                />
              )}
            />
          </>
        )}
      </View>

      {/* Naps */}
      <View>
        <Text className="text-h2 text-neutral-dark font-semibold mb-3">Naps</Text>
        <Text className="text-body text-neutral-dark opacity-70 mb-3">
          Do you take naps during the day?
        </Text>
        <View className="flex-row gap-3 mb-4">
          <TouchableOpacity
            onPress={() => setValue('naps.takes_naps', true)}
            className={`flex-1 py-4 rounded-lg border-2 items-center ${
              takesNaps === true ? 'border-primary bg-primary/10' : 'border-input'
            }`}
          >
            <Text className={`font-medium ${takesNaps === true ? 'text-primary' : 'text-neutral-dark'}`}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue('naps.takes_naps', false)}
            className={`flex-1 py-4 rounded-lg border-2 items-center ${
              takesNaps === false ? 'border-primary bg-primary/10' : 'border-input'
            }`}
          >
            <Text className={`font-medium ${takesNaps === false ? 'text-primary' : 'text-neutral-dark'}`}>
              No
            </Text>
          </TouchableOpacity>
        </View>
        {takesNaps && (
          <>
            <Controller
              control={control}
              name="naps.nap_frequency"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-neutral-dark text-sm font-medium mb-2">
                    Nap Frequency
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {[
                      { value: 'daily', label: 'Daily' },
                      { value: 'few_times_week', label: 'Few times/week' },
                      { value: 'rarely', label: 'Rarely' },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        className={`py-2 px-4 rounded-lg border-2 ${
                          value === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-input'
                        }`}
                      >
                        <Text className={`font-medium ${
                          value === option.value ? 'text-primary' : 'text-neutral-dark'
                        }`}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
            <Controller
              control={control}
              name="naps.nap_duration"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Average Nap Duration (minutes)"
                  placeholder="30"
                  value={value?.toString() || ''}
                  onChangeText={(text) => onChange(text ? Number(text) : undefined)}
                  onBlur={onBlur}
                  error={errors.naps?.nap_duration?.message}
                  keyboardType="numeric"
                  className="mb-4"
                />
              )}
            />
            <Controller
              control={control}
              name="naps.nap_time"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Typical Nap Time"
                  placeholder="14:00"
                  value={(value as string | undefined) || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.naps?.nap_time?.message}
                  keyboardType="numeric"
                />
              )}
            />
          </>
        )}
      </View>
    </View>
  );
}

function MedicationsStep({ control, errors, watch, setValue }: {
  control: Control<MedicationsForm>;
  errors: FieldErrors<MedicationsForm>;
  watch: UseFormWatch<MedicationsForm>;
  setValue: UseFormSetValue<MedicationsForm>;
}) {
  const takesMeds = watch('takes_sleep_meds');

  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Medications
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Do you take any sleep-related medications?
      </Text>
      
      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          onPress={() => setValue('takes_sleep_meds', true)}
          className={`flex-1 py-4 rounded-lg border-2 items-center ${
            takesMeds === true ? 'border-primary bg-primary/10' : 'border-input'
          }`}
        >
          <Text className={`font-medium ${takesMeds === true ? 'text-primary' : 'text-neutral-dark'}`}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setValue('takes_sleep_meds', false)}
          className={`flex-1 py-4 rounded-lg border-2 items-center ${
            takesMeds === false ? 'border-primary bg-primary/10' : 'border-input'
          }`}
        >
          <Text className={`font-medium ${takesMeds === false ? 'text-primary' : 'text-neutral-dark'}`}>
            No
          </Text>
        </TouchableOpacity>
      </View>

      {takesMeds && (
        <Card className="bg-warning/10 border-warning mb-4">
          <Text className="text-warning font-semibold mb-2">
            Safety Notice
          </Text>
          <Text className="text-small text-neutral-dark">
            Please consult with a healthcare provider about using sleep coaching alongside medications. 
            We'll provide resources to help you find a sleep specialist.
          </Text>
        </Card>
      )}
    </View>
  );
}

function PreferencesStep({ control, errors, watch, setValue }: {
  control: Control<PreferencesForm>;
  errors: FieldErrors<PreferencesForm>;
  watch: UseFormWatch<PreferencesForm>;
  setValue: UseFormSetValue<PreferencesForm>;
}) {
  const lightSensitivity = watch('light_sensitivity');
  const integrationOptIn = watch('device_integration_opt_in');

  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Preferences
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Customize your experience
      </Text>

      {/* Audio Voice */}
      <View className="mb-6">
        <Text className="text-neutral-dark text-sm font-medium mb-2">
          Preferred Audio Voice
        </Text>
        <Controller
          control={control}
          name="audio_voice"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-3">
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'neutral', label: 'Neutral' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => onChange(option.value)}
                  className={`flex-1 py-3 rounded-lg border-2 items-center ${
                    value === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-input'
                  }`}
                >
                  <Text className={`font-medium ${
                    value === option.value ? 'text-primary' : 'text-neutral-dark'
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      {/* Light Sensitivity */}
      <View className="mb-6">
        <Text className="text-neutral-dark text-sm font-medium mb-2">
          Light Sensitivity
        </Text>
        <Controller
          control={control}
          name="light_sensitivity"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-3">
              {[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => onChange(option.value)}
                  className={`flex-1 py-3 rounded-lg border-2 items-center ${
                    value === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-input'
                  }`}
                >
                  <Text className={`font-medium ${
                    value === option.value ? 'text-primary' : 'text-neutral-dark'
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      {/* Device Integration */}
      <View>
        <Text className="text-neutral-dark text-sm font-medium mb-3">
          Device Integration
        </Text>
        <TouchableOpacity
          onPress={() => setValue('device_integration_opt_in', !integrationOptIn)}
          className="flex-row items-center justify-between py-4 border-b border-border"
        >
          <View className="flex-1">
            <Text className="text-body text-neutral-dark font-medium mb-1">
              Connect Wearable Devices
            </Text>
            <Text className="text-small text-neutral-dark opacity-70">
              Sync sleep data from Apple Health, Google Fit, Oura, Fitbit, or Garmin
            </Text>
          </View>
          <View className={`w-12 h-6 rounded-full ${
            integrationOptIn ? 'bg-primary' : 'bg-border'
          }`}>
            <View className={`w-5 h-5 rounded-full bg-white mt-0.5 ${
              integrationOptIn ? 'ml-6' : 'ml-0.5'
            }`} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SafetyFlagsStep({ control, errors, watch, setValue }: {
  control: Control<SafetyFlagsForm>;
  errors: FieldErrors<SafetyFlagsForm>;
  watch: UseFormWatch<SafetyFlagsForm>;
  setValue: UseFormSetValue<SafetyFlagsForm>;
}) {
  const safetyFlags: Array<{
    key: keyof SafetyFlagsForm;
    label: string;
    description: string;
  }> = [
    { key: 'severe_insomnia', label: 'Severe insomnia symptoms', description: 'Difficulty falling or staying asleep most nights' },
    { key: 'sleep_apnea_symptoms', label: 'Sleep apnea symptoms', description: 'Loud snoring, gasping, or pauses in breathing' },
    { key: 'restless_legs', label: 'Restless legs syndrome', description: 'Uncomfortable sensations in legs at night' },
    { key: 'narcolepsy_symptoms', label: 'Narcolepsy symptoms', description: 'Excessive daytime sleepiness or sudden sleep attacks' },
  ];

  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Health & Safety
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Help us understand any health concerns related to sleep
      </Text>

      <View className="gap-4">
        {safetyFlags.map((flag) => {
          const value = watch(flag.key);
          return (
            <TouchableOpacity
              key={flag.key}
              onPress={() => setValue(flag.key, !value)}
              className={`p-4 rounded-lg border-2 ${
                value ? 'border-primary bg-primary/10' : 'border-input bg-white'
              }`}
            >
              <View className="flex-row items-start">
                <View className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 ${
                  value ? 'border-primary bg-primary' : 'border-input'
                }`}>
                  {value && <Text className="text-white text-xs text-center">✓</Text>}
                </View>
                <View className="flex-1">
                  <Text className={`font-medium mb-1 ${
                    value ? 'text-primary' : 'text-neutral-dark'
                  }`}>
                    {flag.label}
                  </Text>
                  <Text className="text-small text-neutral-dark opacity-70">
                    {flag.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <Controller
          control={control}
          name="other_concerns"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Other Concerns (optional)"
              placeholder="Describe any other sleep-related health concerns"
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.other_concerns?.message}
              multiline
              numberOfLines={3}
              className="mt-2"
            />
          )}
        />
      </View>
    </View>
  );
}

function SummaryStep({ answers, preview, loading }: {
  answers: Partial<OnboardingAnswers>;
  preview: RitualPreview | null;
  loading: boolean;
}) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Almost There!
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Review your information and create your personalized ritual
      </Text>

      <Card className="mb-4">
        <Text className="text-h2 text-neutral-dark font-semibold mb-4">
          Your Sleep Profile
        </Text>
        <View className="gap-3">
          {answers.sleep_schedule?.bedtime && (
            <View className="flex-row justify-between">
              <Text className="text-body text-neutral-dark opacity-70">Bedtime</Text>
              <Text className="text-body text-neutral-dark font-medium">
                {answers.sleep_schedule.bedtime}
              </Text>
            </View>
          )}
          {answers.sleep_schedule?.wake_time && (
            <View className="flex-row justify-between">
              <Text className="text-body text-neutral-dark opacity-70">Wake Time</Text>
              <Text className="text-body text-neutral-dark font-medium">
                {answers.sleep_schedule.wake_time}
              </Text>
            </View>
          )}
          {answers.preferences?.light_sensitivity && (
            <View className="flex-row justify-between">
              <Text className="text-body text-neutral-dark opacity-70">Light Sensitivity</Text>
              <Text className="text-body text-neutral-dark font-medium capitalize">
                {answers.preferences.light_sensitivity}
              </Text>
            </View>
          )}
        </View>
      </Card>

      {preview && (
        <Card className="bg-primary/5 border-primary/20">
          <Text className="text-h2 text-neutral-dark font-semibold mb-3">
            Your Personalized Ritual Preview
          </Text>
          <View className="gap-2">
            <View className="flex-row items-center">
              <Text className="text-body text-neutral-dark opacity-70 mr-2">⏱️</Text>
              <Text className="text-body text-neutral-dark">
                Estimated duration: {preview.estimated_duration} minutes
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-body text-neutral-dark opacity-70 mr-2">📋</Text>
              <Text className="text-body text-neutral-dark">
                {preview.steps_count} steps
              </Text>
            </View>
            {preview.wind_down_time && (
              <View className="flex-row items-center">
                <Text className="text-body text-neutral-dark opacity-70 mr-2">🌅</Text>
                <Text className="text-body text-neutral-dark">
                  Wind-down starts at {preview.wind_down_time}
                </Text>
              </View>
            )}
          </View>
        </Card>
      )}

      {loading && (
        <Card className="mt-4">
          <Text className="text-body text-neutral-dark opacity-70 text-center">
            Generating your personalized ritual...
          </Text>
        </Card>
      )}
    </View>
  );
}
