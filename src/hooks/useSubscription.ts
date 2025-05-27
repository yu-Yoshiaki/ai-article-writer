import { useCallback } from 'react';
import useSWR from 'swr';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../components/auth/AuthProvider';
import { fetcher } from '@/lib/fetcher';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

interface SubscriptionData {
  planId: string | null;
  planName: string | null;
  status: 'active' | 'inactive' | 'cancelled';
  currentPeriodEnd: Date | null;
}

export function useSubscription() {
  const { user } = useAuth();
  
  // SWR for fetching subscription status
  const { data: subscription, error, isLoading, mutate } = useSWR<SubscriptionData>(
    user ? `/api/subscription/${user.uid}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 60000, // Refresh every minute
    }
  );

  const subscribe = useCallback(async (priceId: string) => {
    try {
      const stripe = await stripePromise;
      if (!stripe || !user) return;

      // Create checkout session through your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error initiating subscription:', error);
      throw error;
    }
  }, [user]);
  
  const cancelSubscription = useCallback(async () => {
    if (!user || !subscription?.planId) return;
    
    try {
      const response = await fetch(`/api/subscription/${user.uid}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }
      
      // Revalidate subscription data
      await mutate();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }, [user, subscription, mutate]);

  return {
    currentPlan: subscription?.planId || null,
    planName: subscription?.planName || null,
    subscriptionStatus: subscription?.status || 'inactive',
    currentPeriodEnd: subscription?.currentPeriodEnd,
    loading: isLoading,
    error,
    subscribe,
    cancelSubscription,
    refetch: mutate,
  };
}