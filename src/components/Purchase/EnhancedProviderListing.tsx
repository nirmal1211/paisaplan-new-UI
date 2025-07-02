import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { 
  Star, Check, ArrowRight, Users, Shield, Phone, ArrowLeft,
  BarChart3, TrendingUp, Award
} from 'lucide-react';
import ComparisonPanel from './ComparisonPanel';
import ComparisonModal from './ComparisonModal';

const EnhancedProviderListing: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleProviderSelect = (providerId: string) => {
    if (selectedProviders.length >= 3 && !selectedProviders.includes(providerId)) {
      alert('You can compare maximum 3 providers');
      return;
    }

    const newSelection = selectedProviders.includes(providerId)
      ? selectedProviders.filter(id => id !== providerId)
      : [...selectedProviders, providerId];
    
    setSelectedProviders(newSelection);
    dispatch({ type: 'SET_SELECTED_PROVIDERS', payload: newSelection });
  };

  const handleProviderDetails = (provider: Provider) => {
    dispatch({ type: 'SET_CURRENT_PROVIDER', payload: provider });
    navigate(`/buy-policy/provider/${provider.id}`);
  };

  const handleRemoveProvider = (providerId: string) => {
    const newSelection = selectedProviders.filter(id => id !== providerId);
    setSelectedProviders(newSelection);
    dispatch({ type: 'SET_SELECTED_PROVIDERS', payload: newSelection });
  };

  const handleClearAll = () => {
    setSelectedProviders([]);
    dispatch({ type: 'SET_SELECTED_PROVIDERS', payload: [] });
  };

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

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm font-roboto hover:opacity-80 transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
            Choose Your Insurance Provider
          </h1>
          <p className="text-xl font-roboto max-w-3xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Compare providers and select the best coverage for your {state.policyType.replace('-', ' ')} policy
          </p>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProviders.map((provider) => (
            <div
              key={provider.id}
              className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 cursor-pointer group ${
                selectedProviders.includes(provider.id) ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: selectedProviders.includes(provider.id) ? 'var(--color-primary)' : 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)',
                height: '400px'
              }}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedProviders.includes(provider.id)}
                      onChange={() => handleProviderSelect(provider.id)}
                      className="w-4 h-4 rounded focus:ring-2"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />

                    {/* Provider Info */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(provider.rating)}
                          <span className="text-xs font-roboto ml-1" style={{ color: 'var(--color-muted)' }}>
                            {provider.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium */}
                  <div className="text-right">
                    <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {formatCurrency(provider.basePremium)}
                    </div>
                    <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      per year
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="flex-1 mb-4">
                  <h4 className="text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                    Key Benefits
                  </h4>
                  <div className="space-y-2">
                    {provider.keyBenefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {benefit.length > 40 ? benefit.substring(0, 40) + '...' : benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Row */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.cashlessHospitals?.toLocaleString()}+
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Hospitals
                    </div>
                  </div>

                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.claimSettlementRatio}%
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Claims
                    </div>
                  </div>

                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.customerSupport}
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Support
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProviderDetails(provider)}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`px-4 py-3 rounded-xl font-medium font-roboto transition-all duration-200 hover:scale-105 ${
                      selectedProviders.includes(provider.id)
                        ? 'text-white'
                        : ''
                    }`}
                    style={{ 
                      backgroundColor: selectedProviders.includes(provider.id) 
                        ? 'var(--color-primary)' 
                        : 'var(--color-secondary)', 
                      color: selectedProviders.includes(provider.id)
                        ? 'white'
                        : 'var(--color-primary)'
                    }}
                  >
                    <BarChart3 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Persistent Comparison Panel */}
        <ComparisonPanel 
          selectedProviders={selectedProviders}
          onRemoveProvider={handleRemoveProvider}
          onClearAll={handleClearAll}
          onCompare={() => setShowComparison(true)}
          onSelectProvider={handleProviderDetails}
        />

        {/* Comparison Modal */}
        <ComparisonModal 
          isOpen={showComparison}
          selectedProviders={selectedProviders}
          onClose={() => setShowComparison(false)}
          onSelectProvider={handleProviderDetails}
        />
      </div>
    </div>
  );
};

export default EnhancedProviderListing;