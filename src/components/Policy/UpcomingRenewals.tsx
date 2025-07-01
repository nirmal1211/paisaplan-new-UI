import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Calendar, CreditCard, Bell, ChevronRight } from 'lucide-react';
import { RenewalItem } from '../../types/policy';
import { mockRenewals } from '../../data/mockData';

const UpcomingRenewals: React.FC = () => {
  const [renewals, setRenewals] = useState<RenewalItem[]>([]);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setRenewals(mockRenewals.slice(0, 3));
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeLeft: { [key: string]: string } = {};
      renewals.forEach(renewal => {
        const now = new Date();
        const renewalDate = new Date(renewal.renewalDate);
        const diff = renewalDate.getTime() - now.getTime();
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          newTimeLeft[renewal.id] = `${days}d ${hours}h`;
        } else {
          newTimeLeft[renewal.id] = 'Expired';
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [renewals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'normal': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'normal': return <Calendar className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateSavings = (renewal: RenewalItem) => {
    const bestOption = renewal.paymentOptions.reduce((best, option) => 
      (option.discount || 0) > (best.discount || 0) ? option : best
    );
    return bestOption.discount ? (renewal.newPremium * bestOption.discount / 100) : 0;
  };

  return (
    <div className="rounded-xl shadow-lg border" style={{ 
      backgroundColor: 'var(--color-card)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Clock className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Upcoming Renewals
              </h2>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                {renewals.length} policies need attention
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-sm font-medium font-roboto hover:opacity-80 transition-opacity" 
                  style={{ color: 'var(--color-primary)' }}>
            <span>View All Renewals</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {renewals.map((renewal) => (
          <div key={renewal.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow" 
               style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getStatusIcon(renewal.status)}
                  <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {renewal.type}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(renewal.status)}`}>
                    {renewal.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {renewal.policyNumber} • {renewal.provider}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {timeLeft[renewal.id] || 'Loading...'}
                </div>
                <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                  until renewal
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Current Premium</p>
                <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(renewal.currentPremium)}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>New Premium</p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(renewal.newPremium)}
                  </p>
                  {calculateSavings(renewal) > 0 && (
                    <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                      Save ₹{calculateSavings(renewal)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm font-roboto hover:opacity-80 transition-opacity" 
                        style={{ color: 'var(--color-muted)' }}>
                  <Bell className="h-4 w-4" />
                  <span>Reminders</span>
                </button>
                <button className="flex items-center space-x-1 text-sm font-roboto hover:opacity-80 transition-opacity" 
                        style={{ color: 'var(--color-muted)' }}>
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Options</span>
                </button>
              </div>
              <button className="px-4 py-2 rounded-lg font-semibold font-roboto text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: 'var(--color-primary)' }}>
                Quick Renew
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingRenewals;