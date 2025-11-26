import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@/navigation/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { usePlans, useCreateSubscription, useSubscription } from '@/hooks/useSubscription';
import { PaymentForm } from '@/components/PaymentForm';
import { PromoCodeForm } from '@/components/PromoCodeForm';
import { SubscriptionConfirmationModal } from '@/components/SubscriptionConfirmationModal';
import type { Plan, PromoCode } from '@/types';
import { toast } from '@/lib/toast';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function PricingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [promoCodeValue, setPromoCodeValue] = useState<string>('');
  const [paymentFormVisible, setPaymentFormVisible] = useState(false);
  const [promoCodeFormVisible, setPromoCodeFormVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    zipCode: string;
  } | null>(null);

  const { data: plans, isLoading: plansLoading } = usePlans();
  const { data: currentSubscription } = useSubscription();
  const createSubscription = useCreateSubscription();

  const formatPrice = (cents: number, interval: 'month' | 'year') => {
    const amount = cents / 100;
    if (interval === 'year') {
      return {
        monthly: `$${(amount / 12).toFixed(2)}`,
        annual: `$${amount.toFixed(2)}`,
        period: '/year',
      };
    }
    return {
      monthly: `$${amount.toFixed(2)}`,
      annual: `$${(amount * 12).toFixed(2)}`,
      period: '/month',
    };
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    if (currentSubscription?.status === 'active') {
      // If user has active subscription, show upgrade/downgrade flow
      toast.info('You can upgrade or downgrade from your subscription settings');
      navigation.goBack();
      return;
    }
    // Show payment form or confirmation if payment method exists
    if (paymentMethod) {
      setConfirmationVisible(true);
    } else {
      setPaymentFormVisible(true);
    }
  };

  const handlePaymentSubmit = (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    zipCode: string;
  }) => {
    setPaymentMethod(data);
    setPaymentFormVisible(false);
    if (selectedPlan) {
      setConfirmationVisible(true);
    }
  };

  const handlePromoCodeApply = (code: string, validatedCode: PromoCode) => {
    setPromoCodeValue(code);
    setPromoCode(validatedCode);
    setPromoCodeFormVisible(false);
    toast.success('Promo code applied');
  };

  const handleConfirmSubscription = async () => {
    if (!selectedPlan || !paymentMethod) return;

    try {
      // In a real app, you'd create a payment method token via Stripe
      // For now, we'll simulate it
      const paymentToken = 'pm_token_placeholder'; // Replace with actual Stripe token

      await createSubscription.mutateAsync({
        plan_id: selectedPlan.id,
        promo_code: promoCodeValue || undefined,
        payment_method_id: paymentToken,
        start_trial: selectedPlan.trial_period_days ? true : false,
      });

      setConfirmationVisible(false);
      setSelectedPlan(null);
      setPromoCode(null);
      setPromoCodeValue('');
      navigation.goBack();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const popularPlan = plans?.find((p) => p.popular);

  return (
    <SafeAreaView className="flex-1 bg-neutral-light" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 pt-6">
          <Text className="text-h1 text-neutral-dark font-semibold mb-2">
            Choose Your Plan
          </Text>
          <Text className="text-body text-neutral-dark opacity-70 mb-6">
            Select the plan that works best for you. All plans include a free trial.
          </Text>

          {plansLoading ? (
            <View className="gap-4">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </View>
          ) : (
            <View className="gap-4">
              {plans?.map((plan) => {
                const price = formatPrice(plan.price, plan.interval);
                const isPopular = plan.popular;
                const isCurrentPlan =
                  currentSubscription?.plan === plan.plan_type &&
                  currentSubscription?.status === 'active';

                return (
                  <Card
                    key={plan.id}
                    className={`relative ${isPopular ? 'border-2 border-primary' : ''}`}
                  >
                    {isPopular && (
                      <View className="absolute -top-3 left-0 right-0 items-center">
                        <View className="bg-primary px-4 py-1 rounded-full">
                          <Text className="text-small text-white font-semibold">Most Popular</Text>
                        </View>
                      </View>
                    )}

                    <View className="mb-4">
                      <View className="flex-row items-baseline justify-between mb-2">
                        <Text className="text-h2 text-neutral-dark font-semibold">
                          {plan.name}
                        </Text>
                        {isCurrentPlan && (
                          <View className="bg-success/10 px-3 py-1 rounded-full">
                            <Text className="text-small text-success font-medium">Current Plan</Text>
                          </View>
                        )}
                      </View>
                      <View className="flex-row items-baseline gap-2">
                        <Text className="text-3xl font-bold text-primary">
                          {price.monthly}
                        </Text>
                        <Text className="text-body text-neutral-dark opacity-70">
                          {price.period}
                        </Text>
                      </View>
                      {plan.interval === 'year' && (
                        <Text className="text-small text-success mt-1">
                          Save ${((plan.price * 12) / 100 - plan.price / 100).toFixed(2)} per year
                        </Text>
                      )}
                    </View>

                    <View className="mb-6">
                      {plan.features.map((feature, index) => (
                        <View key={index} className="flex-row items-start mb-3">
                          <Text className="text-success mr-2 mt-1">✓</Text>
                          <Text className="text-body text-neutral-dark flex-1">{feature}</Text>
                        </View>
                      ))}
                    </View>

                    {plan.trial_period_days && (
                      <View className="bg-accent/10 border border-accent/20 p-3 rounded-lg mb-4">
                        <Text className="text-small text-neutral-dark text-center">
                          <Text className="font-semibold">{plan.trial_period_days}-day free trial</Text>
                          {' '}• Cancel anytime
                        </Text>
                      </View>
                    )}

                    {isCurrentPlan ? (
                      <Button variant="secondary" disabled onPress={() => {}}>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant={isPopular ? 'primary' : 'secondary'}
                        onPress={() => handleSelectPlan(plan)}
                        className="w-full"
                      >
                        {currentSubscription ? 'Switch to This Plan' : 'Get Started'}
                      </Button>
                    )}
                  </Card>
                );
              })}
            </View>
          )}

          {/* Promo Code Section */}
          <Card className="mt-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-neutral-dark mb-1">
                  Have a promo code?
                </Text>
                {promoCode ? (
                  <Text className="text-small text-success">
                    {promoCodeValue} applied
                  </Text>
                ) : (
                  <Text className="text-small text-neutral-dark opacity-70">
                    Enter a code to get a discount
                  </Text>
                )}
              </View>
              <Button
                variant="minimal"
                onPress={() => setPromoCodeFormVisible(true)}
                size="small"
              >
                {promoCode ? 'Change' : 'Apply'}
              </Button>
            </View>
          </Card>

          {/* FAQ Section */}
          <View className="mt-8">
            <Text className="text-h2 text-neutral-dark font-semibold mb-4">
              Frequently Asked Questions
            </Text>
            <View className="gap-4">
              <Card>
                <Text className="text-base font-semibold text-neutral-dark mb-2">
                  Can I change plans later?
                </Text>
                <Text className="text-body text-neutral-dark opacity-70">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be
                  prorated and reflected in your next billing cycle.
                </Text>
              </Card>
              <Card>
                <Text className="text-base font-semibold text-neutral-dark mb-2">
                  What happens after the trial?
                </Text>
                <Text className="text-body text-neutral-dark opacity-70">
                  After your free trial ends, your subscription will automatically continue
                  unless you cancel. You can cancel anytime from your account settings.
                </Text>
              </Card>
              <Card>
                <Text className="text-base font-semibold text-neutral-dark mb-2">
                  Is my payment secure?
                </Text>
                <Text className="text-body text-neutral-dark opacity-70">
                  Yes, all payments are processed securely through Stripe. We never store your
                  full card details.
                </Text>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <PaymentForm
        visible={paymentFormVisible}
        onClose={() => {
          setPaymentFormVisible(false);
          if (!paymentMethod) {
            setSelectedPlan(null);
          }
        }}
        onSubmit={handlePaymentSubmit}
        loading={createSubscription.isPending}
      />

      <PromoCodeForm
        visible={promoCodeFormVisible}
        onClose={() => setPromoCodeFormVisible(false)}
        onApply={handlePromoCodeApply}
        loading={createSubscription.isPending}
      />

      <SubscriptionConfirmationModal
        visible={confirmationVisible}
        onClose={() => {
          setConfirmationVisible(false);
          setSelectedPlan(null);
        }}
        onConfirm={handleConfirmSubscription}
        plan={selectedPlan}
        promoCode={promoCode}
        loading={createSubscription.isPending}
      />
    </SafeAreaView>
  );
}
