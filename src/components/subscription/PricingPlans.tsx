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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-slate-300">
          Unlock the full potential of AI-powered article writing
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="mystical-card p-6 space-y-6 relative overflow-hidden"
          >
            {plan.id === 'pro' && (
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
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
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={!user || currentPlan === plan.id}
              className={`w-full mystical-button ${
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