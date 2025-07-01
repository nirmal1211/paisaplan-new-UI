import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Car, 
  Bike, 
  Shield, 
  FileText, 
  Download, 
  Calculator,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  DollarSign,
  Settings,
  Phone,
  Mail,
  MapPin,
  User,
  Hash,
  Wrench,
  CreditCard,
  RefreshCw,
  Plus
} from 'lucide-react';

// Lazy load components for better performance
const PremiumCalculator = lazy(() => import('./components/PremiumCalculator'));
const DocumentPreview = lazy(() => import('./components/DocumentPreview'));

// Types
type VehicleType = 'two-wheeler' | 'four-wheeler';

interface VehicleInfo {
  make: string;
  model: string;
  registrationNumber: string;
  manufacturingYear: number;
  engineNumber: string;
  chassisNumber: string;
  fuelType: string;
  cc: number;
}

interface PolicyData {
  policyNumber: string;
  coverageAmount: number;
  monthlyPremium: number;
  annualPremium: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'pending';
  vehicleInfo: VehicleInfo;
  baseCoverage: string[];
  addOns: Array<{
    name: string;
    price: number;
    included: boolean;
  }>;
  documents: Array<{
    name: string;
    type: string;
    url: string;
    size: string;
  }>;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loading Skeleton Component
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback: React.FC<{ error?: string }> = ({ error }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
    <p className="text-gray-600 mb-4">{error || 'Unable to load this section. Please try again.'}</p>
    <button 
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

// Main Component
const VehicleInsuranceDetailsPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType>('four-wheeler');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [policyData, setPolicyData] = useState<PolicyData | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Mock data - replace with actual API calls
  const mockPolicyData: Record<VehicleType, PolicyData> = {
    'four-wheeler': {
      policyNumber: 'CAR-2024-001',
      coverageAmount: 500000,
      monthlyPremium: 2500,
      annualPremium: 28000,
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      vehicleInfo: {
        make: 'Honda',
        model: 'City',
        registrationNumber: 'MH12AB1234',
        manufacturingYear: 2022,
        engineNumber: 'ENG123456789',
        chassisNumber: 'CHS987654321',
        fuelType: 'Petrol',
        cc: 1498
      },
      baseCoverage: [
        'Third Party Liability',
        'Own Damage Cover',
        'Personal Accident Cover',
        'Fire & Theft Protection'
      ],
      addOns: [
        { name: 'Zero Depreciation', price: 5000, included: true },
        { name: 'Engine Protection', price: 3000, included: false },
        { name: 'Roadside Assistance', price: 1500, included: true },
        { name: 'Return to Invoice', price: 4000, included: false }
      ],
      documents: [
        { name: 'Policy Certificate', type: 'PDF', url: '/docs/policy.pdf', size: '2.4 MB' },
        { name: 'Insurance Card', type: 'PDF', url: '/docs/card.pdf', size: '1.2 MB' },
        { name: 'Premium Receipt', type: 'PDF', url: '/docs/receipt.pdf', size: '0.8 MB' }
      ]
    },
    'two-wheeler': {
      policyNumber: 'BIKE-2024-001',
      coverageAmount: 150000,
      monthlyPremium: 800,
      annualPremium: 9000,
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      vehicleInfo: {
        make: 'Honda',
        model: 'Activa 6G',
        registrationNumber: 'MH12CD5678',
        manufacturingYear: 2023,
        engineNumber: 'ENG987654321',
        chassisNumber: 'CHS123456789',
        fuelType: 'Petrol',
        cc: 109
      },
      baseCoverage: [
        'Third Party Liability',
        'Own Damage Cover',
        'Personal Accident Cover'
      ],
      addOns: [
        { name: 'Zero Depreciation', price: 2000, included: true },
        { name: 'Engine Protection', price: 1500, included: false },
        { name: 'Roadside Assistance', price: 800, included: true }
      ],
      documents: [
        { name: 'Policy Certificate', type: 'PDF', url: '/docs/bike-policy.pdf', size: '1.8 MB' },
        { name: 'Insurance Card', type: 'PDF', url: '/docs/bike-card.pdf', size: '0.9 MB' }
      ]
    }
  };

  // Effects
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const loadPolicyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPolicyData(mockPolicyData[vehicleType]);
      } catch (err) {
        setError('Failed to load policy data');
        console.error('Error loading policy data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPolicyData();
  }, [vehicleType]);

  // Handlers
  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleVehicleTypeChange = (type: VehicleType) => {
    setVehicleType(type);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!isOnline) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">You're offline</h2>
          <p className="text-gray-600">Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${vehicleType === 'four-wheeler' ? 'Car' : 'Bike'} Insurance Details | InsureTech Pro`}</title>
        <meta name="description" content={`Manage your ${vehicleType} insurance policy details, coverage, and claims`} />
        <meta name="keywords" content={`${vehicleType}, insurance, policy, coverage, premium`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {vehicleType === 'four-wheeler' ? (
                    <Car className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                  ) : (
                    <Bike className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                  )}
                  <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {vehicleType === 'four-wheeler' ? 'Car' : 'Bike'} Insurance
                  </h1>
                </div>
              </div>

              {/* Vehicle Type Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleVehicleTypeChange('four-wheeler')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out ${
                    vehicleType === 'four-wheeler'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Switch to four-wheeler insurance"
                >
                  <Car className="h-4 w-4" />
                  <span>Four Wheeler</span>
                </button>
                <button
                  onClick={() => handleVehicleTypeChange('two-wheeler')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out ${
                    vehicleType === 'two-wheeler'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Switch to two-wheeler insurance"
                >
                  <Bike className="h-4 w-4" />
                  <span>Two Wheeler</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '90%' }}>
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorFallback error={error} />
          ) : policyData ? (
            <div className="space-y-8">
              {/* Policy Summary Card */}
              <ErrorBoundary fallback={<ErrorFallback error="Failed to load policy summary" />}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ padding: '1rem' }}>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold font-poppins mb-2">Policy Summary</h2>
                        <p className="text-blue-100">Policy #{policyData.policyNumber}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(policyData.status)}`}>
                          {policyData.status.charAt(0).toUpperCase() + policyData.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-5 w-5" />
                          <span className="text-sm font-medium">Coverage Amount</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                          {formatCurrency(policyData.coverageAmount)}
                        </p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="h-5 w-5" />
                          <span className="text-sm font-medium">Monthly Premium</span>
                        </div>
                        <p className="text-2xl font-bold">{formatCurrency(policyData.monthlyPremium)}</p>
                        <p className="text-sm text-blue-100">Annual: {formatCurrency(policyData.annualPremium)}</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="h-5 w-5" />
                          <span className="text-sm font-medium">Valid Period</span>
                        </div>
                        <p className="text-lg font-semibold">{formatDate(policyData.validFrom)}</p>
                        <p className="text-sm text-blue-100">to {formatDate(policyData.validTo)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>

              {/* Grid Layout for Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Vehicle Information Card */}
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load vehicle information" />}>
                  <div className="bg-white rounded-xl shadow-lg" style={{ padding: '1rem' }}>
                    <div className="flex items-center space-x-3 mb-4">
                      {vehicleType === 'four-wheeler' ? (
                        <Car className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                      ) : (
                        <Bike className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                      )}
                      <h3 className="text-lg font-semibold font-poppins">Vehicle Information</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Car className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Make & Model</p>
                          <p className="font-medium">{policyData.vehicleInfo.make} {policyData.vehicleInfo.model}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Registration Number</p>
                          <p className="font-medium font-mono">{policyData.vehicleInfo.registrationNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Manufacturing Year</p>
                          <p className="font-medium">{policyData.vehicleInfo.manufacturingYear}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Wrench className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Engine Number</p>
                          <p className="font-medium font-mono text-xs">{policyData.vehicleInfo.engineNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Chassis Number</p>
                          <p className="font-medium font-mono text-xs">{policyData.vehicleInfo.chassisNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>

                {/* Coverage Details Card */}
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load coverage details" />}>
                  <div className="bg-white rounded-xl shadow-lg" style={{ padding: '1rem' }}>
                    <button
                      onClick={() => toggleSection('coverage')}
                      className="w-full flex items-center justify-between mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                      aria-expanded={expandedSections.has('coverage')}
                      aria-controls="coverage-content"
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                        <h3 className="text-lg font-semibold font-poppins">Coverage Details</h3>
                      </div>
                      {expandedSections.has('coverage') ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    <div 
                      id="coverage-content"
                      className={`transition-all duration-300 ease-in-out ${
                        expandedSections.has('coverage') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Base Coverage</h4>
                          <div className="space-y-2">
                            {policyData.baseCoverage.map((coverage, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{coverage}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Add-ons</h4>
                          <div className="space-y-2">
                            {policyData.addOns.map((addon, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {addon.included ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Plus className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span className="text-sm">{addon.name}</span>
                                </div>
                                <span className="text-sm font-medium">{formatCurrency(addon.price)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>

                {/* Interactive Elements Card */}
                <ErrorBoundary fallback={<ErrorFallback error="Failed to load interactive elements" />}>
                  <div className="bg-white rounded-xl shadow-lg" style={{ padding: '1rem' }}>
                    <h3 className="text-lg font-semibold font-poppins mb-4">Quick Actions</h3>
                    
                    <div className="space-y-3">
                      <button 
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ 
                          backgroundColor: 'var(--color-primary)', 
                          color: 'white',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                        aria-label="File a new claim"
                      >
                        <FileText className="h-4 w-4" />
                        <span>File Claim</span>
                      </button>
                      
                      <button 
                        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ 
                          backgroundColor: 'var(--color-success)', 
                          color: 'white',
                          '--tw-ring-color': 'var(--color-success)'
                        }}
                        aria-label="Renew your policy"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Renew Policy</span>
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={() => toggleSection('documents')}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-gray-200"
                          aria-expanded={expandedSections.has('documents')}
                          aria-controls="documents-dropdown"
                        >
                          <div className="flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Download Documents</span>
                          </div>
                          {expandedSections.has('documents') ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        
                        <div 
                          id="documents-dropdown"
                          className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-200 ${
                            expandedSections.has('documents') ? 'opacity-100 visible' : 'opacity-0 invisible'
                          }`}
                        >
                          {policyData.documents.map((doc, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg focus:outline-none focus:bg-gray-50"
                              onClick={() => {
                                // Handle document download
                                console.log('Downloading:', doc.name);
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{doc.name}</span>
                              </div>
                              <span className="text-xs text-gray-500">{doc.size}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              </div>

              {/* Premium Calculator */}
              <ErrorBoundary fallback={<ErrorFallback error="Failed to load premium calculator" />}>
                <div className="bg-white rounded-xl shadow-lg" style={{ padding: '1rem' }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Calculator className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <h3 className="text-lg font-semibold font-poppins">Premium Calculator</h3>
                  </div>
                  
                  <Suspense fallback={<div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>}>
                    <PremiumCalculator vehicleType={vehicleType} />
                  </Suspense>
                </div>
              </ErrorBoundary>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default VehicleInsuranceDetailsPage;