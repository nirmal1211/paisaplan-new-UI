import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { mockProviders } from '../../data/purchaseData';
import { Provider } from '../../types/purchase';
import { 
  Star, Check, ArrowRight, Users, Shield, Phone, ArrowLeft,
  X, BarChart3, ChevronLeft, ChevronRight, TrendingUp, Award,
  Heart, Car, Home, Plane, Gift, Target, ExternalLink, Zap
} from 'lucide-react';

const ResponsiveProviderListing: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonExpanded, setComparisonExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Advertisement Component with 16:9 aspect ratio
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
      <div 
        className="w-full mx-auto my-6"
        style={{
          maxWidth: '800px',
          width: isMobile ? '100vw' : '90vw',
          marginLeft: isMobile ? '0' : 'auto',
          marginRight: isMobile ? '0' : 'auto'
        }}
      >
        <div 
          className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          style={{
            paddingBottom: '56.25%', // 16:9 aspect ratio
            position: 'relative'
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-2 left-2 z-10">
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                Advertisement
              </span>
            </div>
            
            <div className={`bg-gradient-to-r ${ad.gradient} h-full flex items-center justify-between p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="flex-1 z-10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-poppins">{ad.title}</h3>
                    <p className="text-white/90 font-roboto">{ad.subtitle}</p>
                  </div>
                </div>
                <p className="text-white/80 font-roboto mb-4 text-sm">{ad.description}</p>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold font-roboto hover:bg-gray-100 transition-colors flex items-center space-x-2 text-sm">
                  <span>{ad.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 text-white/60 z-10">
                <Target className="h-4 w-4" />
                <span className="text-xs font-roboto">Sponsored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fluid Provider Card Component
  const ProviderCard = ({ provider }: { provider: Provider }) => (
    <div 
      className={`w-full mx-auto mb-4 ${
        selectedProviders.includes(provider.id) ? 'ring-2 ring-opacity-50' : ''
      }`}
      style={{
        maxWidth: isMobile ? '100vw' : '800px',
        margin: isMobile ? '0 16px 16px 16px' : '0 auto 16px auto',
        '--tw-ring-color': 'var(--color-primary)'
      }}
    >
      <div 
        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        style={{ maxHeight: '160px' }}
      >
        <div className="p-4 h-full flex items-center">
          {/* Provider Logo - 40x40px, maintain aspect ratio */}
          <div className="flex-shrink-0 mr-4">
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-10 h-10 rounded-full object-cover shadow-sm"
              style={{ minWidth: '40px', minHeight: '40px' }}
            />
          </div>

          {/* Content Block - Center, flexible width */}
          <div className="flex-1 min-w-0 mr-4">
            {/* Provider Name - 16px, bold */}
            <h3 className="text-base font-bold font-poppins mb-2 truncate" style={{ color: 'var(--color-foreground)' }}>
              {provider.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 mb-2">
              {renderStars(provider.rating)}
              <span className="text-sm font-roboto ml-1" style={{ color: 'var(--color-muted)' }}>
                {provider.rating}
              </span>
            </div>

            {/* 2-3 Key Features with ellipsis - 14px */}
            <div className="space-y-1">
              {provider.keyBenefits.slice(0, 2).map((benefit, index) => (
                <div key={index} className="flex items-center text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                  <span className="truncate" title={benefit}>
                    {benefit.length > 40 ? benefit.substring(0, 40) + '...' : benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Block - Right, align bottom */}
          <div className="flex-shrink-0 text-right self-end">
            <div className="text-lg font-bold font-poppins mb-1" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(provider.basePremium)}
            </div>
            <div className="text-xs font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
              per year
            </div>
            
            {/* Interactive Elements - 44x44px minimum */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleProviderSelect(provider.id)}
                className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedProviders.includes(provider.id) 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                aria-label={`${selectedProviders.includes(provider.id) ? 'Remove from' : 'Add to'} comparison`}
              >
                {selectedProviders.includes(provider.id) ? (
                  <Check className="h-5 w-5 text-blue-500" />
                ) : (
                  <BarChart3 className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <button
                onClick={() => handleProviderDetails(provider)}
                className="w-11 h-11 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
                aria-label="View provider details"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Comparison Toggle Button
  const ComparisonToggle = () => {
    if (selectedProviders.length === 0) return null;

    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowComparison(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          aria-label="Open comparison"
        >
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {selectedProviders.length}
            </span>
          </div>
        </button>
      </div>
    );
  };

  // Comparison Panel/Modal
  const ComparisonPanel = () => {
    const compareProviders = mockProviders.filter(p => selectedProviders.includes(p.id));
    
    if (!showComparison || compareProviders.length === 0) return null;

    // Desktop: Right sidebar (30% width), Mobile: Bottom sheet (80vh)
    const panelClasses = isMobile 
      ? "fixed inset-x-0 bottom-0 h-[80vh] rounded-t-2xl"
      : "fixed right-0 top-0 w-[30%] h-full";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in">
        <div className={`${panelClasses} bg-white shadow-2xl overflow-hidden transition-all duration-300`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Compare Providers ({selectedProviders.length})
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedProviders([])}
                  className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowComparison(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {compareProviders.map(provider => (
                <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {provider.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(provider.rating)}
                        <span className="text-sm font-roboto ml-1" style={{ color: 'var(--color-muted)' }}>
                          {provider.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(provider.basePremium)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Hospitals:</span>
                      <span className="font-semibold ml-1">{provider.features.cashlessHospitals?.toLocaleString()}+</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Claims:</span>
                      <span className="font-semibold ml-1">{provider.features.claimSettlementRatio}%</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowComparison(false);
                      handleProviderDetails(provider);
                    }}
                    className="w-full mt-3 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Choose This Provider
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="py-8">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
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
        <div className="text-center mb-12 px-4">
          <h1 className="text-4xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
            Choose Your Insurance Provider
          </h1>
          <p className="text-xl font-roboto max-w-3xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Compare providers and select the best coverage for your {state.policyType.replace('-', ' ')} policy
          </p>
        </div>

        {/* Provider Cards with Advertisements */}
        <div className="space-y-6">
          {mockProviders.map((provider, index) => (
            <React.Fragment key={provider.id}>
              <ProviderCard provider={provider} />
              
              {/* Insert advertisement after every 3rd provider */}
              {(index + 1) % 3 === 0 && (
                <AdBanner 
                  type={index === 2 ? 'health' : index === 5 ? 'motor' : 'life'} 
                  index={Math.floor(index / 3)} 
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Final Advertisement */}
        <AdBanner type="general" index={99} />

        {/* Comparison Toggle */}
        <ComparisonToggle />

        {/* Comparison Panel */}
        <ComparisonPanel />

        {/* Help Section */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
              Need Help Choosing?
            </h3>
            <p className="text-lg font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
              Our insurance experts are here to help you find the perfect coverage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium font-roboto transition-all duration-200 hover:opacity-80" style={{ 
                backgroundColor: 'var(--color-secondary)', 
                color: 'var(--color-primary)'
              }}>
                <Phone className="h-5 w-5" />
                <span>Call Expert</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
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

export default ResponsiveProviderListing;