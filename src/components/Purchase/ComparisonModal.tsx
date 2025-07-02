import React, { useEffect } from 'react';
import { X, Star, Check, ArrowRight, Users, TrendingUp, Shield, Phone, Award } from 'lucide-react';
import { Provider } from '../../types/purchase';
import { mockProviders } from '../../data/purchaseData';

interface ComparisonModalProps {
  isOpen: boolean;
  selectedProviders: string[];
  onClose: () => void;
  onSelectProvider: (provider: Provider) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  selectedProviders,
  onClose,
  onSelectProvider
}) => {
  const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!isOpen || compareProviders.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden animate-scale-in"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 p-6 border-b backdrop-blur-md z-10" style={{ 
          backgroundColor: 'var(--color-card)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Provider Comparison
              </h2>
              <p className="font-roboto mt-1 text-lg" style={{ color: 'var(--color-muted)' }}>
                Compare {compareProviders.length} selected providers side by side
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-xl hover:opacity-80 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
              aria-label="Close comparison"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)] custom-scrollbar">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10" style={{ backgroundColor: 'var(--color-card)' }}>
                  <tr className="border-b-2" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="text-left py-6 px-4 font-bold font-poppins text-xl min-w-48" style={{ color: 'var(--color-foreground)' }}>
                      Features
                    </th>
                    {compareProviders.map(provider => (
                      <th key={provider.id} className="text-center py-6 px-4 min-w-72">
                        <div className="flex flex-col items-center space-y-4">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-20 h-20 rounded-full object-cover shadow-lg"
                          />
                          <div>
                            <span className="font-bold font-poppins text-xl block" style={{ color: 'var(--color-foreground)' }}>
                              {provider.name}
                            </span>
                            <div className="flex items-center justify-center space-x-1 mt-2">
                              {renderStars(provider.rating)}
                              <span className="ml-2 font-roboto" style={{ color: 'var(--color-muted)' }}>
                                {provider.rating}
                              </span>
                            </div>
                            <p className="text-sm font-roboto mt-2 max-w-48 mx-auto" style={{ color: 'var(--color-muted)' }}>
                              {provider.description}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Base Premium Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <Award className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Base Premium</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                          <span className="text-3xl font-bold font-poppins block" style={{ color: 'var(--color-primary)' }}>
                            {formatCurrency(provider.basePremium)}
                          </span>
                          <p className="text-sm font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>per year</p>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Cashless Hospitals Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <Users className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Cashless Hospitals</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.cashlessHospitals?.toLocaleString()}+
                        </span>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>network hospitals</p>
                      </td>
                    ))}
                  </tr>

                  {/* Claim Settlement Ratio Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Claim Settlement Ratio</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {provider.features.claimSettlementRatio}%
                          </div>
                          {provider.features.claimSettlementRatio >= 90 && (
                            <Check className="h-5 w-5 text-green-500 ml-2" />
                          )}
                        </div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>settlement rate</p>
                      </td>
                    ))}
                  </tr>

                  {/* Network Coverage Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Network Coverage</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-xl font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.networkSize}
                        </span>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>coverage area</p>
                      </td>
                    ))}
                  </tr>

                  {/* Customer Support Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Customer Support</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-xl font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.customerSupport}
                        </span>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>availability</p>
                      </td>
                    ))}
                  </tr>

                  {/* Key Benefits Row */}
                  <tr className="hover:bg-opacity-50 transition-colors">
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-3">
                        <Check className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <span>Key Benefits</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4">
                        <ul className="space-y-3 text-sm">
                          {provider.keyBenefits.slice(0, 4).map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                {benefit}
                              </span>
                            </li>
                          ))}
                          {provider.keyBenefits.length > 4 && (
                            <li className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                              +{provider.keyBenefits.length - 4} more benefits
                            </li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareProviders.map(provider => (
                  <button
                    key={provider.id}
                    onClick={() => {
                      onSelectProvider(provider);
                      onClose();
                    }}
                    className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>Choose {provider.name}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;