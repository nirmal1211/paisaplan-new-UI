import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { 
  Star, Check, ArrowRight, BarChart3, Users, Shield, Phone, ArrowLeft,
  X, Eye, TrendingUp, Award, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';

const CompactProviderListing: React.FC = () => {
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

  const ComparisonSidebar = () => {
    const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));
    
    if (selectedProviders.length === 0) return null;

    return (
      <div className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        comparisonExpanded ? 'w-96' : 'w-16'
      }`}>
        <div className="rounded-r-xl shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
          {/* Toggle Button */}
          <button
            onClick={() => setComparisonExpanded(!comparisonExpanded)}
            className="w-full p-4 flex items-center justify-center transition-colors"
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
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Compare ({selectedProviders.length})
                </h3>
                <button
                  onClick={() => setSelectedProviders([])}
                  className="p-1 rounded hover:opacity-80 transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {compareProviders.map(provider => (
                  <div key={provider.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-poppins truncate" style={{ color: 'var(--color-foreground)' }}>
                        {provider.name}
                      </p>
                      <p className="text-xs font-roboto" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(provider.basePremium)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleProviderSelect(provider.id)}
                      className="p-1 rounded hover:opacity-80 transition-colors"
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
                className="w-full py-2 px-4 rounded-lg font-medium font-roboto text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Compare All
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ComparisonModal = () => {
    const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));
    
    if (!showComparison || compareProviders.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="sticky top-0 p-6 border-b" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Provider Comparison
              </h2>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 rounded-lg hover:opacity-80 transition-colors"
                style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="text-left py-4 px-2 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Features
                    </th>
                    {compareProviders.map(provider => (
                      <th key={provider.id} className="text-center py-4 px-2 min-w-48">
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {provider.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-4 px-2 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Base Premium
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-4 px-2 text-center">
                        <span className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          {formatCurrency(provider.basePremium)}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-4 px-2 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Rating
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-4 px-2 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {renderStars(provider.rating)}
                          <span className="ml-2 font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {provider.rating}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-4 px-2 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Cashless Hospitals
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-4 px-2 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {provider.features.cashlessHospitals?.toLocaleString()}+
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="py-4 px-2 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Claim Settlement Ratio
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-4 px-2 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {provider.features.claimSettlementRatio}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Key Benefits
                    </td>
                    {compareProviders.map(provider => (
                      <td key={provider.id} className="py-4 px-2">
                        <ul className="space-y-1 text-sm">
                          {provider.keyBenefits.slice(0, 3).map((benefit, index) => (
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Choose Your Insurance Provider
          </h1>
          <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
            Compare and select the best insurance provider for your {state.policyType.replace('-', ' ')} policy
          </p>
        </div>

        {/* Compact Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                maxHeight: '180px'
              }}
            >
              <div className="p-4 h-full flex flex-col">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
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
                    <div className="flex items-center space-x-2">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {renderStars(provider.rating)}
                          <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {provider.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium */}
                  <div className="text-right">
                    <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {formatCurrency(provider.basePremium)}
                    </div>
                    <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      per year
                    </div>
                  </div>
                </div>

                {/* Key Benefits - Compact */}
                <div className="flex-1 mb-3">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {provider.keyBenefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="font-roboto truncate" style={{ color: 'var(--color-foreground)' }}>
                          {benefit.length > 20 ? benefit.substring(0, 20) + '...' : benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Row - Compact */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                  <div className="text-center">
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.cashlessHospitals?.toLocaleString()}+
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Hospitals
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.claimSettlementRatio}%
                    </div>
                    <div className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Claims
                    </div>
                  </div>

                  <div className="text-center">
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
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 text-sm"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Sidebar */}
        <ComparisonSidebar />

        {/* Comparison Modal */}
        <ComparisonModal />
      </div>
    </div>
  );
};

export default CompactProviderListing;