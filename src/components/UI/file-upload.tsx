import React, { useRef, useState } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  maxSize = 10,
  multiple = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      const isValidType = acceptedTypes.includes(fileExtension);
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      return isValidType && isValidSize;
    });

    setUploadedFiles((prev) =>
      multiple ? [...prev, ...validFiles] : validFiles,
    );
    onFileSelect?.(validFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
          dragActive ? "border-opacity-100" : "hover:border-opacity-80"
        }`}
        style={{
          borderColor: dragActive
            ? "var(--color-primary)"
            : "var(--color-border)",
          backgroundColor: dragActive
            ? "var(--color-secondary)"
            : "transparent",
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(",")}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <div
            className="p-3 rounded-full mb-3"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <Upload
              className="h-5 w-5"
              style={{ color: "var(--color-primary)" }}
            />
          </div>

          <h3
            className="text-base font-semibold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Upload Policy Documents
          </h3>

          <p
            className="font-roboto text-sm mb-3"
            style={{ color: "var(--color-muted)" }}
          >
            Drag and drop your files here, or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="font-medium underline hover:opacity-80"
              style={{ color: "var(--color-primary)" }}
            >
              browse
            </button>
          </p>

          <div
            className="text-xs font-roboto"
            style={{ color: "var(--color-muted)" }}
          >
            <p>Supported formats: {acceptedTypes.join(", ")}</p>
            <p>Maximum file size: {maxSize}MB</p>
          </div>
        </div>
      </div>

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 space-y-2">
          <h4
            className="text-sm font-semibold font-roboto"
            style={{ color: "var(--color-foreground)" }}
          >
            Uploaded Files:
          </h4>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <File className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p
                    className="text-sm font-medium font-roboto"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {file.name}
                  </p>
                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <button
                  onClick={() => removeFile(index)}
                  className="hover:text-red-500 transition-colors"
                  style={{ color: "var(--color-muted)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
