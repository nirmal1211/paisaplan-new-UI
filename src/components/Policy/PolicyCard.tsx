import React from 'react';
import { Calendar, Shield, DollarSign, Eye, Download } from 'lucide-react';
import { Policy } from '../../types/policy';

interface PolicyCardProps {
  policy: Policy;
  onSelect: (policyNumber: string) => void;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExpiryColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days < 30) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div 
      className="rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      onClick={() => onSelect(policy.policyNumber)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(policy.policyNumber);
        }
      }}
      aria-label={`Policy ${policy.policyNumber} details`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.type} Insurance
            </h3>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              {policy.provider}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(policy.status)}`}>
          {policy.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Policy Number
          </span>
          <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
            {policy.policyNumber}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Validity Period
          </span>
          <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
            {policy.validFrom} to {policy.validTo}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Sum Insured
          </span>
          <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
            {policy.sumInsured}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Premium
          </span>
          <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
            {policy.premium}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Expiry
          </span>
          <span className={`font-semibold font-roboto ${getExpiryColor(policy.expiryDays)}`}>
            {policy.expiryDays > 0 ? `${policy.expiryDays} days` : 'Expired'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle view action
            }}
            aria-label="View policy details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle download action
            }}
            aria-label="Download policy document"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        
        {policy.status === 'Active' && policy.expiryDays < 60 && (
          <button 
            className="px-4 py-2 rounded-lg font-semibold font-roboto text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle renew action
            }}
          >
            Renew
          </button>
        )}
      </div>
    </div>
  );
};

export default PolicyCard;