import React, { useState } from "react";
import { Copy, Download, Check, Code, Eye } from "lucide-react";

const ExampleOutput: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const sampleCode = `<div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
  <div class="flex items-center space-x-4 mb-4">
    <img class="w-12 h-12 rounded-full" 
         src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=96&h=96" 
         alt="Profile">
    <div>
      <h3 class="font-semibold text-gray-900">John Doe</h3>
      <p class="text-gray-600 text-sm">Product Designer</p>
    </div>
  </div>
  <p class="text-gray-700 mb-4">
    "This tool saved me hours of development time. 
    The generated code is clean and production-ready!"
  </p>
  <div class="flex items-center justify-between">
    <div class="flex space-x-1">
      ${Array(5)
        .fill(0)
        .map(
          (_, i) =>
            `<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>`
        )
        .join("\n      ")}
    </div>
    <span class="text-sm text-gray-500">5.0</span>
  </div>
</div>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sampleCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-component.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="examples" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From screenshot to production-ready code in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Screenshot Side */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                1
              </span>
              Original Screenshot
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <img
                src="https://images.pexels.com/photos/8849292/pexels-photo-8849292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                alt="UI Screenshot Example"
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Code Output Side */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  2
                </span>
                Generated Code
              </h3>

              <div className="flex items-center space-x-2">
                <div className="bg-white border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === "preview"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === "code"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Code className="h-4 w-4 inline mr-1" />
                    Code
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              {activeTab === "preview" ? (
                <div className="p-6">
                  {/* Live Preview */}
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=96&h=96"
                        alt="Profile"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          John Doe
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Product Designer
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      "This tool saved me hours of development time. The
                      generated code is clean and production-ready!"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <span className="text-sm text-gray-500">5.0</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <pre className="p-6 text-sm text-slate-700 bg-slate-50 overflow-x-auto">
                    <code>{sampleCode}</code>
                  </pre>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleCopy}
                      className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Copy code"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-slate-600" />
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="bg-white border border-slate-200 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Download HTML file"
                    >
                      <Download className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                <Download className="h-4 w-4" />
                <span>Download HTML</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleOutput;
