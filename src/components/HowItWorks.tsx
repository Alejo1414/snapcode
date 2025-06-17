import React from "react";
import { Upload, Zap, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Screenshot",
    description:
      "Drop any UI screenshot from your design tools, browser, or mobile app",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "AI Processing",
    description:
      "Our AI analyzes the design and generates clean, semantic Tailwind CSS code",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Download,
    title: "Get Your Code",
    description:
      "Copy the generated HTML or download a complete file ready for production",
    color: "from-purple-500 to-pink-500",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your designs into code in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-200`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full px-6 py-3">
            <Zap className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">
              Average processing time: 3-5 seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
