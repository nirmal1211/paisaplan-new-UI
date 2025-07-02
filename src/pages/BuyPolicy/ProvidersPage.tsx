import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Award, 
  FileText, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  ArrowLeft, 
  Filter, 
  Search, 
  Heart, 
  Car, 
  Bike, 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Eye, 
  Plus, 
  X, 
  Home, 
  User, 
  Menu,
  ChevronDown,
  ChevronUp,
  Phone,
  CreditCard,
  Download,
  Info,
  XCircle
} from 'lucide-react';

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
  description?: string;
  keyFeatures?: string[];
  coverage?: {
    covered: string[];
    notCovered: string[];
  };
  addOns?: AddOn[];
  networkLocations?: NetworkLocation[];
  claimProcess?: string[];
  requiredDocuments?: string[];
  paymentMethods?: string[];
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  premium: number;
  sumInsured?: number;
  isSelected: boolean;
  isAvailable: boolean;
  terms?: string[];
}

interface NetworkLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  rating: number;
  specialties?: string[];
  phone: string;
}

const ProvidersPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'premium' | 'rating' | 'claims'>('premium');
  const [filterBadges, setFilterBadges] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<{ [providerId: string]: string[] }>({});
  const [providerPremiums, setProviderPremiums] = useState<{ [providerId: string]: number }>({});

  const formData = location.state?.formData;

  // Enhanced mock providers data with detailed information
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
        maxCoverage: '₹1 Crore',
        description: 'Star Health Insurance is India\'s first standalone health insurance company, offering comprehensive health coverage with a wide network of hospitals.',
        keyFeatures: [
          'Cashless treatment at 9000+ hospitals',
          'Pre & post hospitalization coverage (30-60 days)',
          'Annual health checkup included',
          'No claim bonus up to 50%',
          'Maternity coverage after 2 years',
          'Mental health treatment covered'
        ],
        coverage: {
          covered: [
            'Hospitalization expenses',
            'Pre & post hospitalization',
            'Day care procedures',
            'Ambulance charges',
            'Room rent & nursing expenses',
            'ICU charges',
            'Surgeon & anesthetist fees',
            'Medical tests & diagnostics',
            'Organ transplant',
            'Cancer treatment'
          ],
          notCovered: [
            'Pre-existing diseases (first 2 years)',
            'Cosmetic surgery',
            'Dental treatment (unless accidental)',
            'Pregnancy expenses (first 2 years)',
            'Self-inflicted injuries',
            'War & nuclear risks',
            'Drug & alcohol abuse',
            'Experimental treatments'
          ]
        },
        addOns: [
          {
            id: 'critical-illness',
            name: 'Critical Illness Cover',
            description: 'Additional coverage for 30+ critical illnesses',
            premium: 3500,
            sumInsured: 500000,
            isSelected: false,
            isAvailable: true,
            terms: ['Covers 30+ critical illnesses', 'Lump sum payout on diagnosis', '90-day survival period']
          },
          {
            id: 'maternity',
            name: 'Enhanced Maternity Cover',
            description: 'Extended maternity benefits with newborn coverage',
            premium: 2800,
            sumInsured: 100000,
            isSelected: false,
            isAvailable: true,
            terms: ['Normal delivery: ₹50,000', 'C-section: ₹75,000', 'Newborn coverage: ₹25,000']
          },
          {
            id: 'dental',
            name: 'Dental Care Cover',
            description: 'Coverage for dental treatments and procedures',
            premium: 1200,
            sumInsured: 25000,
            isSelected: false,
            isAvailable: true,
            terms: ['Annual limit: ₹25,000', 'Covers dental surgery', 'Excludes cosmetic procedures']
          }
        ],
        networkLocations: [
          {
            id: '1',
            name: 'Apollo Hospital',
            address: '123 Health Street, Bandra',
            city: 'Mumbai',
            distance: '2.5 km',
            rating: 4.8,
            specialties: ['Cardiology', 'Neurology', 'Oncology'],
            phone: '+91-22-1234-5678'
          },
          {
            id: '2',
            name: 'Fortis Hospital',
            address: '456 Medical Avenue, Andheri',
            city: 'Mumbai',
            distance: '3.8 km',
            rating: 4.6,
            specialties: ['Orthopedics', 'Gastroenterology', 'Pediatrics'],
            phone: '+91-22-2345-6789'
          }
        ],
        claimProcess: [
          'Intimate the insurer within 24 hours of hospitalization',
          'Submit pre-authorization form for cashless treatment',
          'Get approval from insurance company',
          'Receive treatment at network hospital',
          'Complete discharge formalities',
          'Submit final documents if required'
        ],
        requiredDocuments: [
          'Filled application form',
          'Age proof (Birth certificate/Passport)',
          'Identity proof (Aadhar/PAN/Passport)',
          'Address proof (Utility bill/Aadhar)',
          'Medical reports (if any)',
          'Passport size photographs'
        ],
        paymentMethods: [
          'Credit Card',
          'Debit Card',
          'Net Banking',
          'UPI',
          'Cheque/DD'
        ]
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
        maxCoverage: '₹2 Crores',
        description: 'HDFC ERGO offers innovative health insurance solutions with digital-first approach and comprehensive wellness programs.',
        keyFeatures: [
          'Digital health card and app',
          'Telemedicine consultation included',
          'Wellness programs and rewards',
          'Quick claim settlement process',
          'Global coverage options',
          'Mental health support'
        ],
        coverage: {
          covered: [
            'Hospitalization expenses',
            'Pre & post hospitalization',
            'Day care procedures',
            'Telemedicine consultations',
            'Mental health treatment',
            'Alternative treatments (AYUSH)',
            'Emergency ambulance',
            'Health checkups',
            'Vaccination coverage',
            'Maternity benefits'
          ],
          notCovered: [
            'Pre-existing diseases (first 3 years)',
            'Cosmetic treatments',
            'Dental care (non-accidental)',
            'Infertility treatments',
            'Experimental procedures',
            'War-related injuries',
            'Self-inflicted harm',
            'Drug abuse treatment'
          ]
        },
        addOns: [
          {
            id: 'global-coverage',
            name: 'Global Coverage',
            description: 'Worldwide emergency medical coverage',
            premium: 4200,
            sumInsured: 1000000,
            isSelected: false,
            isAvailable: true,
            terms: ['Emergency treatment worldwide', 'Medical evacuation', 'Repatriation coverage']
          },
          {
            id: 'wellness-plus',
            name: 'Wellness Plus',
            description: 'Enhanced wellness and preventive care',
            premium: 1800,
            isSelected: false,
            isAvailable: true,
            terms: ['Comprehensive health checkups', 'Fitness tracking rewards', 'Nutrition counseling']
          }
        ]
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
        maxCoverage: '₹1.5 Crores',
        description: 'ICICI Lombard provides comprehensive health insurance with instant policy issuance and global coverage options.',
        keyFeatures: [
          'Instant policy issuance',
          'Global coverage available',
          'Mental health treatment',
          'Comprehensive maternity benefits',
          'No room rent capping',
          'Unlimited restoration benefit'
        ]
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
    
    // Initialize provider premiums
    const initialPremiums: { [key: string]: number } = {};
    policyProviders.forEach(provider => {
      initialPremiums[provider.id] = provider.basePremium;
    });
    setProviderPremiums(initialPremiums);
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
          return (providerPremiums[a.id] || a.basePremium) - (providerPremiums[b.id] || b.basePremium);
        case 'rating':
          return b.rating - a.rating;
        case 'claims':
          return b.claimSettlementRatio - a.claimSettlementRatio;
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchQuery, filterBadges, sortBy, providerPremiums]);

  const renderPersistentNavbar = () => (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ 
      backgroundColor: 'var(--color-background)', 
      borderColor: 'var(--color-border)' 
    }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              Trovity
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate('/policies')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <Shield className="h-4 w-4" />
              <span>Products</span>
            </button>
            <button
              onClick={() => navigate('/my-policy')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <FileText className="h-4 w-4" />
              <span>My Policies</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 font-medium font-roboto transition-colors hover:opacity-80"
              style={{ color: 'var(--color-foreground)' }}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="space-y-4">
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  navigate('/policies');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <Shield className="h-4 w-4" />
                <span>Products</span>
              </button>
              <button
                onClick={() => {
                  navigate('/my-policy');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <FileText className="h-4 w-4" />
                <span>My Policies</span>
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left font-medium font-roboto transition-colors hover:opacity-80"
                style={{ color: 'var(--color-foreground)' }}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

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

  const toggleProviderExpansion = (providerId: string) => {
    setExpandedProvider(expandedProvider === providerId ? null : providerId);
  };

  const toggleAddOn = (providerId: string, addOnId: string) => {
    setSelectedAddOns(prev => {
      const providerAddOns = prev[providerId] || [];
      const newAddOns = providerAddOns.includes(addOnId)
        ? providerAddOns.filter(id => id !== addOnId)
        : [...providerAddOns, addOnId];
      
      return { ...prev, [providerId]: newAddOns };
    });

    // Update provider premium
    const provider = providers.find(p => p.id === providerId);
    if (provider && provider.addOns) {
      const providerAddOns = selectedAddOns[providerId] || [];
      const newAddOns = providerAddOns.includes(addOnId)
        ? providerAddOns.filter(id => id !== addOnId)
        : [...providerAddOns, addOnId];
      
      const addOnTotal = newAddOns.reduce((total, id) => {
        const addOn = provider.addOns?.find(a => a.id === id);
        return total + (addOn?.premium || 0);
      }, 0);

      setProviderPremiums(prev => ({
        ...prev,
        [providerId]: provider.basePremium + addOnTotal
      }));
    }
  };

  const handleBuyNow = (provider: Provider) => {
    const purchaseData = {
      formData,
      provider,
      selectedAddOns: selectedAddOns[provider.id] || [],
      totalPremium: providerPremiums[provider.id] || provider.basePremium
    };
    
    navigate(`/buy-policy/${policyType}/provider/${provider.id}/payment`, { 
      state: purchaseData 
    });
  };

  const renderProviderCard = (provider: Provider) => {
    const isExpanded = expandedProvider === provider.id;
    const providerAddOns = selectedAddOns[provider.id] || [];
    const totalPremium = providerPremiums[provider.id] || provider.basePremium;

    return (
      <div
        key={provider.id}
        className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-6"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        {/* Provider Card Header */}
        <div className="p-6">
          {/* Badges */}
          {provider.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {provider.badges.map(badge => (
                <span
                  key={badge}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(badge)}`}
                >
                  {getBadgeText(badge)}
                </span>
              ))}
            </div>
          )}

          {/* Provider Info */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4 flex-1">
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  {provider.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
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
                    {provider.rating} ({provider.reviews.toLocaleString()})
                  </span>
                </div>
                {provider.description && (
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {provider.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-right ml-6">
              <div className="text-3xl font-bold font-poppins mb-1" style={{ color: 'var(--color-primary)' }}>
                ₹{totalPremium.toLocaleString()}
              </div>
              <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Annual Premium
              </div>
              {totalPremium > provider.basePremium && (
                <div className="text-xs font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                  Base: ₹{provider.basePremium.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {provider.claimSettlementRatio}%
              </div>
              <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                Claim Settlement
              </div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {provider.networkSize > 0 ? provider.networkSize.toLocaleString() : 'N/A'}
              </div>
              <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                Network Size
              </div>
            </div>
            <div className="text-center p-4 rounded-lg md:col-span-1 col-span-2" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {provider.waitingPeriod}
              </div>
              <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                Waiting Period
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
              Key Benefits:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {provider.keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => toggleProviderExpansion(provider.id)}
              className="flex-1 py-3 px-4 rounded-lg font-medium font-roboto transition-all duration-200 hover:opacity-90 flex items-center justify-center space-x-2"
              style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
            >
              <Eye className="h-4 w-4" />
              <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            <button
              onClick={() => handleBuyNow(provider)}
              className="flex-1 py-3 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
            {/* Coverage Details */}
            {provider.coverage && (
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h4 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Coverage Details
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* What's Covered */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h5 className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        What's Covered
                      </h5>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {provider.coverage.covered.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Not Covered */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h5 className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        What's Not Covered
                      </h5>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {provider.coverage.notCovered.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add-ons */}
            {provider.addOns && provider.addOns.length > 0 && (
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h4 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Available Add-ons
                </h4>
                
                <div className="space-y-4">
                  {provider.addOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className={`border rounded-lg p-4 transition-all duration-200 ${
                        providerAddOns.includes(addOn.id) ? 'shadow-md' : ''
                      }`}
                      style={{
                        borderColor: providerAddOns.includes(addOn.id) 
                          ? 'var(--color-primary)' 
                          : 'var(--color-border)',
                        backgroundColor: providerAddOns.includes(addOn.id) 
                          ? 'var(--color-secondary)' 
                          : 'transparent'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={providerAddOns.includes(addOn.id)}
                            onChange={() => toggleAddOn(provider.id, addOn.id)}
                            className="mt-1 w-4 h-4 rounded"
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold font-poppins mb-1" style={{ color: 'var(--color-foreground)' }}>
                              {addOn.name}
                            </h5>
                            <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                              {addOn.description}
                            </p>
                            {addOn.terms && (
                              <div className="space-y-1">
                                {addOn.terms.map((term, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                                    <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                                      {term}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                            +₹{addOn.premium.toLocaleString()}
                          </div>
                          <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                            Annual
                          </div>
                          {addOn.sumInsured && (
                            <div className="text-xs font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                              ₹{addOn.sumInsured.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Network Locations */}
            {provider.networkLocations && provider.networkLocations.length > 0 && (
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h4 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Network Locations Near You
                </h4>
                
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {provider.networkLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <div className="flex-1">
                        <h5 className="font-semibold font-poppins mb-1" style={{ color: 'var(--color-foreground)' }}>
                          {location.name}
                        </h5>
                        <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>
                          {location.address}, {location.city}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(location.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {location.rating} • {location.distance}
                          </span>
                        </div>
                      </div>
                      <button className="ml-4 p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                        <Phone className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Buy Now Button */}
            <div className="p-6">
              <div className="flex items-center justify-between p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div>
                  <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Total Premium
                  </h5>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Including selected add-ons
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    ₹{totalPremium.toLocaleString()}
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    + GST
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleBuyNow(provider)}
                className="w-full py-4 px-6 rounded-xl font-bold font-roboto text-white text-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Buy Now - ₹{Math.round(totalPremium * 1.18).toLocaleString()}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Persistent Navigation */}
      {renderPersistentNavbar()}

      {/* Header */}
      <div className="sticky top-16 z-40 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="rounded-xl shadow-lg p-6 mb-8" style={{ backgroundColor: 'var(--color-card)' }}>
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
            <div className="relative min-w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all w-full"
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
          </div>

          {/* Badge Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
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

        {/* Provider Cards */}
        {filteredProviders.length > 0 ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Available Providers ({filteredProviders.length})
              </h2>
            </div>
            
            <div className="space-y-6">
              {filteredProviders.map(provider => renderProviderCard(provider))}
            </div>
          </div>
        ) : (
          /* Empty State */
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
    </div>
  );
};

export default ProvidersPage;