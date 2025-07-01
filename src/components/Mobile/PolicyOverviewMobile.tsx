import React from 'react';
import { Shield, User, Calendar, DollarSign, Copy, Check } from 'lucide-react';

interface PolicyOverviewMobileProps {
  policyholderName: string;
  policyNumber: string;
  provider: string;
  type: string;
  sumInsured: string;
  premium: string;
  validFrom: string;
  validTo: string;
  status: string;
}

const PolicyOverviewMobile: React.FC<PolicyOverviewMobileProps> = ({
  policyholderName,
  policyNumber,
  provider,
  type,
  sumInsured,
  premium,
  validFrom,
  validTo,
  status
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
    <div className="policy-overview-container">
      <div className="policy-overview-content">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="policyholder-name">{policyholderName}</h1>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              {type} Insurance • {provider}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Policy Number Section */}
        <div className="policy-section">
          <div className="flex items-center justify-between p-3 rounded-lg" 
               style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-muted)' }}>
                Policy Number
              </p>
              <p className="policy-number font-semibold" style={{ color: 'var(--color-foreground)' }}>
                {policyNumber}
              </p>
            </div>
            <button
              onClick={copyPolicyNumber}
              className="touch-button touch-button-secondary p-2"
              title="Copy policy number"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="policy-section">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                  Sum Insured
                </span>
              </div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                {sumInsured}
              </p>
            </div>
            
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                  Premium
                </span>
              </div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
                {premium}
              </p>
            </div>
          </div>
        </div>

        {/* Validity Period */}
        <div className="policy-section">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
              Policy Validity
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>From</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  {formatDate(validFrom)}
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-0.5" style={{ backgroundColor: 'var(--color-border)' }}></div>
              </div>
              <div className="text-right">
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>To</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  {formatDate(validTo)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="policy-section">
          <div className="grid grid-cols-2 gap-3">
            <button className="touch-button touch-button-primary">
              Renew Policy
            </button>
            <button className="touch-button touch-button-secondary">
              File Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyOverviewMobile;