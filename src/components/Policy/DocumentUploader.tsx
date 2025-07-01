import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploaderProps {
  onUploadDocument: (file: File) => Promise<void>;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUploadDocument }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const maxSize = 5; // MB

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedTypes.includes(fileExtension);
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      alert('Please select valid files (PDF, JPG, PNG) under 5MB');
      return;
    }

    setUploading(true);
    try {
      for (const file of validFiles) {
        await onUploadDocument(file);
        setUploadedFiles(prev => [...prev, file]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="rounded-xl shadow-lg border h-full" style={{ 
      backgroundColor: 'var(--color-card)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Upload Policy Document
        </h3>
        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
          Upload your policy documents securely
        </p>
      </div>

      <div className="p-4">
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 mb-4 ${
            dragActive 
              ? 'border-opacity-100' 
              : 'hover:border-opacity-80'
          }`}
          style={{
            borderColor: dragActive ? 'var(--color-primary)' : 'var(--color-border)',
            backgroundColor: dragActive ? 'var(--color-secondary)' : 'transparent'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
          
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full mb-2" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Upload className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            
            <p className="font-roboto text-sm mb-2" style={{ color: 'var(--color-muted)' }}>
              {uploading ? 'Uploading...' : 'Drag files here or'}{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-medium underline hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
                disabled={uploading}
              >
                browse
              </button>
            </p>
            
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              <p>Supported: {acceptedTypes.join(', ')}</p>
              <p>Max size: {maxSize}MB</p>
            </div>
          </div>
        </div>

        {/* Uploaded files list */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
              Uploaded Files:
            </h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg" 
                   style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {file.name}
                    </p>
                    <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="hover:text-red-500 transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;