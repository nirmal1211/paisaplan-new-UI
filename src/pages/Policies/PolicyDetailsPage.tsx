import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { mockPolicyDetails, mockFAQsDetailed } from '../../data/policyDetails';
import { Skeleton } from '../../components/UI/skeleton';
import PolicyHeader from '../../components/PolicyDetails/PolicyHeader';
import PolicyOverview from '../../components/PolicyDetails/PolicyOverview';
import TabNavigation, { TabType } from '../../components/PolicyDetails/TabNavigation';
import { 
  FileText, 
  MapPin, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Star,
  Phone,
  Navigation,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  CreditCard,
  Edit,
  Shield,
  Mail,
  MapPinIcon
} from 'lucide-react';

const PolicyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState(mockPolicyDetails);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle policy not found
  if (!loading && !policy) {
    return <Navigate to="/my-policy" replace />;
  }

  // Quick action handlers
  const handleDownload = () => {
    console.log('Downloading policy...');
    // Implement download logic
  };

  const handleShare = () => {
    console.log('Sharing policy...');
    // Implement share logic
  };

  const handlePrint = () => {
    console.log('Printing policy...');
    window.print();
  };

  // Filter hospitals based on search and specialty
  const filteredHospitals = policy?.hospitals.filter(hospital => {
    const matchesSearch = searchQuery === '' || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
      hospital.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  }) || [];

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(policy?.hospitals.flatMap(h => h.specialties) || [])
  ).sort();

  // Filter FAQs based on search
  const filteredFAQs = mockFAQsDetailed.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Header Skeleton */}
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-64 h-6" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-20 h-8" />
                <div className="flex space-x-2">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="w-full h-96 rounded-2xl mb-8" />
          <div className="flex space-x-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-32 h-10 rounded-lg" />
            ))}
          </div>
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Policy Benefits */}
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Policy Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policy.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Exclusions */}
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Policy Exclusions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policy.exclusions.map((exclusion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {exclusion}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Policy Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {policy.documents.map((doc) => (
                  <div key={doc.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <FileText className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {doc.name}
                        </h4>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {doc.size} • {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                        <Eye className="h-4 w-4 inline mr-2" />
                        View
                      </button>
                      <button className="py-2 px-3 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'hospitals':
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search hospitals by name, city, or specialty..."
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
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all min-w-48"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  >
                    <option value="all">All Specialties</option>
                    {allSpecialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
                </div>
              </div>
            </div>

            {/* Hospital Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <div key={hospital.id} className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                        {hospital.name}
                      </h3>
                      <p className="font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                        {hospital.address}, {hospital.city}, {hospital.state} - {hospital.pincode}
                      </p>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(hospital.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm font-roboto ml-2" style={{ color: 'var(--color-muted)' }}>
                            {hospital.rating} • {hospital.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {hospital.cashless && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Cashless
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
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
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                      <Phone className="h-4 w-4 inline mr-2" />
                      Call Hospital
                    </button>
                    <button className="py-2 px-4 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      <Navigation className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredHospitals.length === 0 && (
              <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
                <MapPin className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
                <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  No Hospitals Found
                </h3>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  No hospitals match your search criteria. Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        );

      case 'claims':
        return (
          <div className="space-y-6">
            {/* Claims Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Claims History
              </h2>
              
            </div>

            {/* Claims List */}
            <div className="space-y-4">
              {policy.claims.map((claim) => (
                <div key={claim.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        {getStatusIcon(claim.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {claim.claimNumber}
                        </h3>
                        <p className="font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                          {claim.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          <span>Type: {claim.type}</span>
                          <span>Amount: {claim.amount}</span>
                          <span>Submitted: {formatDate(claim.dateSubmitted)}</span>
                          {claim.dateProcessed && (
                            <span>Processed: {formatDate(claim.dateProcessed)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {claim.documents.length} document{claim.documents.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        View Details
                      </button>
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                        Track Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'endorsements':
        return (
          <div className="space-y-6">
            {/* Endorsements Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Policy Endorsements
              </h2>
            </div>

            {/* Endorsements List */}
            <div className="space-y-4">
              {policy.endorsements.map((endorsement) => (
                <div key={endorsement.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <Edit className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {endorsement.type}
                        </h3>
                        <p className="font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                          {endorsement.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          <span>Premium: {endorsement.premium}</span>
                          <span>Requested: {formatDate(endorsement.requestDate)}</span>
                          {endorsement.effectiveDate && (
                            <span>Effective: {formatDate(endorsement.effectiveDate)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(endorsement.status)}`}>
                      {endorsement.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {endorsement.documents.length} document{endorsement.documents.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            {/* Payment History Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Payment History
              </h2>
              <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                <Download className="h-4 w-4" />
                <span>Export History</span>
              </button>
            </div>

            {/* Payment Cards */}
            <div className="space-y-4">
              {policy.paymentHistory.map((payment) => (
                <div key={payment.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <CreditCard className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {payment.amount}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          <span>Date: {formatDate(payment.date)}</span>
                          <span>Method: {payment.method}</span>
                          <span>Receipt: {payment.receiptNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6">
            {/* FAQ Search */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
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
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left hover:opacity-80 transition-colors flex items-center justify-between"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {faq.question}
                      </h3>
                      <span 
                        className="inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-card)',
                          color: 'var(--color-primary)'
                        }}
                      >
                        {faq.category}
                      </span>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                    ) : (
                      <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <p className="font-roboto leading-relaxed" style={{ color: 'var(--color-foreground)' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
                <Search className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
                <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  No FAQs Found
                </h3>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  No FAQs match your search query. Try different keywords or browse all categories.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy.type} Insurance - ${policy.policyNumber} | InsureTech Pro`}</title>
        <meta name="description" content={`View details for your ${policy.type} insurance policy ${policy.policyNumber} with ${policy.provider}`} />
        <meta name="keywords" content={`insurance, ${policy.type}, policy details, ${policy.provider}`} />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Sticky Header */}
        <PolicyHeader
          policyNumber={policy.policyNumber}
          provider={policy.provider}
          status={policy.status}
          onDownload={handleDownload}
          onShare={handleShare}
          onPrint={handlePrint}
        />

        {/* Main Content Container */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Policy Overview Card */}
          <div className="mb-8">
            <PolicyOverview policy={policy} />
          </div>

          {/* Tab Navigation */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className="py-8">
            {renderTabContent()}
          </div>

          {/* Support Section */}
          <div className="mt-16 rounded-xl shadow-lg p-8 border" style={{ 
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)'
          }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Need Support?
              </h2>
              
              {/* Trovity Logo */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    Trovity
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Contact Email */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Mail className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Email Support
                </h3>
                <a 
                  href="mailto:support@trovity.com"
                  className="font-roboto hover:underline transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  support@trovity.com
                </a>
              </div>

              {/* Phone Number */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Phone className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Phone Support
                </h3>
                <a 
                  href="tel:+911800123456"
                  className="font-roboto hover:underline transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  +91 1800 123 456
                </a>
              </div>

              {/* Business Hours */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Clock className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Business Hours
                </h3>
                <div className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <MapPinIcon className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  </div>
                </div>
                <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Office Address
                </h3>
                <div className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                  <p>Trovity Insurance Ltd.</p>
                  <p>123 Business District</p>
                  <p>Mumbai, Maharashtra 400001</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyDetailsPage;