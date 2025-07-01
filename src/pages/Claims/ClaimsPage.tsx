import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
  Eye,
  Download,
  Upload,
  Camera,
  MapPin
} from 'lucide-react';
import { useIsMobile, useIsTablet } from '../../hooks/useIsMobile';

interface Claim {
  id: string;
  claimNumber: string;
  type: string;
  amount: string;
  status: 'approved' | 'pending' | 'processing' | 'rejected';
  dateSubmitted: string;
  dateProcessed?: string;
  description: string;
  documents: string[];
  hospital?: string;
  policyNumber: string;
}

const ClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [showFileClaimModal, setShowFileClaimModal] = useState(false);
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Mock claims data
  useEffect(() => {
    const mockClaims: Claim[] = [
      {
        id: '1',
        claimNumber: 'CLM2024001',
        type: 'Hospitalization',
        amount: '₹45,000',
        status: 'approved',
        dateSubmitted: '2024-03-15',
        dateProcessed: '2024-03-20',
        description: 'Emergency appendectomy at Apollo Hospital',
        documents: ['medical-report.pdf', 'discharge-summary.pdf', 'bills.pdf'],
        hospital: 'Apollo Hospital, Mumbai',
        policyNumber: 'HLTH12345'
      },
      {
        id: '2',
        claimNumber: 'CLM2024002',
        type: 'Day Care',
        amount: '₹12,000',
        status: 'processing',
        dateSubmitted: '2024-05-10',
        description: 'Cataract surgery for dependent',
        documents: ['pre-auth.pdf', 'medical-report.pdf'],
        hospital: 'Fortis Hospital, Mumbai',
        policyNumber: 'HLTH12345'
      },
      {
        id: '3',
        claimNumber: 'CLM2024003',
        type: 'Health Checkup',
        amount: '₹3,500',
        status: 'pending',
        dateSubmitted: '2024-05-18',
        description: 'Annual health checkup package',
        documents: ['health-report.pdf'],
        hospital: 'Lilavati Hospital, Mumbai',
        policyNumber: 'HLTH12345'
      }
    ];

    setTimeout(() => {
      setClaims(mockClaims);
      setLoading(false);
    }, 1000);
  }, []);

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

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = searchQuery === '' || 
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleClaimExpansion = (claimId: string) => {
    setExpandedClaim(expandedClaim === claimId ? null : claimId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading claims...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Claims Management | InsureTech Pro</title>
        <meta name="description" content="File and track your insurance claims with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Fixed Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md border-b shadow-sm transition-shadow duration-200" 
             style={{ 
               backgroundColor: 'var(--color-background)', 
               borderColor: 'var(--color-border)',
               height: '60px'
             }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Company Logo */}
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  Trovity
                </span>
              </div>

              {/* Policy Number - Center */}
              {!isMobile && (
                <div className="text-center">
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Policy Number
                  </p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    HLTH12345
                  </p>
                </div>
              )}

              {/* Emergency Contact */}
              <button
                onClick={() => setShowEmergencyContact(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--color-danger)',
                  minHeight: '44px'
                }}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Policy Information - Collapsible */}
          <div className="mb-6">
            <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
              <div 
                className="p-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setExpandedClaim(expandedClaim === 'policy-info' ? null : 'policy-info')}
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Health Insurance Policy
                    </h2>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      HLTH12345 • Star Health Insurance
                    </p>
                  </div>
                  {expandedClaim === 'policy-info' ? (
                    <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  ) : (
                    <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  )}
                </div>
              </div>
              
              {expandedClaim === 'policy-info' && (
                <div className="p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Coverage Period</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        Jan 15, 2024 - Jan 14, 2025
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Sum Insured</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        ₹10,00,000
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Status</p>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  {/* Dependents */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Covered Members (4)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['You (Primary)', 'Sarah Johnson (Spouse)', 'Mike Johnson (Son)', 'Emma Johnson (Daughter)'].map((member, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-primary)'
                          }}
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Cashless Treatment at 9000+ hospitals',
                        'Pre & Post Hospitalization (30-60 days)',
                        'Day Care Procedures',
                        'Annual Health Checkup'
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File Claim Button - Prominent */}
          <div className="mb-6">
            <button
              onClick={() => setShowFileClaimModal(true)}
              className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold font-poppins text-white transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                minHeight: '60px',
                fontSize: '18px'
              }}
            >
              <Plus className="h-6 w-6" />
              <span>File New Claim</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search claims by number, type, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)',
                      minHeight: '44px'
                    }}
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)',
                      minHeight: '44px',
                      minWidth: '150px'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Claims History */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
              Recent Claims ({filteredClaims.length})
            </h2>
            
            {filteredClaims.length === 0 ? (
              <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <FileText className="h-8 w-8" style={{ color: 'var(--color-muted)' }} />
                </div>
                <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  No Claims Found
                </h3>
                <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
                  {searchQuery ? 'No claims match your search criteria.' : 'You haven\'t filed any claims yet.'}
                </p>
                <button
                  onClick={() => setShowFileClaimModal(true)}
                  className="px-6 py-3 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  File Your First Claim
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredClaims.map((claim) => (
                  <div key={claim.id} className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            {getStatusIcon(claim.status)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold font-poppins mb-1" style={{ color: 'var(--color-foreground)' }}>
                              {claim.claimNumber}
                            </h3>
                            <p className="font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                              {claim.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Submitted: {formatDate(claim.dateSubmitted)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>Amount: {claim.amount}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>Type: {claim.type}</span>
                              </div>
                              {claim.hospital && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{claim.hospital}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                            {claim.status}
                          </span>
                          <button
                            onClick={() => toggleClaimExpansion(claim.id)}
                            className="p-2 rounded-lg transition-all duration-200"
                            style={{ 
                              backgroundColor: 'var(--color-secondary)',
                              color: 'var(--color-primary)'
                            }}
                          >
                            {expandedClaim === claim.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedClaim === claim.id && (
                        <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                                Claim Details
                              </h4>
                              <div className="space-y-2 text-sm font-roboto">
                                <div className="flex justify-between">
                                  <span style={{ color: 'var(--color-muted)' }}>Policy Number:</span>
                                  <span style={{ color: 'var(--color-foreground)' }}>{claim.policyNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span style={{ color: 'var(--color-muted)' }}>Claim Type:</span>
                                  <span style={{ color: 'var(--color-foreground)' }}>{claim.type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span style={{ color: 'var(--color-muted)' }}>Amount:</span>
                                  <span style={{ color: 'var(--color-primary)' }} className="font-semibold">{claim.amount}</span>
                                </div>
                                {claim.dateProcessed && (
                                  <div className="flex justify-between">
                                    <span style={{ color: 'var(--color-muted)' }}>Processed:</span>
                                    <span style={{ color: 'var(--color-foreground)' }}>{formatDate(claim.dateProcessed)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                                Documents ({claim.documents.length})
                              </h4>
                              <div className="space-y-2">
                                {claim.documents.map((doc, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                                      <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                        {doc}
                                      </span>
                                    </div>
                                    <div className="flex space-x-1">
                                      <button className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: 'var(--color-primary)' }}>
                                        <Eye className="h-4 w-4" />
                                      </button>
                                      <button className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: 'var(--color-primary)' }}>
                                        <Download className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                              Track Status
                            </button>
                            <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                              Contact Support
                            </button>
                            <button className="flex-1 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-primary)', border: `1px solid var(--color-border)` }}>
                              Download Receipt
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* File Claim Modal */}
        {showFileClaimModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="p-6">
                <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  File New Claim
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Claim Type
                    </label>
                    <select className="w-full p-3 border rounded-lg font-roboto focus:outline-none focus:ring-2" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                      <option>Hospitalization</option>
                      <option>Day Care</option>
                      <option>Health Checkup</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Description
                    </label>
                    <textarea 
                      className="w-full p-3 border rounded-lg font-roboto focus:outline-none focus:ring-2" 
                      rows={3}
                      placeholder="Describe your claim..."
                      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--color-border)' }}>
                      <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-muted)' }} />
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Drag and drop files or click to browse
                      </p>
                      <div className="flex justify-center space-x-2 mt-3">
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                          <Upload className="h-4 w-4" />
                          <span>Browse Files</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                          <Camera className="h-4 w-4" />
                          <span>Take Photo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowFileClaimModal(false)}
                    className="flex-1 py-3 px-4 rounded-lg font-medium font-roboto transition-all duration-200"
                    style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-3 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Submit Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact Modal */}
        {showEmergencyContact && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-sm w-full" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="p-6">
                <h3 className="text-xl font-bold font-poppins mb-4 text-center" style={{ color: 'var(--color-foreground)' }}>
                  Emergency Contact
                </h3>
                
                <div className="text-center mb-6">
                  <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-danger)' }}>
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
                    24/7 Emergency Helpline
                  </p>
                  <a 
                    href="tel:+911800123456"
                    className="text-2xl font-bold font-poppins hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    +91 1800 123 456
                  </a>
                </div>
                
                <div className="space-y-3">
                  <a
                    href="tel:+911800123456"
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => setShowEmergencyContact(false)}
                    className="w-full py-3 px-4 rounded-lg font-medium font-roboto transition-all duration-200"
                    style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimsPage;