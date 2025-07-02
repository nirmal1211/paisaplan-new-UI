import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Phone, 
  Clock, 
  FileText, 
  Shield, 
  Calculator, 
  CreditCard, 
  Download, 
  Plus, 
  Minus, 
  Info,
  Users,
  Award,
  TrendingUp,
  Heart,
  Car,
  Bike
} from 'lucide-react';

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

const ProviderDetailsPage: React.FC = () => {
  const { policyType, providerId } = useParams<{ policyType: string; providerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPremium, setTotalPremium] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['benefits']);

  const formData = location.state?.formData;
  const provider = location.state?.provider;

  // Mock detailed provider data
  const providerDetails = {
    'star-health': {
      name: 'Star Health Insurance',
      logo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.5,
      reviews: 12500,
      basePremium: 18500,
      claimSettlementRatio: 94.2,
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
        },
        {
          id: 'wellness',
          name: 'Wellness Program',
          description: 'Preventive healthcare and wellness benefits',
          premium: 800,
          isSelected: false,
          isAvailable: true,
          terms: ['Annual health checkup', 'Vaccination coverage', 'Health coaching sessions']
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
        },
        {
          id: '3',
          name: 'Lilavati Hospital',
          address: '789 Care Road, Bandra',
          city: 'Mumbai',
          distance: '5.2 km',
          rating: 4.7,
          specialties: ['Emergency', 'ICU', 'Surgery'],
          phone: '+91-22-3456-7890'
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
    }
    // Add other providers...
  };

  const currentProvider = providerDetails[providerId as keyof typeof providerDetails];

  useEffect(() => {
    if (!currentProvider || !formData) {
      navigate(`/buy-policy/${policyType}/providers`);
      return;
    }
    setTotalPremium(currentProvider.basePremium);
  }, [currentProvider, formData, navigate, policyType]);

  useEffect(() => {
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = currentProvider?.addOns.find(a => a.id === addOnId);
      return total + (addOn?.premium || 0);
    }, 0);
    setTotalPremium((currentProvider?.basePremium || 0) + addOnTotal);
  }, [selectedAddOns, currentProvider]);

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handlePurchase = () => {
    const purchaseData = {
      formData,
      provider: currentProvider,
      selectedAddOns,
      totalPremium
    };
    
    // Navigate to payment page
    navigate(`/buy-policy/${policyType}/${providerId}/payment`, { 
      state: purchaseData 
    });
  };

  if (!currentProvider) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Provider Not Found
          </h2>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            The requested provider details are not available.
          </p>
          <button
            onClick={() => navigate(`/buy-policy/${policyType}/providers`)}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Back to Providers
          </button>
        </div>
      </div>
    );
  }

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
                onClick={() => navigate(`/buy-policy/${policyType}/providers`)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={currentProvider.logo}
                  alt={currentProvider.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {currentProvider.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(currentProvider.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {currentProvider.rating} ({currentProvider.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Display */}
            <div className="text-right">
              <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                ₹{totalPremium.toLocaleString()}
              </div>
              <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                Total Annual Premium
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-30 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide p-4">
            {[
              { id: 'overview', label: 'Overview', icon: Shield },
              { id: 'coverage', label: 'Coverage Details', icon: FileText },
              { id: 'addons', label: 'Add-ons', icon: Plus },
              { id: 'network', label: 'Network', icon: MapPin },
              { id: 'claims', label: 'Claims Process', icon: Clock },
              { id: 'payment', label: 'Payment', icon: CreditCard }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'shadow-sm transform scale-105' 
                      : 'hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--color-card)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
                    border: isActive ? `1px solid var(--color-border)` : '1px solid transparent'
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Provider Overview */}
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                About {currentProvider.name}
              </h2>
              <p className="font-roboto mb-6" style={{ color: 'var(--color-foreground)' }}>
                {currentProvider.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                    {currentProvider.claimSettlementRatio}%
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Claim Settlement Ratio
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                    9000+
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Network Hospitals
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                    {currentProvider.reviews.toLocaleString()}
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Customer Reviews
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentProvider.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'coverage' && (
          <div className="space-y-6">
            {/* What's Covered */}
            <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
              <button
                onClick={() => toggleSection('covered')}
                className="flex items-center justify-between w-full p-6 transition-all"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    What's Covered
                  </h3>
                </div>
                {expandedSections.includes('covered') ? 
                  <Minus className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> :
                  <Plus className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                }
              </button>
              {expandedSections.includes('covered') && (
                <div className="p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProvider.coverage.covered.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* What's Not Covered */}
            <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
              <button
                onClick={() => toggleSection('notCovered')}
                className="flex items-center justify-between w-full p-6 transition-all"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center space-x-3">
                  <XCircle className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    What's Not Covered
                  </h3>
                </div>
                {expandedSections.includes('notCovered') ? 
                  <Minus className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> :
                  <Plus className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                }
              </button>
              {expandedSections.includes('notCovered') && (
                <div className="p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProvider.coverage.notCovered.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'addons' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Available Add-ons
              </h2>
              
              <div className="space-y-4">
                {currentProvider.addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                      selectedAddOns.includes(addOn.id) ? 'shadow-lg' : 'hover:shadow-md'
                    }`}
                    style={{
                      borderColor: selectedAddOns.includes(addOn.id) 
                        ? 'var(--color-primary)' 
                        : 'var(--color-border)',
                      backgroundColor: selectedAddOns.includes(addOn.id) 
                        ? 'var(--color-secondary)' 
                        : 'transparent'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addOn.id)}
                            onChange={() => toggleAddOn(addOn.id)}
                            className="w-5 h-5 rounded"
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <div>
                            <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                              {addOn.name}
                            </h3>
                            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                              {addOn.description}
                            </p>
                          </div>
                        </div>

                        {addOn.terms && (
                          <div className="ml-8">
                            <h4 className="text-sm font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                              Terms & Conditions:
                            </h4>
                            <ul className="space-y-1">
                              {addOn.terms.map((term, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                                  <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                                    {term}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="text-right ml-6">
                        <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          +₹{addOn.premium.toLocaleString()}
                        </div>
                        <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          Annual Premium
                        </div>
                        {addOn.sumInsured && (
                          <div className="text-sm font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                            Coverage: ₹{addOn.sumInsured.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium Calculator */}
              <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Premium Breakdown
                    </h3>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Base Premium:</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          ₹{currentProvider.basePremium.toLocaleString()}
                        </span>
                      </div>
                      {selectedAddOns.map(addOnId => {
                        const addOn = currentProvider.addOns.find(a => a.id === addOnId);
                        return addOn ? (
                          <div key={addOnId} className="flex justify-between">
                            <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>{addOn.name}:</span>
                            <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                              +₹{addOn.premium.toLocaleString()}
                            </span>
                          </div>
                        ) : null;
                      })}
                      <div className="border-t pt-2" style={{ borderColor: 'var(--color-border)' }}>
                        <div className="flex justify-between">
                          <span className="font-bold font-roboto" style={{ color: 'var(--color-foreground)' }}>Total Premium:</span>
                          <span className="font-bold font-poppins text-xl" style={{ color: 'var(--color-primary)' }}>
                            ₹{totalPremium.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Network Hospitals Near You
              </h2>
              
              <div className="space-y-4">
                {currentProvider.networkLocations.map((location) => (
                  <div key={location.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                          {location.name}
                        </h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(location.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {location.rating} • {location.distance}
                          </span>
                        </div>
                        <p className="font-roboto mb-3" style={{ color: 'var(--color-muted)' }}>
                          {location.address}, {location.city}
                        </p>
                        {location.specialties && (
                          <div className="flex flex-wrap gap-2">
                            {location.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{ 
                                  backgroundColor: 'var(--color-secondary)',
                                  color: 'var(--color-primary)'
                                }}
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="ml-6">
                        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Claims Process
              </h2>
              
              <div className="space-y-4">
                {currentProvider.claimProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--color-primary)' }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Required Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentProvider.requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FileText className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                      <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Payment Information
              </h2>
              
              {/* Premium Summary */}
              <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Premium Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Base Premium:</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      ₹{currentProvider.basePremium.toLocaleString()}
                    </span>
                  </div>
                  {selectedAddOns.map(addOnId => {
                    const addOn = currentProvider.addOns.find(a => a.id === addOnId);
                    return addOn ? (
                      <div key={addOnId} className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>{addOn.name}:</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          +₹{addOn.premium.toLocaleString()}
                        </span>
                      </div>
                    ) : null;
                  })}
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>GST (18%):</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      ₹{Math.round(totalPremium * 0.18).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex justify-between">
                      <span className="font-bold font-roboto text-lg" style={{ color: 'var(--color-foreground)' }}>Total Amount:</span>
                      <span className="font-bold font-poppins text-2xl" style={{ color: 'var(--color-primary)' }}>
                        ₹{Math.round(totalPremium * 1.18).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Available Payment Methods
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentProvider.paymentMethods.map((method, index) => (
                    <div key={index} className="p-4 rounded-lg border text-center" style={{ borderColor: 'var(--color-border)' }}>
                      <CreditCard className="h-6 w-6 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {method}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <label htmlFor="terms" className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    I agree to the{' '}
                    <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="underline" style={{ color: 'var(--color-primary)' }}>
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="mt-8">
                <button
                  onClick={handlePurchase}
                  className="w-full py-4 px-6 rounded-xl font-bold font-roboto text-white text-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Buy Now - ₹{Math.round(totalPremium * 1.18).toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDetailsPage;