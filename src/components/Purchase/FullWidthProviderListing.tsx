import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { 
  Star, Check, ArrowRight, Users, Shield, Phone, ArrowLeft,
  Award, Clock, TrendingUp, ExternalLink, Zap, Gift, Target,
  ChevronRight, Heart, Car, Home, Plane
} from 'lucide-react';

const FullWidthProviderListing: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

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

  // Mock recommended providers (first 2 providers)
  const recommendedProviders = mockProviders.slice(0, 2);
  const regularProviders = mockProviders.slice(2);

  // Advertisement components
  const AdBanner = ({ type, index }: { type: 'health' | 'motor' | 'life' | 'general', index: number }) => {
    const adContent = {
      health: {
        title: 'Health First Initiative',
        subtitle: 'Get 20% off on family health plans',
        description: 'Comprehensive health coverage with wellness benefits',
        icon: Heart,
        gradient: 'from-green-500 to-emerald-600',
        cta: 'Explore Health Plans'
      },
      motor: {
        title: 'Drive Safe, Save More',
        subtitle: 'Zero depreciation at no extra cost',
        description: 'Complete vehicle protection with roadside assistance',
        icon: Car,
        gradient: 'from-blue-500 to-cyan-600',
        cta: 'Get Motor Quote'
      },
      life: {
        title: 'Secure Your Future',
        subtitle: 'Life insurance starting at ₹500/month',
        description: 'Financial security for your loved ones',
        icon: Shield,
        gradient: 'from-purple-500 to-indigo-600',
        cta: 'View Life Plans'
      },
      general: {
        title: 'Special Offer',
        subtitle: 'Multi-policy discount up to 25%',
        description: 'Bundle your insurance policies and save more',
        icon: Gift,
        gradient: 'from-orange-500 to-red-600',
        cta: 'Learn More'
      }
    };

    const ad = adContent[type];
    const Icon = ad.icon;

    return (
      <div className={`rounded-2xl shadow-lg overflow-hidden my-8 transform hover:scale-[1.02] transition-all duration-300`}>
        <div className={`bg-gradient-to-r ${ad.gradient} p-8 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-poppins">{ad.title}</h3>
                  <p className="text-white/90 font-roboto text-lg">{ad.subtitle}</p>
                </div>
              </div>
              <p className="text-white/80 font-roboto mb-6 max-w-md">{ad.description}</p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold font-roboto hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <span>{ad.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-sm font-roboto text-white/80 mb-1">Advertisement</div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-roboto">Sponsored Content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProviderCard = ({ provider, isRecommended = false }: { provider: Provider, isRecommended?: boolean }) => (
    <div className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden ${
      isRecommended ? 'ring-2 ring-opacity-50' : ''
    } ${selectedProviders.includes(provider.id) ? 'ring-2' : ''}`}
    style={{
      backgroundColor: 'var(--color-card)',
      borderColor: selectedProviders.includes(provider.id) ? 'var(--color-primary)' : 'var(--color-border)',
      '--tw-ring-color': isRecommended ? 'var(--color-accent)' : 'var(--color-primary)'
    }}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center">
          <div className="flex items-center justify-center space-x-2 text-white">
            <Award className="h-4 w-4" />
            <span className="font-bold font-roboto text-sm">RECOMMENDED</span>
            <Award className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Selection Checkbox */}
            <input
              type="checkbox"
              checked={selectedProviders.includes(provider.id)}
              onChange={() => handleProviderSelect(provider.id)}
              className="w-5 h-5 rounded focus:ring-2"
              style={{ accentColor: 'var(--color-primary)' }}
            />

            {/* Provider Logo and Info */}
            <div className="flex items-center space-x-4">
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  {provider.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(provider.rating)}
                  </div>
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {provider.rating} rating
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Verified
                  </span>
                </div>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {provider.description}
                </p>
              </div>
            </div>
          </div>

          {/* Premium Display */}
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

        {/* Key Benefits Grid */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
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

        {/* Provider Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleProviderDetails(provider)}
            className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <span>View Details & Customize</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          
          <button className="px-6 py-4 rounded-xl font-medium font-roboto transition-all duration-200 hover:opacity-80 border-2" style={{ 
            backgroundColor: 'var(--color-secondary)', 
            color: 'var(--color-primary)',
            borderColor: 'var(--color-border)'
          }}>
            Quick Quote
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Compare comprehensive coverage options and select the best insurance provider for your {state.policyType.replace('-', ' ')} policy
          </p>
        </div>

        {/* Recommended Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
            
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Award className="h-8 w-8" />
                <h2 className="text-3xl font-bold font-poppins">RECOMMENDED FOR YOU</h2>
                <Award className="h-8 w-8" />
              </div>
              <p className="text-xl font-roboto text-white/90 mb-6">
                Our top-rated providers based on your profile and requirements
              </p>
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span className="font-roboto">Best Value</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-roboto">High Ratings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-roboto">Quick Claims</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Providers */}
          <div className="space-y-6">
            {recommendedProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} isRecommended={true} />
            ))}
          </div>
        </div>

        {/* Advertisement Banner 1 */}
        <AdBanner type="health" index={0} />

        {/* Regular Providers Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
            <h2 className="text-2xl font-bold font-poppins px-6" style={{ color: 'var(--color-foreground)' }}>
              More Options
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
          </div>

          <div className="space-y-8">
            {regularProviders.map((provider, index) => (
              <React.Fragment key={provider.id}>
                <ProviderCard provider={provider} />
                
                {/* Insert ads between providers */}
                {index === 0 && <AdBanner type="motor" index={1} />}
                {index === 1 && <AdBanner type="life" index={2} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Final Advertisement */}
        <AdBanner type="general" index={3} />

        {/* Comparison CTA */}
        {selectedProviders.length > 1 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
            <div className="rounded-2xl shadow-2xl p-6 border-2" style={{ 
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-primary)'
            }}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--color-primary)' }}>
                    {selectedProviders.length}
                  </div>
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    Providers Selected
                  </span>
                </div>
                <button className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <span>Compare Selected</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h3 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
              Need Help Choosing?
            </h3>
            <p className="text-lg font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
              Our insurance experts are here to help you find the perfect coverage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium font-roboto transition-all duration-200 hover:opacity-80" style={{ 
                backgroundColor: 'var(--color-secondary)', 
                color: 'var(--color-primary)'
              }}>
                <Phone className="h-5 w-5" />
                <span>Call Expert</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                <ExternalLink className="h-5 w-5" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullWidthProviderListing;