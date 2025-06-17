import React, { useState } from "react";
import { Upload, Sparkles, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:60px_60px] opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              AI-Powered Code Generation
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Turn Screenshots into
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Tailwind Code
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload any UI screenshot and get clean, production-ready Tailwind
            CSS HTML code in seconds. Perfect for developers, designers, and
            anyone building modern web interfaces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Try for Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-2 transition-colors">
              <span>View Examples</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Upload Demo */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`relative bg-white rounded-2xl shadow-xl border-2 border-dashed transition-all duration-200 ${
              isDragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-12 text-center">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Drop your screenshot here
              </h3>
              <p className="text-slate-600 mb-6">
                Or click to browse your files • PNG, JPG up to 10MB
              </p>
              <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                Choose File
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-slate-500">
            ✨ No signup required • Free tier includes 5 conversions per month
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
