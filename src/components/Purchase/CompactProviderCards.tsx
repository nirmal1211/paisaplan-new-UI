import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { 
  Star, Check, ArrowRight, Users, Shield, Phone, ArrowLeft,
  X, BarChart3, ChevronLeft, ChevronRight, TrendingUp, Award
} from 'lucide-react';

const CompactProviderCards: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonExpanded, setComparisonExpanded] = useState(false);

  const handleProviderSelect = (providerId: string) => {
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
        className={`h-3 w-3 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Fixed Comparison Panel Component
  const ComparisonPanel = () => {
    const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));
    
    if (selectedProviders.length === 0) return null;

    return (
      <div className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        comparisonExpanded ? 'w-80' : 'w-16'
      }`}>
        <div className="rounded-r-2xl shadow-2xl overflow-hidden border-r-2" style={{ 
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-primary)'
        }}>
          {/* Toggle Button */}
          <button
            onClick={() => setComparisonExpanded(!comparisonExpanded)}
            className="w-full p-4 flex items-center justify-center transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            {comparisonExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <div className="flex flex-col items-center">
                <BarChart3 className="h-5 w-5 mb-1" />
                <span className="text-xs font-bold">{selectedProviders.length}</span>
              </div>
            )}
          </button>

          {/* Expanded Content */}
          {comparisonExpanded && (
            <div className="p-4 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold font-poppins text-lg" style={{ color: 'var(--color-foreground)' }}>
                  Compare ({selectedProviders.length})
                </h3>
                <button
                  onClick={() => setSelectedProviders([])}
                  className="p-1 rounded-lg hover:opacity-80 transition-colors"
                  style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                {compareProviders.map(provider => (
                  <div key={provider.id} className="flex items-center space-x-3 p-3 rounded-xl hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-poppins truncate" style={{ color: 'var(--color-foreground)' }}>
                        {provider.name}
                      </p>
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(provider.rating)}
                        <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {provider.rating}
                        </span>
                      </div>
                      <p className="text-xs font-roboto font-semibold" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(provider.basePremium)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleProviderSelect(provider.id)}
                      className="p-1 rounded-lg hover:opacity-80 transition-colors"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowComparison(true)}
                disabled={selectedProviders.length < 2}
                className="w-full py-3 px-4 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Compare All ({selectedProviders.length})
              </button>

              <p className="text-xs font-roboto text-center mt-2" style={{ color: 'var(--color-muted)' }}>
                Select 2+ providers to compare
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Full-Width Comparison Modal
  const ComparisonModal = () => {
    const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));
    
    if (!showComparison || compareProviders.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
          {/* Sticky Header */}
          <div className="sticky top-0 p-6 border-b backdrop-blur-md" style={{ 
            backgroundColor: 'var(--color-card)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Provider Comparison
                </h2>
                <p className="font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                  Compare {compareProviders.length} selected providers side by side
                </p>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="p-3 rounded-xl hover:opacity-80 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0" style={{ backgroundColor: 'var(--color-card)' }}>
                  <tr className="border-b-2" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="text-left py-6 px-4 font-bold font-poppins text-lg" style={{ color: 'var(--color-foreground)' }}>
                      Features
                    </th>
                    {compareProviders.map(provider => (
                      <th key={provider.id} className="text-center py-6 px-4 min-w-64">
                        <div className="flex flex-col items-center space-y-3">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-16 h-16 rounded-full object-cover shadow-lg"
                          />
                          <div>
                            <span className="font-bold font-poppins text-lg block" style={{ color: 'var(--color-foreground)' }}>
                              {provider.name}
                            </span>
                            <div className="flex items-center justify-center space-x-1 mt-1">
                              {renderStars(provider.rating)}
                              <span className="ml-2 font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                                {provider.rating}
                              </span>
                            </div>
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
                      Base Premium
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          {formatCurrency(provider.basePremium)}
                        </span>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>per year</p>
                      </td>
                    ))}
                  </tr>

                  {/* Cashless Hospitals Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                        <span>Cashless Hospitals</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.cashlessHospitals?.toLocaleString()}+
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Claim Settlement Ratio Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                        <span>Claim Settlement Ratio</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.claimSettlementRatio}%
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Network Coverage Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                        <span>Network Coverage</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.networkSize}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Customer Support Row */}
                  <tr className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                        <span>Customer Support</span>
                      </div>
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4 text-center">
                        <span className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.features.customerSupport}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Key Benefits Row */}
                  <tr className="hover:bg-opacity-50 transition-colors">
                    <td className="py-6 px-4 font-semibold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>
                      Key Benefits
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-6 px-4">
                        <ul className="space-y-2 text-sm">
                          {provider.keyBenefits.slice(0, 4).map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                {benefit}
                              </span>
                            </li>
                          ))}
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
                      setShowComparison(false);
                      handleProviderDetails(provider);
                    }}
                    className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>Choose {provider.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

        {/* Compact Provider Cards Grid */}
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
                height: '320px' // Reduced height for compact design
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
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
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

                {/* Key Benefits - Compact */}
                <div className="flex-1 mb-4">
                  <div className="space-y-2">
                    {provider.keyBenefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Check className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {benefit.length > 35 ? benefit.substring(0, 35) + '...' : benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Row - Compact */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                  <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.cashlessHospitals?.toLocaleString()}+
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Hospitals
                    </div>
                  </div>

                  <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.claimSettlementRatio}%
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Claims
                    </div>
                  </div>

                  <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.customerSupport}
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Support
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleProviderDetails(provider)}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Comparison Panel */}
        <ComparisonPanel />

        {/* Comparison Modal */}
        <ComparisonModal />
      </div>
    </div>
  );
};

export default CompactProviderCards;