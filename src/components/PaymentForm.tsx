import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const paymentFormSchema = z.object({
  cardNumber: z.string().regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  cardholderName: z.string().min(2, 'Cardholder name required'),
  zipCode: z.string().min(5, 'ZIP code required'),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    zipCode: string;
  }) => void;
  loading?: boolean;
}

export function PaymentForm({ visible, onClose, onSubmit, loading }: PaymentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      zipCode: '',
    },
  });

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleFormSubmit = (data: PaymentFormData) => {
    onSubmit({
      cardNumber: data.cardNumber.replace(/\s/g, ''),
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardholderName: data.cardholderName,
      zipCode: data.zipCode,
    });
    reset();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Payment Information" variant="bottom-sheet">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Card Number
            </Text>
            <Controller
              control={control}
              name="cardNumber"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={(text) => onChange(formatCardNumber(text))}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="numeric"
                  maxLength={19}
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.cardNumber && (
              <Text className="text-sm text-error mt-1">{errors.cardNumber.message}</Text>
            )}
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              Cardholder Name
            </Text>
            <Controller
              control={control}
              name="cardholderName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="John Doe"
                  autoCapitalize="words"
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.cardholderName && (
              <Text className="text-sm text-error mt-1">{errors.cardholderName.message}</Text>
            )}
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-base font-medium text-neutral-dark mb-2">
                Expiry Date
              </Text>
              <Controller
                control={control}
                name="expiryDate"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={(text) => onChange(formatExpiryDate(text))}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
              {errors.expiryDate && (
                <Text className="text-sm text-error mt-1">{errors.expiryDate.message}</Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-base font-medium text-neutral-dark mb-2">
                CVV
              </Text>
              <Controller
                control={control}
                name="cvv"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
              {errors.cvv && (
                <Text className="text-sm text-error mt-1">{errors.cvv.message}</Text>
              )}
            </View>
          </View>

          <View>
            <Text className="text-base font-medium text-neutral-dark mb-2">
              ZIP Code
            </Text>
            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="12345"
                  keyboardType="numeric"
                  maxLength={10}
                  className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.zipCode && (
              <Text className="text-sm text-error mt-1">{errors.zipCode.message}</Text>
            )}
          </View>

          <View className="bg-neutral-light p-4 rounded-lg mt-2">
            <Text className="text-small text-neutral-dark opacity-70">
              Your payment information is securely processed and encrypted. We never store your full card details.
            </Text>
          </View>

          <View className="flex-row gap-3 mt-4">
            <Button variant="secondary" onPress={onClose} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={handleSubmit(handleFormSubmit)}
              className="flex-1"
              loading={loading}
            >
              Save Payment Method
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
