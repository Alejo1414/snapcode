import React, { useEffect, useRef, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";

interface LivePreviewProps {
  html: string;
  isLoading?: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  html,
  isLoading = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(400);

  // Create the complete HTML document with Tailwind CSS
  const createPreviewDocument = (bodyContent: string): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
        }
        
        /* Ensure components have proper spacing */
        body > * {
            margin-bottom: 1.5rem;
        }
        
        body > *:last-child {
            margin-bottom: 0;
        }
        
        /* Style for interactive elements in preview mode */
        button, [role="button"], .btn {
            cursor: pointer;
        }
        
        /* Disable pointer events on problematic elements */
        a[href="#"], a[href=""], a:not([href]) {
            pointer-events: none;
            color: inherit;
            text-decoration: none;
        }
    </style>
</head>
<body>
    ${bodyContent}
    
    <script>
        // Prevent navigation and form submission in preview
        document.addEventListener('DOMContentLoaded', function() {
            // Prevent all form submissions
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log('Form submission prevented in preview mode');
                });
            });
            
            // Prevent navigation on links
            document.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Link navigation prevented in preview mode');
                });
            });
            
            // Handle button clicks safely
            document.querySelectorAll('button, [role="button"]').forEach(button => {
                button.addEventListener('click', function(e) {
                    // Allow the click for styling purposes but prevent any navigation
                    e.preventDefault();
                    console.log('Button clicked in preview mode');
                    
                    // Add a visual feedback for button clicks
                    const originalBg = this.style.backgroundColor;
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 100);
                });
            });
            
            // Prevent page unload
            window.addEventListener('beforeunload', function(e) {
                e.preventDefault();
                return false;
            });
        });
        
        // Auto-resize functionality
        function updateHeight() {
            const height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            window.parent.postMessage({ type: 'resize', height: height + 40 }, '*');
        }
        
        // Initial resize
        setTimeout(updateHeight, 100);
        
        // Resize on content changes
        if (window.MutationObserver) {
            const observer = new MutationObserver(updateHeight);
            observer.observe(document.body, { 
                childList: true, 
                subtree: true, 
                attributes: true 
            });
        }
        
        // Auto-resize on window events
        window.addEventListener('load', updateHeight);
        window.addEventListener('resize', updateHeight);
        
        // Resize when images load
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', updateHeight);
            img.addEventListener('error', updateHeight);
        });
    </script>
</body>
</html>`;
  };

  // Listen for resize messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "resize") {
        const newHeight = Math.min(Math.max(event.data.height, 200), 800);
        setIframeHeight(newHeight);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Update iframe content when HTML changes
  useEffect(() => {
    if (iframeRef.current && html && !isLoading) {
      const iframe = iframeRef.current;
      const doc = createPreviewDocument(html);

      // Write content to iframe
      iframe.srcdoc = doc;

      // Reset height for new content
      setIframeHeight(400);
    }
  }, [html, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span>Test your code live</span>
          </h4>
        </div>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <div className="absolute inset-0 h-8 w-8 border-2 border-indigo-200 rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Generating your component
              </p>
              <p className="text-xs text-gray-600">
                Creating live preview with Tailwind CSS...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!html || html.trim() === "") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Test your code live</span>
          </h4>
        </div>
        <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready for preview
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Upload a UI screenshot to see your generated component rendered
              live with Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Test your code live</span>
          </h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <ExternalLink className="h-3 w-3" />
              <span>Tailwind CSS</span>
            </div>
            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
              Demo Mode
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Iframe */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
        <iframe
          ref={iframeRef}
          className="w-full border-0 bg-white"
          style={{ height: `${iframeHeight}px` }}
          sandbox="allow-scripts allow-same-origin"
          title="Live Code Preview"
        />

        {/* Resize indicator */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
          {iframeHeight}px
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Live preview • Auto-resized to content • Powered by Tailwind CSS CDN
        </p>
      </div>
    </div>
  );
};

export default LivePreview;
