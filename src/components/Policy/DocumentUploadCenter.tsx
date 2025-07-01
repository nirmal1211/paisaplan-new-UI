import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Eye, Trash2, FolderOpen, Clock } from 'lucide-react';
import { UploadFile } from '../../types/policy';
import { mockRecentUploads } from '../../data/mockData';

const DocumentUploadCenter: React.FC = () => {
  const [recentUploads, setRecentUploads] = useState<UploadFile[]>(mockRecentUploads);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
  const maxSize = 10; // MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedTypes.includes(fileExtension);
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      return isValidType && isValidSize;
    });

    // Simulate upload process
    validFiles.forEach(file => {
      const newUpload: UploadFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading',
        uploadTime: new Date(),
        errors: []
      };

      setRecentUploads(prev => [newUpload, ...prev]);
      simulateUpload(newUpload.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setRecentUploads(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, progress: 100, status: 'processing', ocrStatus: 'processing' }
            : file
        ));
        
        // Simulate processing completion
        setTimeout(() => {
          setRecentUploads(prev => prev.map(file => 
            file.id === fileId 
              ? { ...file, status: 'completed', ocrStatus: 'completed', category: 'Policy Document' }
              : file
          ));
        }, 2000);
      } else {
        setRecentUploads(prev => prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        ));
      }
    }, 500);
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

  const removeFile = (fileId: string) => {
    setRecentUploads(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (file: UploadFile) => {
    switch (file.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'uploading':
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'uploading': return 'text-blue-600';
      case 'processing': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="rounded-xl shadow-lg border" style={{ 
      backgroundColor: 'var(--color-card)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Upload className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Document Upload Center
            </h2>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Upload and manage your policy documents
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 mb-6 ${
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
          />
          
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full mb-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Upload className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            
            <h3 className="text-lg font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Upload Policy Documents
            </h3>
            
            <p className="font-roboto text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
              Drag and drop your files here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="font-medium underline hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                browse
              </button>
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              <div>
                <p className="font-medium mb-1">Supported formats:</p>
                <p>{acceptedTypes.join(', ')}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Guidelines:</p>
                <p>Max {maxSize}MB • Clear & readable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <FolderOpen className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-semibold font-roboto text-sm" style={{ color: 'var(--color-foreground)' }}>
                Auto-Categorization
              </h4>
            </div>
            <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Documents are automatically sorted by type and policy
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-semibold font-roboto text-sm" style={{ color: 'var(--color-foreground)' }}>
                OCR Processing
              </h4>
            </div>
            <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Text extraction for searchable documents
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              <h4 className="font-semibold font-roboto text-sm" style={{ color: 'var(--color-foreground)' }}>
                Version Control
              </h4>
            </div>
            <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Keep track of document versions and updates
            </p>
          </div>
        </div>

        {/* Recent Uploads */}
        {recentUploads.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
              Recent Uploads
            </h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentUploads.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border" 
                     style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center space-x-3 flex-1">
                    {getStatusIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium font-roboto truncate" style={{ color: 'var(--color-foreground)' }}>
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span className={getStatusColor(file.status)}>
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                        {file.category && (
                          <>
                            <span>•</span>
                            <span>{file.category}</span>
                          </>
                        )}
                      </div>
                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${file.progress}%`,
                                backgroundColor: 'var(--color-primary)'
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {file.errors && file.errors.length > 0 && (
                        <div className="mt-1">
                          {file.errors.map((error, index) => (
                            <p key={index} className="text-xs text-red-600 font-roboto">{error}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' && (
                      <button className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-primary)' }}>
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:opacity-70 transition-opacity" 
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadCenter;