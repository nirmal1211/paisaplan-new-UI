import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { AddOn, PremiumBreakdown } from '../../types/purchase';
import { 
  Star, Check, Shield, Users, Phone, CreditCard, FileText, Calculator, 
  ArrowLeft, Plus, Minus, Info, Award, Clock, TrendingUp, Zap
} from 'lucide-react';

const ProviderDetailsContainer: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [premiumBreakdown, setPremiumBreakdown] = useState<PremiumBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const provider = mockProviders.find(p => p.id === providerId);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (provider) {
      dispatch({ type: 'SET_CURRENT_PROVIDER', payload: provider });
      calculatePremium();
    }
  }, [provider, dispatch]);

  useEffect(() => {
    calculatePremium();
  }, [selectedAddOns]);

  const calculatePremium = () => {
    if (!provider) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      const addOnPremiums = selectedAddOns.reduce((total, addOnId) => {
        const addOn = provider.addOns.find(a => a.id === addOnId);
        return total + (addOn?.premium || 0);
      }, 0);

      const subtotal = provider.basePremium + addOnPremiums;
      const taxes = Math.round(subtotal * 0.18); // 18% GST
      const discounts = 0; // No discounts for now
      const totalPremium = subtotal + taxes - discounts;

      const breakdown: PremiumBreakdown = {
        basePremium: provider.basePremium,
        addOnPremiums,
        taxes,
        discounts,
        totalPremium
      };

      setPremiumBreakdown(breakdown);
      dispatch({ type: 'UPDATE_PREMIUM_BREAKDOWN', payload: breakdown });
      setIsCalculating(false);
    }, 500);
  };

  const handleAddOnToggle = (addOnId: string) => {
    const newSelection = selectedAddOns.includes(addOnId)
      ? selectedAddOns.filter(id => id !== addOnId)
      : [...selectedAddOns, addOnId];
    
    setSelectedAddOns(newSelection);
  };

  const handlePurchase = () => {
    console.log('Proceeding to purchase with:', {
      provider,
      selectedAddOns,
      premiumBreakdown,
      formData: state.formData
    });
    alert('Purchase flow would continue to payment gateway');
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

  if (!provider) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
          Provider not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm font-roboto hover:opacity-80 transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Providers</span>
          </button>
        </div>

        {/* Provider Header */}
        <div className="rounded-2xl shadow-lg p-8 mb-8" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold font-poppins mb-3" style={{ color: 'var(--color-foreground)' }}>
                  {provider.name}
                </h1>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(provider.rating)}
                  </div>
                  <span className="font-roboto text-lg" style={{ color: 'var(--color-muted)' }}>
                    {provider.rating} rating
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Verified Provider
                  </span>
                </div>
                <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {provider.description}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Base Premium
              </div>
              <div className="text-4xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {formatCurrency(provider.basePremium)}
              </div>
              <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                per year
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`${isMobile ? 'space-y-8' : 'grid grid-cols-1 lg:grid-cols-5 gap-8'}`}>
          {/* Add-ons Selection (60% on desktop) */}
          <div className={`${isMobile ? '' : 'lg:col-span-3'} space-y-8`}>
            {/* Key Benefits */}
            <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Provider Features */}
            <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Provider Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Users className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {provider.features.cashlessHospitals?.toLocaleString()}+
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Cashless Hospitals
                  </div>
                </div>

                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {provider.features.claimSettlementRatio}%
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Claim Settlement
                  </div>
                </div>

                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Shield className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {provider.features.networkSize}
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Network Coverage
                  </div>
                </div>

                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Phone className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {provider.features.customerSupport}
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Customer Support
                  </div>
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Customize Your Coverage
                </h2>
                <p className="font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                  Select add-ons to enhance your policy coverage
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {provider.addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={`border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                        selectedAddOns.includes(addOn.id) ? 'ring-2' : ''
                      }`}
                      style={{
                        borderColor: selectedAddOns.includes(addOn.id) ? 'var(--color-primary)' : 'var(--color-border)',
                        '--tw-ring-color': 'var(--color-primary)'
                      }}
                      onClick={() => handleAddOnToggle(addOn.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addOn.id)}
                            onChange={() => handleAddOnToggle(addOn.id)}
                            className="w-5 h-5 rounded focus:ring-2 mt-1"
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                                {addOn.name}
                              </h3>
                              {addOn.isRecommended && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center space-x-1">
                                  <Award className="h-3 w-3" />
                                  <span>Recommended</span>
                                </span>
                              )}
                            </div>
                            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                              {addOn.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                            +{formatCurrency(addOn.premium)}
                          </div>
                          <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            per year
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary (40% on desktop) - Sticky positioning */}
          <div className={`${isMobile ? '' : 'lg:col-span-2'}`}>
            <div className={`${isMobile ? 'relative' : 'sticky top-8'}`}>
              <div className="rounded-2xl shadow-2xl border-2 overflow-hidden" style={{ 
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-primary)'
              }}>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calculator className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Premium Summary
                    </h3>
                  </div>

                  {isCalculating ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
                      <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Calculating premium...
                      </p>
                    </div>
                  ) : premiumBreakdown ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          Base Premium
                        </span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {formatCurrency(premiumBreakdown.basePremium)}
                        </span>
                      </div>

                      {premiumBreakdown.addOnPremiums > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            Add-ons ({selectedAddOns.length})
                          </span>
                          <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {formatCurrency(premiumBreakdown.addOnPremiums)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          Taxes (GST 18%)
                        </span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {formatCurrency(premiumBreakdown.taxes)}
                        </span>
                      </div>

                      <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            Total Premium
                          </span>
                          <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                            {formatCurrency(premiumBreakdown.totalPremium)}
                          </span>
                        </div>
                        <p className="text-sm font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                          per year
                        </p>
                      </div>

                      {/* Enhanced Coverage Indicator */}
                      {selectedAddOns.length > 0 && (
                        <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                            <span className="font-semibold font-roboto" style={{ color: 'var(--color-primary)' }}>
                              Enhanced Coverage
                            </span>
                          </div>
                          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            You've selected {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''} for comprehensive protection
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Footer with Buy Now Button */}
                <div className="border-t p-6" style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-secondary)',
                  boxShadow: '0 -2px 4px rgba(0,0,0,0.1)'
                }}>
                  {/* Selected Add-ons Summary */}
                  {selectedAddOns.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Selected Add-ons:
                      </h4>
                      <div className="space-y-1">
                        {selectedAddOns.map(addOnId => {
                          const addOn = provider.addOns.find(a => a.id === addOnId);
                          return addOn ? (
                            <div key={addOnId} className="flex justify-between text-sm">
                              <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                                {addOn.name}
                              </span>
                              <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                +{formatCurrency(addOn.premium)}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Total Price */}
                  {premiumBreakdown && (
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-card)' }}>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          Total Price
                        </span>
                        <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          {formatCurrency(premiumBreakdown.totalPremium)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA Button - Full Width */}
                  <button
                    onClick={handlePurchase}
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Buy Now</span>
                  </button>

                  <div className="text-center space-y-2 mt-4">
                    <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      <Shield className="h-3 w-3 inline mr-1" />
                      Secure payment • Instant policy issuance
                    </p>
                    <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      <Clock className="h-3 w-3 inline mr-1" />
                      24/7 customer support included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsContainer;