import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { Star, Check, ArrowRight, BarChart3, Users, Shield, Phone, ArrowLeft } from 'lucide-react';

const ProviderListing: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

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
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
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
                ✕
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

        {/* Comparison Controls */}
        {selectedProviders.length > 0 && (
          <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                <span className="font-medium font-roboto" style={{ color: 'var(--color-primary)' }}>
                  {selectedProviders.length} provider{selectedProviders.length > 1 ? 's' : ''} selected for comparison
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedProviders([])}
                  className="px-4 py-2 rounded-lg font-medium font-roboto transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-card)',
                    color: 'var(--color-primary)',
                    border: `1px solid var(--color-border)`
                  }}
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  disabled={selectedProviders.length < 2}
                  className="px-4 py-2 rounded-lg font-medium font-roboto text-white transition-colors disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Compare Providers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Provider Cards */}
        <div className="space-y-6">
          {mockProviders.map((provider) => (
            <div
              key={provider.id}
              className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                selectedProviders.includes(provider.id) ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: selectedProviders.includes(provider.id) ? 'var(--color-primary)' : 'var(--color-border)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Selection Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProviders.includes(provider.id)}
                        onChange={() => handleProviderSelect(provider.id)}
                        className="w-5 h-5 rounded focus:ring-2"
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                    </div>

                    {/* Provider Info */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-16 h-16 rounded-full object-cover shadow-md"
                      />
                      <div>
                        <h3 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {provider.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(provider.rating)}
                          </div>
                          <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {provider.rating} rating
                          </span>
                        </div>
                        <p className="font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                          {provider.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium */}
                  <div className="text-right">
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Starting from
                    </div>
                    <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {formatCurrency(provider.basePremium)}
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      per year
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold font-poppins mb-3" style={{ color: 'var(--color-foreground)' }}>
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {provider.keyBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Users className="h-6 w-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                    <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.cashlessHospitals?.toLocaleString()}+
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Hospitals
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                    <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.claimSettlementRatio}%
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Claim Ratio
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Shield className="h-6 w-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                    <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.networkSize}
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Coverage
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Phone className="h-6 w-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                    <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {provider.features.customerSupport}
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Support
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleProviderDetails(provider)}
                    className="flex items-center space-x-2 px-6 py-3 rounded-lg font-bold font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>View Details & Buy</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Modal */}
        <ComparisonModal />
      </div>
    </div>
  );
};

export default ProviderListing;