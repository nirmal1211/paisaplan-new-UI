import React from 'react';
import { Calendar, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Claim {
  id: string;
  claimNumber: string;
  type: string;
  amount: string;
  status: 'approved' | 'pending' | 'processing' | 'rejected';
  dateSubmitted: string;
  dateProcessed?: string;
  description: string;
}

interface ClaimHistoryMobileProps {
  claims: Claim[];
}

const ClaimHistoryMobile: React.FC<ClaimHistoryMobileProps> = ({ claims }) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="claim-history-container">
      <h2 className="text-lg font-bold mb-medium" style={{ color: 'var(--color-foreground)' }}>
        Claims History
      </h2>
      
      <div className="space-y-3">
        {claims.map((claim) => (
          <div key={claim.id} className="claim-card">
            <div className="claim-card-header">
              <div className="flex items-center justify-between">
                <h3 className="claim-date">{formatDate(claim.dateSubmitted)}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(claim.status)}
                </div>
              </div>
              
              <p className="claim-amount font-semibold" style={{ color: 'var(--color-primary)' }}>
                {claim.amount}
              </p>
              
              <div className={`claim-status ${claim.status}`}>
                {claim.status}
              </div>
            </div>
            
            <div className="claim-details">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>
                {claim.type}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {claim.description}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
                Claim #{claim.claimNumber}
              </p>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button className="touch-button touch-button-primary flex-1">
                View Details
              </button>
              <button className="touch-button touch-button-secondary">
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {claims.length === 0 && (
        <div className="text-center py-8">
          <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center" 
               style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Calendar className="h-6 w-6" style={{ color: 'var(--color-muted)' }} />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
            No Claims Found
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            You haven't filed any claims yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClaimHistoryMobile;