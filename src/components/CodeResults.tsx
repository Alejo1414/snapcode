import React, { useState } from "react";
import { Copy, Download, Check, Code, Eye, X } from "lucide-react";
import LivePreview from "./LivePreview";

interface CodeResultsProps {
  html: string;
  css: string;
  onClose: () => void;
}

const CodeResults: React.FC<CodeResultsProps> = ({ html, css, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "html">("html");

  const handleCopyHTML = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Component</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    ${html}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "snapcode-component.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Generated Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("html")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === "html"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Code className="h-4 w-4" />
              <span>HTML</span>
            </button>
            {/* CSS tab commented out since we're only generating Tailwind code (embedded in HTML) */}
            {/* <button
              onClick={() => setActiveTab("css")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === "css"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Code className="h-4 w-4" />
              <span>CSS</span>
            </button> */}
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2 ${
                activeTab === "preview"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Live Preview</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyHTML}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "Copied!" : "Copy HTML"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 180px)" }}
        >
          {activeTab === "html" && (
            <div className="relative">
              <pre className="p-6 text-sm text-purple-600 bg-gray-50 overflow-x-auto font-mono">
                <code>{html}</code>
              </pre>
            </div>
          )}

          {/* CSS content commented out since we're only generating Tailwind code */}
          {/* {activeTab === "css" && (
            <div className="relative">
              <pre className="p-6 text-sm text-gray-700 bg-gray-50 overflow-x-auto">
                <code>{css}</code>
              </pre>
            </div>
          )} */}

          {activeTab === "preview" && (
            <div className="p-6">
              <LivePreview html={html} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeResults;
