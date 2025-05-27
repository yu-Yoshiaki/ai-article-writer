import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { useSubscription } from '../../hooks/useSubscription';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Up to 5 articles per month',
      'Basic AI assistance',
      'Standard templates'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 9.99,
    features: [
      'Unlimited articles',
      'Advanced AI assistance',
      'Premium templates',
      'Priority support',
      'SEO optimization tools'
    ]
  }
];

export function PricingPlans() {
  const { user } = useAuth();
  const { currentPlan, subscribe } = useSubscription();

  const handleSubscribe = async (planId: string) => {
    if (!user) return;
    await subscribe(planId);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-slate-300">
          Unlock the full potential of AI-powered article writing
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="mystical-card relative space-y-6 overflow-hidden p-6"
          >
            {plan.id === 'pro' && (
              <div className="absolute right-4 top-4">
                <Sparkles className="size-6 text-purple-400" />
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
              <div className="text-3xl font-bold text-purple-400">
                ${plan.price}
                <span className="text-base font-normal text-slate-400">/month</span>
              </div>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="size-5 text-green-400" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={!user || currentPlan === plan.id}
              className={`mystical-button w-full ${
                currentPlan === plan.id
                  ? 'bg-green-600 hover:bg-green-700'
                  : ''
              }`}
            >
              {currentPlan === plan.id ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}