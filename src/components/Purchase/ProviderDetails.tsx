import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { AddOn, PremiumBreakdown } from '../../types/purchase';
import { Star, Check, Shield, Users, Phone, CreditCard, FileText, Calculator } from 'lucide-react';

const ProviderDetails: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [premiumBreakdown, setPremiumBreakdown] = useState<PremiumBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const provider = mockProviders.find(p => p.id === providerId);

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
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
    
    // Simulate calculation delay
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
    dispatch({ type: 'SET_CURRENT_STEP', payload: 4 });
    // Navigate to payment or final confirmation page
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
    <div className="max-w-6xl mx-auto">
      {/* Provider Header */}
      <div className="rounded-xl shadow-lg p-8 mb-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                {provider.name}
              </h1>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(provider.rating)}
                </div>
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {provider.rating} rating
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
            <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(provider.basePremium)}
            </div>
            <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              per year
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Benefits */}
          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
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

          {/* Features */}
          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
              Provider Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Users className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {provider.features.cashlessHospitals?.toLocaleString()}+
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Cashless Hospitals
                </div>
              </div>

              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Shield className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {provider.features.claimSettlementRatio}%
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Claim Settlement
                </div>
              </div>

              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Users className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {provider.features.networkSize}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Network Coverage
                </div>
              </div>

              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Phone className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {provider.features.customerSupport}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Customer Support
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
              Customize Your Coverage
            </h2>
            <div className="space-y-4">
              {provider.addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className={`border rounded-lg p-6 transition-all duration-200 cursor-pointer ${
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
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {addOn.name}
                          </h3>
                          {addOn.isRecommended && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {addOn.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
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

          {/* Terms and Conditions */}
          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
              Terms & Conditions
            </h2>
            <ul className="space-y-3">
              {provider.termsAndConditions.map((term, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {term}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar - Premium Calculator */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
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
                        Add-ons
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

                  {premiumBreakdown.discounts > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-roboto text-green-600">
                        Discounts
                      </span>
                      <span className="font-semibold font-poppins text-green-600">
                        -{formatCurrency(premiumBreakdown.discounts)}
                      </span>
                    </div>
                  )}

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

                  <button
                    onClick={handlePurchase}
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-bold font-roboto text-white transition-all duration-200 hover:opacity-90 mt-6"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Buy Now</span>
                  </button>

                  <p className="text-xs font-roboto text-center" style={{ color: 'var(--color-muted)' }}>
                    Secure payment • Instant policy issuance
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;