import React, { useState, useCallback } from 'react';
import { FileText, Download, Eye, X, AlertCircle } from 'lucide-react';

interface Document {
  name: string;
  type: string;
  url: string;
  size: string;
}

interface DocumentPreviewProps {
  documents: Document[];
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentView = useCallback(async (document: Document) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate document loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedDocument(document);
    } catch (err) {
      setError('Failed to load document');
      console.error('Error loading document:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDocumentDownload = useCallback(async (document: Document) => {
    try {
      // Simulate download
      console.log('Downloading document:', document.name);
      
      // In a real app, you would fetch the document and trigger download
      const link = document.createElement('a');
      link.href = document.url;
      link.download = document.name;
      link.click();
    } catch (err) {
      console.error('Error downloading document:', err);
    }
  }, []);

  const closePreview = useCallback(() => {
    setSelectedDocument(null);
    setError(null);
  }, []);

  return (
    <>
      <div className="space-y-4">
        {documents.map((document, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{document.name}</p>
                <p className="text-sm text-gray-500">{document.type} • {document.size}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDocumentView(document)}
                disabled={isLoading}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                aria-label={`View ${document.name}`}
              >
                <Eye className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleDocumentDownload(document)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label={`Download ${document.name}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
              <button
                onClick={closePreview}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 h-96 overflow-auto">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Failed to load document</h4>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={() => handleDocumentView(selectedDocument)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Document preview would appear here</p>
                    <button
                      onClick={() => handleDocumentDownload(selectedDocument)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-900">Loading document...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentPreview;