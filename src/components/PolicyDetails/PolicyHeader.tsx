import React from 'react';
import { ArrowLeft, Download, Share2, Printer, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PolicyHeaderProps {
  policyNumber: string;
  provider: string;
  status: string;
  onDownload: () => void;
  onShare: () => void;
  onPrint: () => void;
}

const PolicyHeader: React.FC<PolicyHeaderProps> = ({
  policyNumber,
  provider,
  status,
  onDownload,
  onShare,
  onPrint
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPolicyNumber = async () => {
    try {
      await navigator.clipboard.writeText(policyNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy policy number:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ 
      backgroundColor: 'var(--color-background)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Breadcrumb and Back Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/my-policy"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-primary)'
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm font-roboto">
             
              <Link to="/my-policy" className="hover:underline" style={{ color: 'var(--color-muted)' }}>
                My Policies
              </Link>
              <span style={{ color: 'var(--color-muted)' }}>/</span>
              <span style={{ color: 'var(--color-foreground)' }}>Policy Details</span>
            </nav>
          </div>

          {/* Policy Info and Actions */}
          <div className="flex items-center space-x-6">
            {/* Policy Number with Copy */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Policy:
              </span>
              <div className="flex items-center space-x-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {policyNumber}
                </span>
                <button
                  onClick={copyPolicyNumber}
                  className="p-1 rounded hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-primary)' }}
                  title="Copy policy number"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
              {status}
            </span>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onDownload}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
                title="Download Policy"
              >
                <Download className="h-5 w-5" />
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyHeader;