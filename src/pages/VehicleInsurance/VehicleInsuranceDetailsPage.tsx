import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer, 
  Copy, 
  Check, 
  Shield, 
  Users, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  Star,
  FileText,
  MapPin,
  Search,
  Filter,
  Eye,
  Navigation,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  CreditCard,
  Edit,
  Car,
  User,
  Camera,
  Wrench,
  Activity,
  TrendingUp,
  Calculator,
  HelpCircle,
  ExternalLink,
  Zap,
  Award,
  Target,
  BarChart3,
  PieChart,
  Receipt,
  Gavel,
  MapPinIcon,
  AlertCircleIcon,
  PaymentIcon,
  CalendarIcon,
  ClockIcon
} from 'lucide-react';
import { InsurancePolicy, NavigationState, PremiumCalculatorParams, PremiumCalculationResult } from '../../types/insurance';
import { VehicleDashboardData } from '../../types/vehicleDashboard';
import { Challan, ChallanSummary, VIOLATION_TYPES } from '../../types/challans';
import { mockVehicleDashboardData } from '../../data/vehicleDashboardData';
import { mockChallansData, calculateChallanSummary } from '../../data/challansData';
import { premiumCalculator } from '../../utils/premiumCalculator';
import { Skeleton } from '../../components/UI/skeleton';

type TabType = 'overview' | 'coverage' | 'vehicle' | 'drivers' | 'claims' | 'documents' | 'calculator' | 'challans';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [selectedCoverage, setSelectedCoverage] = useState<string>('all');
  const [selectedDriver, setSelectedDriver] = useState<string>('all');
  const [selectedClaimStatus, setSelectedClaimStatus] = useState<string>('all');
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('all');
  const [calculatorParams, setCalculatorParams] = useState<PremiumCalculatorParams | null>(null);
  const [calculationResult, setCalculationResult] = useState<PremiumCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Challans state
  const [challansData, setChallansData] = useState<Challan[]>([]);
  const [challansSummary, setChallansSummary] = useState<ChallanSummary | null>(null);
  const [challanDateFilter, setChallanDateFilter] = useState({ from: '', to: '' });
  const [challanViolationFilter, setChallanViolationFilter] = useState<string>('all');
  const [challanStatusFilter, setChallanStatusFilter] = useState<string>('all');
  const [challanSearchQuery, setChallanSearchQuery] = useState('');

  // Get navigation state
  const navigationState = location.state as NavigationState | null;
  const [policy, setPolicy] = useState<InsurancePolicy | null>(navigationState?.policy || null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData | null>(null);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (navigationState?.policy) {
          setPolicy(navigationState.policy);
          setCalculatorParams(navigationState.calculatorParams);
          
          // Set dashboard data with policy
          const data = { ...mockVehicleDashboardData, policy: navigationState.policy };
          setDashboardData(data);
        }

        // Load challans data
        setChallansData(mockChallansData);
        setChallansSummary(calculateChallanSummary(mockChallansData));

        setLoading(false);
      } catch (error) {
        console.error('Error initializing data:', error);
        setLoading(false);
      }
    };

    initializeData();
  }, [navigationState]);

  // Filter challans based on search and filters
  const filteredChallans = useMemo(() => {
    return challansData.filter(challan => {
      const matchesSearch = challanSearchQuery === '' || 
        challan.challanNumber.toLowerCase().includes(challanSearchQuery.toLowerCase()) ||
        challan.violationType.toLowerCase().includes(challanSearchQuery.toLowerCase()) ||
        challan.location.address.toLowerCase().includes(challanSearchQuery.toLowerCase());
      
      const matchesViolation = challanViolationFilter === 'all' || 
        challan.violationType === challanViolationFilter;
      
      const matchesStatus = challanStatusFilter === 'all' || 
        challan.paymentStatus === challanStatusFilter;
      
      const matchesDateRange = (!challanDateFilter.from || challan.date >= challanDateFilter.from) &&
        (!challanDateFilter.to || challan.date <= challanDateFilter.to);
      
      return matchesSearch && matchesViolation && matchesStatus && matchesDateRange;
    });
  }, [challansData, challanSearchQuery, challanViolationFilter, challanStatusFilter, challanDateFilter]);

  // Handle policy not found
  if (!loading && !policy) {
    return <Navigate to="/my-policy" replace />;
  }

  // Copy policy number to clipboard
  const copyPolicyNumber = async () => {
    if (policy?.policyNumber) {
      try {
        await navigator.clipboard.writeText(policy.policyNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy policy number:', err);
      }
    }
  };

  // Quick action handlers
  const handleDownload = () => {
    console.log('Downloading policy...');
  };

  const handleShare = () => {
    console.log('Sharing policy...');
  };

  const handlePrint = () => {
    console.log('Printing policy...');
    window.print();
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Calculate premium
  const calculatePremium = async () => {
    if (!calculatorParams) return;

    setIsCalculating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate calculation
      const result = premiumCalculator.calculatePremium(calculatorParams);
      setCalculationResult(result);
    } catch (error) {
      console.error('Premium calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'settled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'unpaid':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'partial':
      case 'disputed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get violation severity color
  const getViolationSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-blue-100 text-blue-800';
      case 'major':
        return 'bg-orange-100 text-orange-800';
      case 'serious':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get unique violation types for filter
  const uniqueViolationTypes = useMemo(() => {
    return Array.from(new Set(challansData.map(c => c.violationType))).sort();
  }, [challansData]);

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="w-full h-96 rounded-2xl mb-8" />
          <div className="flex space-x-4 mb-8">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="w-32 h-10 rounded-lg" />
            ))}
          </div>
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  const renderChallansTab = () => (
    <div className="space-y-6">
      {/* Challans Summary */}
      {challansSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Receipt className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Challans</p>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {challansSummary.totalChallans}
                </p>
              </div>
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              {challansSummary.recentViolations} in last 6 months
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertCircleIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Unpaid Challans</p>
                <p className="text-2xl font-bold font-poppins text-red-600">
                  {challansSummary.unpaidChallans}
                </p>
              </div>
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              {formatCurrency(challansSummary.totalPendingAmount)} pending
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Paid Challans</p>
                <p className="text-2xl font-bold font-poppins text-green-600">
                  {challansSummary.paidChallans}
                </p>
              </div>
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              {formatCurrency(challansSummary.totalPaidAmount)} paid
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium Impact</p>
                <p className="text-2xl font-bold font-poppins text-orange-600">
                  +{formatCurrency(challansSummary.premiumImpact)}
                </p>
              </div>
            </div>
            <div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
              Annual increase
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder="Search by challan number, violation, or location..."
              value={challanSearchQuery}
              onChange={(e) => setChallanSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            />
          </div>

          {/* Violation Type Filter */}
          <div className="relative">
            <select
              value={challanViolationFilter}
              onChange={(e) => setChallanViolationFilter(e.target.value)}
              className="w-full appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            >
              <option value="all">All Violations</option>
              {uniqueViolationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={challanStatusFilter}
              onChange={(e) => setChallanStatusFilter(e.target.value)}
              className="w-full appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
              <option value="disputed">Disputed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
          </div>

          {/* Date Range */}
          <div className="flex space-x-2">
            <input
              type="date"
              value={challanDateFilter.from}
              onChange={(e) => setChallanDateFilter(prev => ({ ...prev, from: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
              placeholder="From"
            />
            <input
              type="date"
              value={challanDateFilter.to}
              onChange={(e) => setChallanDateFilter(prev => ({ ...prev, to: e.target.value }))}
              className="flex-1 border rounded-lg px-3 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
              placeholder="To"
            />
          </div>
        </div>

        {/* Filter Results Info */}
        {(challanSearchQuery || challanViolationFilter !== 'all' || challanStatusFilter !== 'all' || challanDateFilter.from || challanDateFilter.to) && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Showing {filteredChallans.length} of {challansData.length} challans
              {challanSearchQuery && ` matching "${challanSearchQuery}"`}
            </p>
          </div>
        )}
      </div>

      {/* Challans List */}
      <div className="space-y-4">
        {filteredChallans.length === 0 ? (
          <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
            <Receipt className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              No Challans Found
            </h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              {challansData.length === 0 
                ? 'No traffic violations recorded for this vehicle.'
                : 'No challans match your current filters. Try adjusting your search criteria.'
              }
            </p>
          </div>
        ) : (
          filteredChallans.map((challan) => (
            <div key={challan.id} className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {challan.challanNumber}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(challan.paymentStatus)}`}>
                      {challan.paymentStatus.charAt(0).toUpperCase() + challan.paymentStatus.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getViolationSeverityColor(challan.severity)}`}>
                      {challan.severity}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Date & Time</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatDate(challan.date)}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {challan.time}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Violation</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {challan.violationType}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Code: {challan.violationCode}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Location</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {challan.location.city}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {challan.location.address}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Fine Amount</p>
                      <p className="font-semibold font-poppins text-lg" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(challan.totalAmount)}
                      </p>
                      {challan.paymentStatus === 'unpaid' && (
                        <p className="text-sm font-roboto text-red-600">
                          Due: {formatDate(challan.dueDate)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>Description:</p>
                    <p className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {challan.description}
                    </p>
                  </div>

                  {challan.paymentStatus === 'paid' && challan.paymentDate && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Payment Completed</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-700">Payment Date: </span>
                          <span className="font-semibold">{formatDate(challan.paymentDate)}</span>
                        </div>
                        <div>
                          <span className="text-green-700">Method: </span>
                          <span className="font-semibold">{challan.paymentMethod}</span>
                        </div>
                        {challan.receiptNumber && (
                          <div className="col-span-2">
                            <span className="text-green-700">Receipt: </span>
                            <span className="font-semibold">{challan.receiptNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      <span>Authority: {challan.issuingAuthority}</span>
                      {challan.officerName && <span>Officer: {challan.officerName}</span>}
                      {challan.points && <span>Points: {challan.points}</span>}
                    </div>
                    
                    <div className="flex space-x-2">
                      {challan.paymentStatus === 'unpaid' && (
                        <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                          Pay Now
                        </button>
                      )}
                      
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        <Eye className="h-4 w-4 inline mr-2" />
                        View Details
                      </button>
                      
                      {challan.documents.length > 0 && (
                        <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                          <Download className="h-4 w-4 inline mr-2" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'challans':
        return renderChallansTab();
      // ... other existing tab cases would go here
      default:
        return (
          <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Tab
            </h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              Content for {activeTab} tab will be implemented here.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy?.vehicle.make} ${policy?.vehicle.model} Insurance - ${policy?.policyNumber} | Trovity`}</title>
        <meta name="description" content={`Comprehensive vehicle insurance dashboard for ${policy?.vehicle.make} ${policy?.vehicle.model} with policy ${policy?.policyNumber}`} />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ 
          backgroundColor: 'var(--color-background)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Breadcrumb and Back Button */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                <nav className="flex items-center space-x-2 text-sm font-roboto">
                  <span style={{ color: 'var(--color-muted)' }}>My Policies</span>
                  <span style={{ color: 'var(--color-muted)' }}>/</span>
                  <span style={{ color: 'var(--color-foreground)' }}>Vehicle Insurance</span>
                </nav>
              </div>

              {/* Policy Info and Actions */}
              <div className="flex items-center space-x-6">
                {/* Policy Number with Copy */}
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Policy:
                  </span>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy?.policyNumber}
                    </span>
                    <button
                      onClick={copyPolicyNumber}
                      className="p-1 rounded hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-primary)' }}
                      title="Copy policy number"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(policy?.status || 'active')}`}>
                  {policy?.status}
                </span>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                    title="Download Policy"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                    title="Share Policy"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                    title="Print Policy"
                  >
                    <Printer className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Policy Overview Card */}
          {policy && (
            <div className="mb-8 rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
              {/* Gradient Header */}
              <div 
                className="p-8 text-white relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Car className="h-8 w-8" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold font-poppins">
                          {policy.vehicle.make} {policy.vehicle.model}
                        </h1>
                        <p className="text-white/80 font-roboto text-lg">{policy.provider}</p>
                        <p className="text-white/60 font-roboto">{policy.vehicle.registrationNumber}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-white/80 font-roboto text-sm">Policy Status</p>
                      <p className="text-xl font-bold font-poppins">{policy.status}</p>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Shield className="h-6 w-6" />
                        <span className="font-roboto text-white/80">Coverage Value</span>
                      </div>
                      <p className="text-3xl font-bold font-poppins">
                        {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-6 w-6" />
                        <span className="font-roboto text-white/80">Annual Premium</span>
                      </div>
                      <p className="text-3xl font-bold font-poppins">
                        {formatCurrency(policy.premiumBreakdown.totalPremium)}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-6 w-6" />
                        <span className="font-roboto text-white/80">Valid Until</span>
                      </div>
                      <p className="text-3xl font-bold font-poppins">
                        {formatDate(policy.policyTerm.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="sticky top-20 z-30 backdrop-blur-md border-b mb-8" style={{ 
            backgroundColor: 'var(--color-background)', 
            borderColor: 'var(--color-border)' 
          }}>
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide p-4">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'coverage', label: 'Coverage Details', icon: Shield },
                { id: 'vehicle', label: 'Vehicle Info', icon: Car },
                { id: 'drivers', label: 'Drivers', icon: Users },
                { id: 'claims', label: 'Claims', icon: AlertTriangle },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'calculator', label: 'Premium Calculator', icon: Calculator },
                { id: 'challans', label: 'Challans', icon: Gavel }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
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

          {/* Tab Content */}
          <div className="py-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleInsuranceDetailsPage;