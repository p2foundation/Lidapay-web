"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Shield, Crown } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals",
      features: [
        "Send up to $100/month",
        "50+ countries",
        "Email support",
        "Basic rewards",
        "Mobile app access"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Best for frequent users",
      features: [
        "Send up to $1,000/month",
        "150+ countries",
        "Priority support",
        "2x rewards points",
        "Advanced analytics",
        "API access"
      ],
      highlighted: true
    },
    {
      name: "Business",
      price: "$49.99",
      period: "/month",
      description: "For teams and businesses",
      features: [
        "Unlimited transactions",
        "All countries",
        "Dedicated support",
        "5x rewards points",
        "White-label options",
        "Bulk sending",
        "Custom integrations"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-brand-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-brand-700 dark:text-brand-300">
            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            Simple, transparent pricing
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 px-2">
            Choose Your Plan
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 px-4">
            Start free and upgrade as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-brand-500 to-indigoBrand-600 text-white shadow-2xl"
                  : "bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-zinc-200/60 dark:ring-zinc-800"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold backdrop-blur-sm">
                    <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <h3 className={`text-xl sm:text-2xl font-bold ${plan.highlighted ? "text-white" : "text-zinc-900 dark:text-zinc-50"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1.5 sm:mt-2 text-xs sm:text-sm ${plan.highlighted ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`}>
                  {plan.description}
                </p>
                <div className="mt-4 sm:mt-6">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-black ${plan.highlighted ? "text-white" : "text-zinc-900 dark:text-zinc-50"}`}>
                    {plan.price}
                    <span className={`text-sm sm:text-base md:text-lg ${plan.highlighted ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 sm:gap-3">
                    <Check className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? "text-white" : "text-brand-600"
                    }`} />
                    <span className={`text-xs sm:text-sm ${plan.highlighted ? "text-white/90" : "text-zinc-700 dark:text-zinc-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-6 sm:mt-8 w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                  plan.highlighted
                    ? "bg-white text-zinc-900 hover:bg-zinc-100"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 px-4">
            All plans include secure payments, instant delivery, and 24/7 support
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-brand-600 flex-shrink-0" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-brand-600 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
