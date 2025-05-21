// src/app/product/pricing/page.tsx
"use client";

import { useState } from 'react';
import { Check, HelpCircle, Zap, Award, Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const PricingCard = ({
  title,
  price,
  description,
  features,
  cta,
  popular = false,
  disabled = false
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className={`relative rounded-xl ${popular ? 'border-purple-500 border-2' : 'border border-white/10'} overflow-hidden`}>
      {popular && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium">
          Most Popular
        </div>
      )}
      <div className={`p-6 bg-black/20 ${popular ? 'bg-gradient-to-b from-purple-900/20 to-black/20' : ''}`}>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
          {price !== 'Custom' && <span className="text-gray-400 ml-1">/month</span>}
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link
          href={disabled ? '#' : '/contact'}
          className={`block w-full py-2 px-4 rounded-lg text-center font-medium ${disabled
            ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
            : popular
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
              : 'bg-white/10 text-white hover:bg-white/20'
            } transition-all`}
        >
          {cta}
        </Link>
      </div>
      <div className="p-6 bg-black/10">
        <h4 className="text-sm font-medium text-white mb-4">What's included:</h4>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FeatureComparison = () => {
  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">Compare All Features</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 px-6 text-white font-medium">Feature</th>
              <th className="py-4 px-6 text-white font-medium text-center">Free</th>
              <th className="py-4 px-6 text-white font-medium text-center">Standard</th>
              <th className="py-4 px-6 text-white font-medium text-center">Professional</th>
              <th className="py-4 px-6 text-white font-medium text-center">Enterprise</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">Monthly Image Generation</td>
              <td className="py-4 px-6 text-center">50 images</td>
              <td className="py-4 px-6 text-center">500 images</td>
              <td className="py-4 px-6 text-center">2,000 images</td>
              <td className="py-4 px-6 text-center">Custom</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">Maximum Resolution</td>
              <td className="py-4 px-6 text-center">512×512</td>
              <td className="py-4 px-6 text-center">1024×1024</td>
              <td className="py-4 px-6 text-center">2048×2048</td>
              <td className="py-4 px-6 text-center">4096×4096</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">Style Variations</td>
              <td className="py-4 px-6 text-center">2</td>
              <td className="py-4 px-6 text-center">4</td>
              <td className="py-4 px-6 text-center">All</td>
              <td className="py-4 px-6 text-center">All + Custom</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">History & Storage</td>
              <td className="py-4 px-6 text-center">7 days</td>
              <td className="py-4 px-6 text-center">30 days</td>
              <td className="py-4 px-6 text-center">90 days</td>
              <td className="py-4 px-6 text-center">Unlimited</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">API Access</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">Limited</td>
              <td className="py-4 px-6 text-center">Full Access</td>
              <td className="py-4 px-6 text-center">Priority Access</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">Priority Queue</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">✓</td>
              <td className="py-4 px-6 text-center">✓</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-4 px-6 font-medium">Custom Training (Fine-tuning)</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">❌</td>
              <td className="py-4 px-6 text-center">✓</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium">Support</td>
              <td className="py-4 px-6 text-center">Community</td>
              <td className="py-4 px-6 text-center">Email</td>
              <td className="py-4 px-6 text-center">Priority Email</td>
              <td className="py-4 px-6 text-center">Dedicated Manager</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PricingFAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect immediately. When upgrading, you'll be charged the prorated amount for the remainder of the billing cycle."
    },
    {
      question: "What happens if I exceed my monthly image limit?",
      answer: "If you reach your monthly image generation limit, you'll need to upgrade to a higher tier or wait until your limit refreshes at the start of your next billing cycle. We'll notify you when you're approaching your limit."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a forever free tier with limited features that you can use to test our service. Additionally, new users can try our Standard plan features for 7 days without providing payment information."
    },
    {
      question: "Do unused images roll over to the next month?",
      answer: "No, unused images do not roll over to the next month. Your image quota refreshes at the beginning of each billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoicing and wire transfer options."
    }
  ];

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-black/20 border border-white/10 rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronRight
                className={`w-5 h-5 text-purple-400 transition-transform duration-200 ${expandedFaq === index ? 'rotate-90' : ''
                  }`}
              />
            </button>
            {expandedFaq === index && (
              <div className="px-6 pb-4 text-gray-300">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductPricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Choose the perfect plan for your creative needs. All plans include access to our core image generation technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for hobbyists and casual users just getting started."
          features={[
            "50 images per month",
            "512×512 max resolution",
            "2 style variations",
            "Community support",
            "7 days image history",
            "Web access only"
          ]}
          cta="Get Started Free"
        />

        <PricingCard
          title="Standard"
          price="$15"
          description="For creators who need more power and flexibility."
          features={[
            "500 images per month",
            "1024×1024 max resolution",
            "4 style variations",
            "30 days image history",
            "Limited API access",
            "Email support"
          ]}
          cta="Start Free Trial"
          popular={true}
        />

        <PricingCard
          title="Professional"
          price="$49"
          description="For professionals and businesses with advanced needs."
          features={[
            "2,000 images per month",
            "2048×2048 max resolution",
            "All style variations",
            "90 days image history",
            "Full API access",
            "Priority generation queue",
            "Priority support"
          ]}
          cta="Upgrade to Pro"
        />

        <PricingCard
          title="Enterprise"
          price="Custom"
          description="Custom solutions for large teams and special requirements."
          features={[
            "Custom image volume",
            "Highest resolutions",
            "Custom model training",
            "Unlimited image history",
            "Priority API access",
            "Dedicated account manager",
            "Custom integration support",
            "SLA guarantees"
          ]}
          cta="Contact Sales"
        />
      </div>

      <FeatureComparison />

      <PricingFAQ />

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Need a Custom Solution?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Contact our team to discuss a tailored plan for your organization's specific requirements.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Users className="mr-2 h-5 w-5" />
          Contact Our Sales Team
        </Link>
      </div>
    </div>
  );
}
