import React, { useState } from "react";
import { Upload, Sparkles, ArrowRight, Eye, Code } from "lucide-react";
import ImageUpload from "./ImageUpload";
import CodeResults from "./CodeResults";
import LivePreview from "./LivePreview";

const Hero: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{
    html: string;
    css: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null); // Clear any previous errors
    setProgress(0);
    console.log("File selected:", file.name);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setIsProcessing(false);
    setGeneratedCode(null);
    setError(null);
    setProgress(0);
    setShowModal(false);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setProgress(10); // Start progress
    setShowModal(false); // Close modal if open

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      setProgress(30); // Image prepared

      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });

      setProgress(70); // API call complete

      const result = await response.json();

      if (result.success && result.data) {
        setProgress(90); // Processing response
        setGeneratedCode({
          html: result.data.html,
          css: result.data.css,
        });
        setProgress(100); // Complete

        // Small delay to show completion
        setTimeout(() => setProgress(0), 500);
      } else {
        setError(result.error || "Failed to process image. Please try again.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
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
              <button
                onClick={selectedFile ? handleProcessImage : undefined}
                disabled={!selectedFile || isProcessing}
                className="group bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{selectedFile ? "Generate Code" : "Try for Free"}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-2 transition-colors">
                <span>View Examples</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Upload Component */}
          <ImageUpload
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            selectedFile={selectedFile}
            isProcessing={isProcessing}
            progress={progress}
          />

          {/* Error Message */}
          {error && (
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="flex-shrink-0 text-red-400 hover:text-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Live Preview during processing */}
          {(isProcessing || generatedCode) && !error && (
            <div className="mt-12 max-w-4xl mx-auto relative z-10">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-indigo-600" />
                    <span>Live Preview</span>
                    {isProcessing && (
                      <span className="text-sm text-gray-500 font-normal">
                        • Generating...
                      </span>
                    )}
                  </h3>
                </div>
                <div className="p-6">
                  <LivePreview
                    html={generatedCode?.html || ""}
                    isLoading={isProcessing}
                  />
                </div>
                {generatedCode && !isProcessing && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={handleOpenModal}
                        className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        <Code className="h-4 w-4" />
                        <span>View Full Code</span>
                      </button>
                      <button
                        onClick={handleFileRemove}
                        className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        <Upload className="h-4 w-4" />
                        <span>New Upload</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Code Results Modal */}
      {generatedCode && showModal && (
        <CodeResults
          html={generatedCode.html}
          css={generatedCode.css}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Hero;
