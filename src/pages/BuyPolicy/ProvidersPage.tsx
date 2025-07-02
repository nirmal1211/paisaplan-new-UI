import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Star, Award, FileText, Shield, TrendingUp, CheckCircle, ArrowLeft, Filter, Search, Heart, Car, Bike, Users, MapPin, Clock, DollarSign, GitCompare as Compare, Eye, Plus, X } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  basePremium: number;
  claimSettlementRatio: number;
  networkSize: number;
  keyBenefits: string[];
  badges: ('recommended' | 'document_free' | 'best_seller' | 'max_coverage')[];
  waitingPeriod: string;
  addOnsAvailable: number;
  maxCoverage: string;
}

interface ComparisonData {
  providers: Provider[];
  parameters: {
    premium: number[];
    claimRatio: number[];
    network: number[];
    benefits: string[][];
    waiting: string[];
    addOns: number[];
    coverage: string[];
  };
}

const ProvidersPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'premium' | 'rating' | 'claims'>('premium');
  const [filterBadges, setFilterBadges] = useState<string[]>([]);

  const formData = location.state?.formData;

  // Mock providers data
  const mockProviders: Record<string, Provider[]> = {
    health: [
      {
        id: 'star-health',
        name: 'Star Health Insurance',
        logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.5,
        reviews: 12500,
        basePremium: 18500,
        claimSettlementRatio: 94.2,
        networkSize: 9000,
        keyBenefits: [
          'Cashless treatment at 9000+ hospitals',
          'Pre & post hospitalization coverage',
          'Annual health checkup included',
          'No claim bonus up to 50%'
        ],
        badges: ['recommended', 'best_seller'],
        waitingPeriod: '2 years for pre-existing',
        addOnsAvailable: 8,
        maxCoverage: '₹1 Crore'
      },
      {
        id: 'hdfc-ergo',
        name: 'HDFC ERGO Health',
        logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.3,
        reviews: 8900,
        basePremium: 16200,
        claimSettlementRatio: 92.8,
        networkSize: 8500,
        keyBenefits: [
          'Digital health card',
          'Telemedicine consultation',
          'Wellness programs included',
          'Quick claim settlement'
        ],
        badges: ['document_free', 'max_coverage'],
        waitingPeriod: '3 years for pre-existing',
        addOnsAvailable: 6,
        maxCoverage: '₹2 Crores'
      },
      {
        id: 'icici-lombard',
        name: 'ICICI Lombard Health',
        logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.4,
        reviews: 10200,
        basePremium: 19800,
        claimSettlementRatio: 96.1,
        networkSize: 7800,
        keyBenefits: [
          'Instant policy issuance',
          'Global coverage option',
          'Mental health coverage',
          'Maternity benefits'
        ],
        badges: ['recommended'],
        waitingPeriod: '2 years for pre-existing',
        addOnsAvailable: 10,
        maxCoverage: '₹1.5 Crores'
      }
    ],
    motor: [
      {
        id: 'bajaj-allianz',
        name: 'Bajaj Allianz Motor',
        logo: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.2,
        reviews: 15600,
        basePremium: 12800,
        claimSettlementRatio: 89.5,
        networkSize: 4500,
        keyBenefits: [
          'Cashless repairs at 4500+ garages',
          'Zero depreciation cover',
          'Roadside assistance 24x7',
          'Engine protection available'
        ],
        badges: ['recommended', 'best_seller'],
        waitingPeriod: 'No waiting period',
        addOnsAvailable: 12,
        maxCoverage: 'IDV Based'
      },
      {
        id: 'tata-aig',
        name: 'Tata AIG Motor',
        logo: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.0,
        reviews: 9800,
        basePremium: 11500,
        claimSettlementRatio: 87.2,
        networkSize: 3800,
        keyBenefits: [
          'Quick claim settlement',
          'Online policy management',
          'Return to invoice cover',
          'Key replacement cover'
        ],
        badges: ['document_free'],
        waitingPeriod: 'No waiting period',
        addOnsAvailable: 8,
        maxCoverage: 'IDV Based'
      }
    ],
    'two-wheeler': [
      {
        id: 'digit-bike',
        name: 'Digit Two Wheeler',
        logo: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.6,
        reviews: 7200,
        basePremium: 3200,
        claimSettlementRatio: 91.8,
        networkSize: 3000,
        keyBenefits: [
          'Instant policy on WhatsApp',
          'Zero paperwork claims',
          'Engine protection cover',
          'Consumables cover available'
        ],
        badges: ['recommended', 'document_free'],
        waitingPeriod: 'No waiting period',
        addOnsAvailable: 6,
        maxCoverage: 'IDV Based'
      }
    ],
    life: [
      {
        id: 'lic-term',
        name: 'LIC Term Insurance',
        logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        rating: 4.1,
        reviews: 25000,
        basePremium: 8500,
        claimSettlementRatio: 98.5,
        networkSize: 0,
        keyBenefits: [
          'Highest claim settlement ratio',
          'Tax benefits under 80C',
          'Flexible premium payment',
          'Accidental death benefit'
        ],
        badges: ['recommended', 'best_seller'],
        waitingPeriod: '12 months for suicide',
        addOnsAvailable: 4,
        maxCoverage: '₹10 Crores'
      }
    ]
  };

  useEffect(() => {
    const policyProviders = mockProviders[policyType || 'health'] || [];
    setProviders(policyProviders);
    setFilteredProviders(policyProviders);
  }, [policyType]);

  useEffect(() => {
    let filtered = [...providers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Badge filter
    if (filterBadges.length > 0) {
      filtered = filtered.filter(provider =>
        filterBadges.some(badge => provider.badges.includes(badge as any))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'premium':
          return a.basePremium - b.basePremium;
        case 'rating':
          return b.rating - a.rating;
        case 'claims':
          return b.claimSettlementRatio - a.claimSettlementRatio;
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchQuery, filterBadges, sortBy]);

  const getBadgeStyle = (badge: string) => {
    const styles = {
      recommended: 'bg-green-100 text-green-800 border-green-200',
      document_free: 'bg-blue-100 text-blue-800 border-blue-200',
      best_seller: 'bg-orange-100 text-orange-800 border-orange-200',
      max_coverage: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return styles[badge as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getBadgeText = (badge: string) => {
    const texts = {
      recommended: 'Recommended',
      document_free: 'Document Free',
      best_seller: 'Best Seller',
      max_coverage: 'Maximum Coverage'
    };
    return texts[badge as keyof typeof texts] || badge;
  };

  const toggleProviderSelection = (providerId: string) => {
    setSelectedProviders(prev => {
      if (prev.includes(providerId)) {
        return prev.filter(id => id !== providerId);
      } else if (prev.length < 3) {
        return [...prev, providerId];
      }
      return prev;
    });
  };

  const getComparisonData = (): ComparisonData => {
    const selectedProviderData = providers.filter(p => selectedProviders.includes(p.id));
    return {
      providers: selectedProviderData,
      parameters: {
        premium: selectedProviderData.map(p => p.basePremium),
        claimRatio: selectedProviderData.map(p => p.claimSettlementRatio),
        network: selectedProviderData.map(p => p.networkSize),
        benefits: selectedProviderData.map(p => p.keyBenefits),
        waiting: selectedProviderData.map(p => p.waitingPeriod),
        addOns: selectedProviderData.map(p => p.addOnsAvailable),
        coverage: selectedProviderData.map(p => p.maxCoverage)
      }
    };
  };

  const renderProviderCard = (provider: Provider) => (
    <div
      key={provider.id}
      className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      {/* Badges */}
      {provider.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 pb-0">
          {provider.badges.map(badge => (
            <span
              key={badge}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(badge)}`}
            >
              {getBadgeText(badge)}
            </span>
          ))}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {provider.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(provider.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {provider.rating} ({provider.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              ₹{provider.basePremium.toLocaleString()}
            </div>
            <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Annual Premium
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {provider.claimSettlementRatio}%
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Claim Settlement
            </div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {provider.networkSize > 0 ? provider.networkSize.toLocaleString() : 'N/A'}
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Network Size
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
            Key Benefits:
          </h4>
          <div className="space-y-1">
            {provider.keyBenefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/buy-policy/${policyType}/${provider.id}`, { 
              state: { formData, provider } 
            })}
            className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Eye className="h-4 w-4 inline mr-2" />
            View Details
          </button>
          
          <button
            onClick={() => toggleProviderSelection(provider.id)}
            className={`py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200 ${
              selectedProviders.includes(provider.id)
                ? 'text-white'
                : ''
            }`}
            style={{
              backgroundColor: selectedProviders.includes(provider.id) 
                ? 'var(--color-accent)' 
                : 'var(--color-secondary)',
              color: selectedProviders.includes(provider.id) 
                ? 'white' 
                : 'var(--color-primary)'
            }}
            disabled={!selectedProviders.includes(provider.id) && selectedProviders.length >= 3}
          >
            {selectedProviders.includes(provider.id) ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderComparison = () => {
    const comparisonData = getComparisonData();
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="sticky top-0 p-6 border-b" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Provider Comparison
              </h2>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 rounded-lg transition-all duration-200"
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
                  <tr>
                    <th className="text-left p-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Parameter
                    </th>
                    {comparisonData.providers.map(provider => (
                      <th key={provider.id} className="text-center p-4">
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-semibold font-poppins text-sm" style={{ color: 'var(--color-foreground)' }}>
                            {provider.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Annual Premium
                    </td>
                    {comparisonData.parameters.premium.map((premium, index) => (
                      <td key={index} className="p-4 text-center font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        ₹{premium.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Claim Settlement Ratio
                    </td>
                    {comparisonData.parameters.claimRatio.map((ratio, index) => (
                      <td key={index} className="p-4 text-center font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {ratio}%
                      </td>
                    ))}
                  </tr>
                  {policyType !== 'life' && (
                    <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Network Size
                      </td>
                      {comparisonData.parameters.network.map((network, index) => (
                        <td key={index} className="p-4 text-center font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {network > 0 ? network.toLocaleString() : 'N/A'}
                        </td>
                      ))}
                    </tr>
                  )}
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Waiting Period
                    </td>
                    {comparisonData.parameters.waiting.map((waiting, index) => (
                      <td key={index} className="p-4 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {waiting}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Add-ons Available
                    </td>
                    {comparisonData.parameters.addOns.map((addOns, index) => (
                      <td key={index} className="p-4 text-center font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {addOns}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-4 font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Maximum Coverage
                    </td>
                    {comparisonData.parameters.coverage.map((coverage, index) => (
                      <td key={index} className="p-4 text-center font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {coverage}
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/buy-policy/${policyType}`)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Choose Your Provider
                </h1>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Compare and select the best insurance provider for you
                </p>
              </div>
            </div>

            {/* Comparison Button */}
            {selectedProviders.length > 1 && (
              <button
                onClick={() => setShowComparison(true)}
                className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Compare className="h-4 w-4" />
                <span>Compare ({selectedProviders.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-xl shadow-lg p-6 mb-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all min-w-48"
                style={{ 
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-foreground)',
                  '--tw-ring-color': 'var(--color-primary)'
                }}
              >
                <option value="premium">Sort by Premium</option>
                <option value="rating">Sort by Rating</option>
                <option value="claims">Sort by Claim Ratio</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
            </div>

            {/* Badge Filters */}
            <div className="flex flex-wrap gap-2">
              {['recommended', 'document_free', 'best_seller', 'max_coverage'].map(badge => (
                <button
                  key={badge}
                  onClick={() => {
                    setFilterBadges(prev => 
                      prev.includes(badge) 
                        ? prev.filter(b => b !== badge)
                        : [...prev, badge]
                    );
                  }}
                  className={`px-3 py-2 rounded-lg font-medium font-roboto transition-all text-sm ${
                    filterBadges.includes(badge) ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: filterBadges.includes(badge) 
                      ? 'var(--color-primary)' 
                      : 'var(--color-secondary)',
                    color: filterBadges.includes(badge) 
                      ? 'white' 
                      : 'var(--color-primary)'
                  }}
                >
                  {getBadgeText(badge)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProviders.map(renderProviderCard)}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              No Providers Found
            </h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      {showComparison && renderComparison()}
    </div>
  );
};

export default ProvidersPage;