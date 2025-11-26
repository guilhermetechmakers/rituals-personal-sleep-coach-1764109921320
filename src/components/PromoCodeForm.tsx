import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useValidatePromoCode } from '@/hooks/useSubscription';
import type { PromoCode } from '@/types';

const promoCodeSchema = z.object({
  code: z.string().min(1, 'Promo code required').transform((val) => val.toUpperCase()),
});

type PromoCodeFormData = z.infer<typeof promoCodeSchema>;

interface PromoCodeFormProps {
  visible: boolean;
  onClose: () => void;
  onApply: (code: string, promoCode: PromoCode) => void;
  loading?: boolean;
}

export function PromoCodeForm({ visible, onClose, onApply, loading }: PromoCodeFormProps) {
  const [validatedCode, setValidatedCode] = useState<PromoCode | null>(null);
  const validatePromoCode = useValidatePromoCode();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PromoCodeFormData>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const codeValue = watch('code');

  const handleValidate = async (data: PromoCodeFormData) => {
    try {
      const result = await validatePromoCode.mutateAsync(data.code);
      setValidatedCode(result);
    } catch (error) {
      setValidatedCode(null);
    }
  };

  const handleApply = () => {
    if (validatedCode && codeValue) {
      onApply(codeValue, validatedCode);
      reset();
      setValidatedCode(null);
    }
  };

  const handleClose = () => {
    reset();
    setValidatedCode(null);
    onClose();
  };

  const getDiscountText = (promoCode: PromoCode) => {
    if (promoCode.discount_type === 'percentage') {
      return `${promoCode.discount_value}% off`;
    } else {
      return `$${(promoCode.discount_value / 100).toFixed(2)} off`;
    }
  };

  return (
    <Modal visible={visible} onClose={handleClose} title="Apply Promo Code" variant="bottom-sheet">
      <View className="gap-4">
        <View>
          <Text className="text-base font-medium text-neutral-dark mb-2">
            Promo Code
          </Text>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => {
                  onChange(text.toUpperCase());
                  setValidatedCode(null);
                }}
                placeholder="Enter promo code"
                autoCapitalize="characters"
                className="h-11 px-4 rounded-lg border border-input bg-white text-base text-neutral-dark"
                placeholderTextColor="#9CA3AF"
              />
            )}
          />
          {errors.code && (
            <Text className="text-sm text-error mt-1">{errors.code.message}</Text>
          )}
        </View>

        {validatedCode && (
          <View className="bg-success/10 border border-success/20 p-4 rounded-lg">
            <Text className="text-base font-semibold text-success mb-1">
              ✓ Valid Promo Code
            </Text>
            <Text className="text-small text-neutral-dark">
              {getDiscountText(validatedCode)} discount will be applied
            </Text>
          </View>
        )}

        {validatePromoCode.isError && !validatedCode && codeValue && (
          <View className="bg-error/10 border border-error/20 p-4 rounded-lg">
            <Text className="text-small text-error">
              Invalid or expired promo code
            </Text>
          </View>
        )}

        <View className="flex-row gap-3 mt-2">
          <Button variant="secondary" onPress={handleClose} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          {validatedCode ? (
            <Button
              variant="primary"
              onPress={handleApply}
              className="flex-1"
              loading={loading}
            >
              Apply Code
            </Button>
          ) : (
            <Button
              variant="primary"
              onPress={handleSubmit(handleValidate)}
              className="flex-1"
              loading={validatePromoCode.isPending}
            >
              Validate
            </Button>
          )}
        </View>
      </View>
    </Modal>
  );
}
