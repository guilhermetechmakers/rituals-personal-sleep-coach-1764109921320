import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

const TOTAL_STEPS = 6;

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // TODO: Submit onboarding answers and navigate to dashboard
    console.log('Onboarding complete:', answers);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <View className="flex-1">
        {/* Progress Bar */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-small text-neutral-dark opacity-60">
              Step {currentStep} of {TOTAL_STEPS}
            </Text>
            <Text className="text-small text-neutral-dark opacity-60">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </Text>
          </View>
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-6">
            {currentStep === 1 && <ScheduleStep answers={answers} setAnswers={setAnswers} />}
            {currentStep === 2 && <CaffeineStep answers={answers} setAnswers={setAnswers} />}
            {currentStep === 3 && <NapsStep answers={answers} setAnswers={setAnswers} />}
            {currentStep === 4 && <MedicationsStep answers={answers} setAnswers={setAnswers} />}
            {currentStep === 5 && <SeverityStep answers={answers} setAnswers={setAnswers} />}
            {currentStep === 6 && <PreferencesStep answers={answers} setAnswers={setAnswers} />}
          </View>
        </ScrollView>

        {/* Navigation Buttons */}
        <View className="px-6 pb-8 pt-4 border-t border-border">
          <View className="flex-row gap-3">
            {currentStep > 1 && (
              <Button variant="secondary" onPress={handleBack} className="flex-1">
                Back
              </Button>
            )}
            <Button variant="primary" onPress={handleNext} className="flex-1">
              {currentStep === TOTAL_STEPS ? 'Finish' : 'Next'}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ScheduleStep({ answers, setAnswers }: any) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Sleep Schedule
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Tell us about your typical sleep schedule
      </Text>
      <Input
        label="Bedtime"
        placeholder="22:00"
        value={answers.bedtime || ''}
        onChangeText={(text) => setAnswers({ ...answers, bedtime: text })}
      />
      <Input
        label="Wake Time"
        placeholder="07:00"
        value={answers.wake_time || ''}
        onChangeText={(text) => setAnswers({ ...answers, wake_time: text })}
      />
    </View>
  );
}

function CaffeineStep({ answers, setAnswers }: any) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Caffeine Intake
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        How much caffeine do you consume daily?
      </Text>
      <Input
        label="Daily Intake (cups)"
        placeholder="2"
        keyboardType="numeric"
        value={answers.caffeine_cups || ''}
        onChangeText={(text) => setAnswers({ ...answers, caffeine_cups: text })}
      />
      <Input
        label="Last Cup Time"
        placeholder="14:00"
        value={answers.last_cup_time || ''}
        onChangeText={(text) => setAnswers({ ...answers, last_cup_time: text })}
      />
    </View>
  );
}

function NapsStep({ answers, setAnswers }: any) {
  const [takesNaps, setTakesNaps] = useState(answers.takes_naps ?? null);

  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Napping Habits
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Do you take naps during the day?
      </Text>
      <View className="flex-row gap-3 mb-6">
        <TouchableOpacity
          onPress={() => {
            setTakesNaps(true);
            setAnswers({ ...answers, takes_naps: true });
          }}
          className={`flex-1 py-4 rounded-lg border-2 items-center ${
            takesNaps === true ? 'border-primary bg-primary/10' : 'border-input'
          }`}
        >
          <Text className={`font-medium ${takesNaps === true ? 'text-primary' : 'text-neutral-dark'}`}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTakesNaps(false);
            setAnswers({ ...answers, takes_naps: false });
          }}
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
        <Input
          label="Average Nap Duration (minutes)"
          placeholder="30"
          keyboardType="numeric"
          value={answers.nap_duration || ''}
          onChangeText={(text) => setAnswers({ ...answers, nap_duration: text })}
        />
      )}
    </View>
  );
}

function MedicationsStep({ answers, setAnswers }: any) {
  const [takesMeds, setTakesMeds] = useState(answers.takes_sleep_meds ?? null);

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
          onPress={() => {
            setTakesMeds(true);
            setAnswers({ ...answers, takes_sleep_meds: true });
          }}
          className={`flex-1 py-4 rounded-lg border-2 items-center ${
            takesMeds === true ? 'border-primary bg-primary/10' : 'border-input'
          }`}
        >
          <Text className={`font-medium ${takesMeds === true ? 'text-primary' : 'text-neutral-dark'}`}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTakesMeds(false);
            setAnswers({ ...answers, takes_sleep_meds: false });
          }}
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
        <Card className="bg-warning/10 border-warning">
          <Text className="text-warning font-medium mb-2">
            Safety Notice
          </Text>
          <Text className="text-small text-neutral-dark">
            Please consult with a healthcare provider about using sleep coaching alongside medications.
          </Text>
        </Card>
      )}
    </View>
  );
}

function SeverityStep({ answers, setAnswers }: any) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Sleep Quality
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Help us understand your current sleep challenges
      </Text>
      <Input
        label="Average Sleep Latency (minutes)"
        placeholder="30"
        keyboardType="numeric"
        value={answers.sleep_latency || ''}
        onChangeText={(text) => setAnswers({ ...answers, sleep_latency: text })}
      />
      <Input
        label="Sleep Quality Rating (1-10)"
        placeholder="6"
        keyboardType="numeric"
        value={answers.sleep_quality || ''}
        onChangeText={(text) => setAnswers({ ...answers, sleep_quality: text })}
      />
    </View>
  );
}

function PreferencesStep({ answers, setAnswers }: any) {
  return (
    <View>
      <Text className="text-h1 text-neutral-dark font-semibold mb-2">
        Preferences
      </Text>
      <Text className="text-body text-neutral-dark opacity-80 mb-6">
        Customize your experience
      </Text>
      <Input
        label="Preferred Audio Voice"
        placeholder="Select voice"
        value={answers.audio_voice || ''}
        onChangeText={(text) => setAnswers({ ...answers, audio_voice: text })}
      />
      <View className="mb-4">
        <Text className="text-neutral-dark text-sm font-medium mb-2">
          Light Sensitivity
        </Text>
        <View className="flex-row gap-3">
          {['Low', 'Medium', 'High'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setAnswers({ ...answers, light_sensitivity: level.toLowerCase() })}
              className={`flex-1 py-3 rounded-lg border-2 items-center ${
                answers.light_sensitivity === level.toLowerCase()
                  ? 'border-primary bg-primary/10'
                  : 'border-input'
              }`}
            >
              <Text className={`font-medium ${
                answers.light_sensitivity === level.toLowerCase()
                  ? 'text-primary'
                  : 'text-neutral-dark'
              }`}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
