import React from "react";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Shot2Code",
    features: [
      "5 conversions per month",
      "Basic HTML + Tailwind output",
      "Copy to clipboard",
      "Standard processing speed",
      "Community support",
    ],
    icon: Zap,
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$10",
    period: "per month",
    description: "For developers who ship fast",
    features: [
      "Unlimited conversions",
      "Advanced HTML + Tailwind output",
      "Download HTML files",
      "Priority processing (2x faster)",
      "Component extraction",
      "Custom CSS variables",
      "Priority email support",
      "API access (coming soon)",
    ],
    icon: Crown,
    cta: "Upgrade to Pro",
    popular: true,
  },
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more power
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
                plan.popular
                  ? "border-indigo-500 ring-4 ring-indigo-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${plan.popular ? "bg-indigo-100" : "bg-slate-100"}`}
                  >
                    <plan.icon
                      className={`h-6 w-6 ${plan.popular ? "text-indigo-600" : "text-slate-600"}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  <p className="text-slate-600 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Need a custom solution for your team?
          </p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-2 mx-auto">
            <span>Contact us for enterprise pricing</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
