import React, { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  isProcessing?: boolean;
  progress?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  isProcessing = false,
  progress = 0,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File validation
  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a PNG, JPG, or WebP image file.";
    }

    if (file.size > maxSize) {
      return "File size must be less than 10MB.";
    }

    return null;
  };

  // Compress image for faster upload
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 1024px on longest side)
        const maxSize = 1024;
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // Fallback to original
            }
          },
          "image/jpeg",
          0.85 // Quality
        );
      };

      img.onerror = () => resolve(file); // Fallback to original
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle file selection
  const handleFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);

      // Compress image on client side for faster upload
      const compressedFile = await compressImage(file);
      onFileSelect(compressedFile);

      // Create preview URL from original file for better quality preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    },
    [onFileSelect]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // File input handler
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // Remove file handler
  const handleRemoveFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
    onFileRemove();

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl, onFileRemove]);

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative bg-white rounded-2xl shadow-xl border-2 border-dashed transition-all duration-200 ${
          isDragOver
            ? "border-indigo-400 bg-indigo-50"
            : error
              ? "border-red-400 bg-red-50"
              : "border-gray-200"
        } ${isProcessing ? "pointer-events-none opacity-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile && previewUrl ? (
          // File preview state
          <div className="p-6">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              {!isProcessing && (
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                <span className="font-medium">{selectedFile.name}</span>
                <span className="text-slate-400 ml-2">
                  ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </p>
              {isProcessing && (
                <div className="mt-3">
                  <div className="inline-flex items-center space-x-2 text-indigo-600 mb-2">
                    <div className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm font-medium">
                      Processing your image...
                    </span>
                  </div>
                  {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Upload prompt state
          <div className="p-12 text-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Drop your screenshot here
            </h3>
            <p className="text-slate-600 mb-6">
              Or click to browse your files • PNG, JPG, WebP up to 10MB
            </p>
            <button
              onClick={openFilePicker}
              disabled={isProcessing}
              className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose File
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Info text */}
      <div className="text-center mt-6 text-sm text-slate-500">
        ✨ No signup required • Free tier includes 5 conversions per month
      </div>
    </div>
  );
};

export default ImageUpload;
