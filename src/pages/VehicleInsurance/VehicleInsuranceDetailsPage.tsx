import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Calculator, 
  Shield, 
  Car, 
  User, 
  FileText, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  RefreshCw,
  Download,
  Share2,
  Printer,
  AlertTriangle,
  CheckCircle,
  Info,
  Copy,
  Check,
  Eye,
  Search,
  Filter,
  Upload,
  MessageSquare,
  Clock,
  Star,
  Navigation,
  Camera,
  Settings,
  Users,
  TrendingUp,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  Minus,
  X,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { InsurancePolicy, NavigationState, PremiumCalculatorParams, AddOnCoverage } from '../../types/insurance';
import { premiumCalculator, PremiumCalculationResult } from '../../utils/premiumCalculator';
import { mockVehicleDashboardData, VehicleDashboardData } from '../../data/vehicleDashboardData';

type DashboardSection = 'overview' | 'vehicle' | 'drivers' | 'coverage' | 'claims' | 'documents' | 'calculator';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract navigation state
  const navigationState = location.state as NavigationState | null;
  
  // Component state
  const [policy, setPolicy] = useState<InsurancePolicy | null>(navigationState?.policy || null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(mockVehicleDashboardData);
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [calculatorParams, setCalculatorParams] = useState<PremiumCalculatorParams>(
    navigationState?.calculatorParams || {} as PremiumCalculatorParams
  );
  const [premiumCalculation, setPremiumCalculation] = useState<PremiumCalculationResult | null>(null);
  const [availableAddOns, setAvailableAddOns] = useState<AddOnCoverage[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['policy-overview']));
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate navigation state
        if (!navigationState || !policy) {
          throw new Error('Policy data not found. Please navigate from the policies page.');
        }

        // Validate policy ID matches route parameter
        if (policy.id !== id) {
          throw new Error('Policy ID mismatch. Invalid navigation.');
        }

        // Update dashboard data with policy
        setDashboardData(prev => ({ ...prev, policy }));

        // Load available add-ons
        const addOns = premiumCalculator.getAvailableAddOns(policy.vehicle.vehicleType);
        
        // Update add-ons with current selections
        const updatedAddOns = addOns.map(addon => ({
          ...addon,
          isSelected: policy.addOns.some(policyAddon => 
            policyAddon.id === addon.id && policyAddon.isSelected
          )
        }));
        
        setAvailableAddOns(updatedAddOns);

        // Calculate initial premium
        await calculatePremium(calculatorParams);

        console.log('Component initialized successfully');
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load policy details');
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [id, policy, calculatorParams, navigationState]);

  // Calculate premium with current parameters
  const calculatePremium = async (params: PremiumCalculatorParams) => {
    try {
      setIsCalculating(true);
      setError(null);

      const result = premiumCalculator.calculatePremium(params);
      setPremiumCalculation(result);
      
      console.log('Premium calculated:', result);
    } catch (err) {
      console.error('Premium calculation error:', err);
      setError('Failed to calculate premium. Please check your inputs.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle add-on selection changes
  const handleAddOnChange = async (addOnId: string, isSelected: boolean) => {
    try {
      // Update available add-ons
      const updatedAddOns = availableAddOns.map(addon =>
        addon.id === addOnId ? { ...addon, isSelected } : addon
      );
      setAvailableAddOns(updatedAddOns);

      // Update calculator parameters
      const selectedAddOnIds = updatedAddOns
        .filter(addon => addon.isSelected)
        .map(addon => addon.id);

      const updatedParams = {
        ...calculatorParams,
        selectedAddOns: selectedAddOnIds
      };
      
      setCalculatorParams(updatedParams);
      setHasUnsavedChanges(true);

      // Recalculate premium
      await calculatePremium(updatedParams);
    } catch (err) {
      console.error('Add-on change error:', err);
      setError('Failed to update add-on selection');
    }
  };

  // Copy policy number to clipboard
  const copyPolicyNumber = async () => {
    if (!policy) return;
    try {
      await navigator.clipboard.writeText(policy.policyNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy policy number:', err);
    }
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Quick action handlers
  const handleDownload = () => {
    console.log('Downloading policy document...');
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

  // Navigation handler
  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    
    const returnPath = navigationState?.returnPath || '/my-policy';
    navigate(returnPath);
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
      case 'under_review':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate remaining coverage period
  const remainingDays = useMemo(() => {
    if (!policy) return 0;
    const endDate = new Date(policy.policyTerm.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [policy]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading policy details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !policy) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Unable to Load Policy
          </h2>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            {error}
          </p>
          <button
            onClick={handleGoBack}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Go Back to Policies
          </button>
        </div>
      </div>
    );
  }

  if (!policy) return null;


  const challans = ()=>(
    <div className="space-y-6">
            {/* Challan Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <Gavel className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Total Challans</span>
                </div>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {challanSummary.totalChallans}
                </p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Total Fine</span>
                </div>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(challanSummary.totalFineAmount)}
                </p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Paid Amount</span>
                </div>
                <p className="text-2xl font-bold font-poppins text-green-600">
                  {formatCurrency(challanSummary.paidAmount)}
                </p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <AlertTriangle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Pending Amount</span>
                </div>
                <p className="text-2xl font-bold font-poppins text-red-600">
                  {formatCurrency(challanSummary.pendingAmount)}
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by challan ID, violation type, or location..."
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

                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="border rounded-lg px-4 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                    <option value="disputed">Disputed</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border rounded-lg px-4 py-3 font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="status">Sort by Status</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-3 border rounded-lg transition-all duration-200"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)'
                    }}
                  >
                    {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Challans Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Challan ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Violation Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Location
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Fine Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedChallans.map((challan) => (
                      <tr key={challan.id} className="border-b hover:bg-opacity-50 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
                        <td className="py-4 px-4">
                          <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {challan.challanId}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {formatDate(challan.dateOfViolation)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {challan.violationType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                            {challan.location}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {formatCurrency(challan.fineAmount)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(challan.paymentStatus)}
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(challan.paymentStatus)}`}>
                              {challan.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="py-1 px-3 rounded-lg font-medium font-roboto text-sm transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                              View
                            </button>
                            {challan.paymentStatus === 'pending' || challan.paymentStatus === 'overdue' ? (
                              <button className="py-1 px-3 rounded-lg font-medium font-roboto text-sm text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                                Pay Now
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

  )

  const renderPolicyOverview = () => (
    <div className="space-y-6">
      {/* Policy Header Card */}
      <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
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
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-poppins">{policy.vehicle.make} {policy.vehicle.model}</h1>
                  <p className="text-white/80 font-roboto text-lg">{policy.provider}</p>
                </div>
              </div>
              
              {/* Policy Number with Copy */}
              <div className="text-right">
                <p className="text-white/80 font-roboto text-sm">Policy Number</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xl font-bold font-poppins">{policy.policyNumber}</p>
                  <button
                    onClick={copyPolicyNumber}
                    className="p-1 rounded hover:bg-white/20 transition-colors"
                    title="Copy policy number"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-6 w-6" />
                  <span className="font-roboto text-white/80">Coverage</span>
                </div>
                <p className="text-3xl font-bold font-poppins">
                  {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="h-6 w-6" />
                  <span className="font-roboto text-white/80">Premium</span>
                </div>
                <p className="text-3xl font-bold font-poppins">{formatCurrency(policy.premiumBreakdown.totalPremium)}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="h-6 w-6" />
                  <span className="font-roboto text-white/80">Days Remaining</span>
                </div>
                <p className="text-3xl font-bold font-poppins">{remainingDays}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-roboto text-white/80">Status</span>
                </div>
                <p className="text-xl font-bold font-poppins capitalize">{policy.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
              <RefreshCw className="h-4 w-4" />
              <span>Renew</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <DollarSign className="h-4 w-4" />
              <span>Pay Premium</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <AlertTriangle className="h-4 w-4" />
              <span>File Claim</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <MessageSquare className="h-4 w-4" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Dates Calendar */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Calendar className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Important Dates</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Calendar className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy Start</p>
            <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {formatDate(policy.policyTerm.startDate)}
            </p>
          </div>
          
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Calendar className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy End</p>
            <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {formatDate(policy.policyTerm.endDate)}
            </p>
          </div>
          
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Calendar className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Next Payment</p>
            <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {formatDate(policy.policyTerm.renewalDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Phone className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Emergency Contacts</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Phone className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {contact.name}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {contact.phone}
                  </p>
                </div>
              </div>
              {contact.available24x7 && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  24x7
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="space-y-6">
      {/* Vehicle Details */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Car className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Vehicle Information</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Make & Model</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.make} {policy.vehicle.model}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Registration Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.registrationNumber}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Year</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.year}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Engine Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.engineNumber}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Chassis Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.chassisNumber}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Fuel Type</p>
            <p className="font-semibold font-poppins capitalize" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.fuelType}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Engine Capacity</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy.vehicle.cubicCapacity} CC
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Current Market Value</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(policy.vehicle.vehicleValue)}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Insured Value</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(policy.coverage.ownDamage.sumInsured)}
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Photos */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-poppins flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
            <Camera className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            <span>Vehicle Photos</span>
          </h2>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Upload className="h-4 w-4" />
            <span>Upload Photos</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardData.vehiclePhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button className="p-2 bg-white rounded-full">
                  <Eye className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-sm font-roboto bg-black/50 rounded px-2 py-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Safety Features</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.safetyFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Shield className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {feature.name}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  feature.premiumImpact < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {feature.premiumImpact > 0 ? '+' : ''}{feature.premiumImpact}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modifications */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-poppins flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
            <Settings className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            <span>Vehicle Modifications</span>
          </h2>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Plus className="h-4 w-4" />
            <span>Add Modification</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {dashboardData.modifications.map((modification) => (
            <div key={modification.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Settings className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {modification.type}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {modification.description}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Value: {formatCurrency(modification.value)} • Installed: {formatDate(modification.installationDate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(modification.approvalStatus)}`}>
                  {modification.approvalStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDriverInfo = () => (
    <div className="space-y-6">
      {/* Authorized Drivers */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-poppins flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
            <Users className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            <span>Authorized Drivers</span>
          </h2>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Plus className="h-4 w-4" />
            <span>Add Driver</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {dashboardData.authorizedDrivers.map((driver) => (
            <div key={driver.id} className="p-6 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {driver.name}
                    </h3>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {driver.relationship} • License: {driver.licenseNumber}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    driver.riskRating === 'low' ? 'bg-green-100 text-green-800' :
                    driver.riskRating === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {driver.riskRating} risk
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Date of Birth</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatDate(driver.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>License Expiry</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatDate(driver.licenseExpiryDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium Impact</p>
                  <p className="font-semibold font-poppins" style={{ color: driver.premiumImpact > 0 ? 'var(--color-primary)' : 'var(--color-foreground)' }}>
                    {driver.premiumImpact > 0 ? '+' : ''}{formatCurrency(driver.premiumImpact)}
                  </p>
                </div>
              </div>
              
              {/* Driving History */}
              {driver.drivingHistory.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Driving History
                  </h4>
                  <div className="space-y-2">
                    {driver.drivingHistory.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <div>
                          <p className="font-medium font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {record.description}
                          </p>
                          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {formatDate(record.date)} • {record.severity} severity
                          </p>
                        </div>
                        <div className="text-right">
                          {record.fineAmount && (
                            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                              Fine: {formatCurrency(record.fineAmount)}
                            </p>
                          )}
                          {record.penaltyPoints && (
                            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                              Points: {record.penaltyPoints}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Training Certificates */}
              {driver.trainingCertificates.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Training Certificates
                  </h4>
                  <div className="space-y-2">
                    {driver.trainingCertificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <div>
                          <p className="font-medium font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {cert.name}
                          </p>
                          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {cert.issuingAuthority} • Expires: {formatDate(cert.expiryDate)}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          -{cert.discountPercentage}% discount
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Restrictions */}
              {driver.restrictions.length > 0 && (
                <div>
                  <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Restrictions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {driver.restrictions.map((restriction, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        {restriction}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCoverageDetails = () => (
    <div className="space-y-6">
      {/* Coverage Limits */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Coverage Limits</span>
        </h2>
        
        <div className="space-y-6">
          {dashboardData.coverageLimits.map((coverage, index) => (
            <div key={index} className="border rounded-lg p-6" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {coverage.type}
                </h3>
                <div className="text-right">
                  <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {formatCurrency(coverage.limit)}
                  </p>
                  {coverage.deductible > 0 && (
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Deductible: {formatCurrency(coverage.deductible)}
                    </p>
                  )}
                </div>
              </div>
              
              <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
                {coverage.explanation}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                    What's Covered
                  </h4>
                  <ul className="space-y-1">
                    {coverage.conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {condition}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Exclusions
                  </h4>
                  <ul className="space-y-1">
                    {coverage.exclusions.map((exclusion, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {exclusion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-on Coverages */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <Plus className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Add-on Coverages</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policy.addOns.filter(addon => addon.isSelected).map((addon) => (
            <div key={addon.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {addon.name}
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                {addon.description}
              </p>
              <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                Premium: {formatCurrency(addon.premium)}
              </p>
              {addon.sumInsured && (
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Coverage: {formatCurrency(addon.sumInsured)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Territory Restrictions */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <MapPin className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Territory & Usage Restrictions</span>
        </h2>
        
        <div className="space-y-4">
          {dashboardData.territoryRestrictions.map((restriction, index) => (
            <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                {restriction.description}
              </h3>
              <ul className="space-y-1">
                {restriction.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Endorsements */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-poppins flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
            <Edit className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            <span>Policy Endorsements</span>
          </h2>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Plus className="h-4 w-4" />
            <span>Request Change</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {dashboardData.endorsements.map((endorsement) => (
            <div key={endorsement.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {endorsement.type}
                </h3>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {endorsement.description}
                </p>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Effective: {formatDate(endorsement.effectiveDate)} • Premium: {formatCurrency(endorsement.premium)}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(endorsement.status)}`}>
                {endorsement.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClaimsCenter = () => (
    <div className="space-y-6">
      {/* Claims Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-xl shadow-lg p-6 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <BarChart3 className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            {dashboardData.claimsHistory.length}
          </p>
          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Claims</p>
        </div>
        
        <div className="rounded-xl shadow-lg p-6 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <CheckCircle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            {dashboardData.claimsHistory.filter(c => c.status === 'settled').length}
          </p>
          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Settled Claims</p>
        </div>
        
        <div className="rounded-xl shadow-lg p-6 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            {formatCurrency(dashboardData.claimsHistory.reduce((sum, claim) => sum + (claim.settledAmount || 0), 0))}
          </p>
          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Settled</p>
        </div>
        
        <div className="rounded-xl shadow-lg p-6 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="p-3 rounded-full mx-auto mb-3 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <TrendingUp className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            {policy.vehicle.ncbPercentage}%
          </p>
          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>NCB Retained</p>
        </div>
      </div>

      {/* File New Claim */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="text-center">
          <div className="p-4 rounded-full mx-auto mb-4 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Plus className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            File a New Claim
          </h2>
          <p className="font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
            Report an incident and start your claim process
          </p>
          <button className="py-3 px-6 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
            Start Claim Process
          </button>
        </div>
      </div>

      {/* Claims History */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Claims History</span>
        </h2>
        
        <div className="space-y-6">
          {dashboardData.claimsHistory.map((claim) => (
            <div key={claim.id} className="border rounded-lg p-6" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Claim #{claim.claimNumber}
                  </h3>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {formatDate(claim.incidentDate)} • {claim.incidentLocation.address}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                  {claim.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Damage Type</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {claim.damageType.map((type, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Requested Amount</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(claim.requestedAmount)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Settled Amount</p>
                  <p className="font-semibold font-poppins" style={{ color: claim.settledAmount ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                    {claim.settledAmount ? formatCurrency(claim.settledAmount) : 'Pending'}
                  </p>
                </div>
              </div>
              
              {/* Claim Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {claim.adjusterDetails && (
                  <div>
                    <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Claims Adjuster
                    </h4>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <p className="font-medium font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {claim.adjusterDetails.name}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {claim.adjusterDetails.phone}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {claim.adjusterDetails.email}
                      </p>
                    </div>
                  </div>
                )}
                
                {claim.repairShop && (
                  <div>
                    <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Repair Shop
                    </h4>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <p className="font-medium font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {claim.repairShop.name}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {claim.repairShop.address}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {claim.repairShop.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Future Impact */}
              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Impact on Future Premiums
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium Increase</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      +{formatCurrency(claim.futureImpact.premiumIncrease)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>NCB Loss</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {claim.futureImpact.ncbLoss}%
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Documents and Photos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {claim.documents.length} documents
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {claim.photos.length} photos
                    </span>
                  </div>
                </div>
                <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Upload */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="text-center">
          <div className="p-4 rounded-full mx-auto mb-4 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Upload className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Upload Documents
          </h2>
          <p className="font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
            Upload policy documents, receipts, or correspondence
          </p>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="py-3 px-6 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90" 
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Choose Files
          </button>
        </div>
      </div>

      {/* Document Search */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
              style={{ 
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            />
          </div>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Policy Documents</span>
        </h2>
        
        <div className="space-y-4">
          {dashboardData.documents
            .filter(doc => 
              searchQuery === '' || 
              doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doc.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((document) => (
            <div key={document.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <FileText className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {document.name}
                  </h3>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {document.type.replace('_', ' ')} • Version {document.version} • {document.size}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Uploaded: {formatDate(document.uploadDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {document.isLatest && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Latest
                  </span>
                )}
                <button className="p-2 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6 flex items-center space-x-3" style={{ color: 'var(--color-foreground)' }}>
          <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          <span>Payment History</span>
        </h2>
        
        <div className="space-y-4">
          {dashboardData.paymentHistory.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <DollarSign className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(payment.amount)}
                  </h3>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {payment.description}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {formatDate(payment.date)} • {payment.method.replace('_', ' ')} • Receipt: {payment.receiptNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
                <button className="p-2 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPremiumCalculator = () => (
    <div className="space-y-6">
      {/* Current Premium Display */}
      {premiumCalculation && (
        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Premium Calculator
            </h2>
            <p className="text-4xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
              {formatCurrency(premiumCalculation.totalPremium)}
            </p>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
              Total Annual Premium
            </p>
          </div>
          
          {/* Premium Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Premium Components
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Own Damage</span>
                  <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(premiumCalculation.breakdown.ownDamage)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Third Party</span>
                  <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(premiumCalculation.breakdown.thirdParty)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Personal Accident</span>
                  <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(premiumCalculation.breakdown.personalAccident)}
                  </span>
                </div>
                {premiumCalculation.breakdown.addOns > 0 && (
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Add-ons</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.breakdown.addOns)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Discounts & Taxes
              </h3>
              <div className="space-y-3">
                {Object.entries(premiumCalculation.discounts).map(([key, value]) => 
                  value > 0 && (
                    <div key={key} className="flex justify-between text-green-600">
                      <span className="font-roboto capitalize">{key.replace(/([A-Z])/g, ' $1')} Discount</span>
                      <span className="font-semibold font-poppins">
                        -{formatCurrency(value)}
                      </span>
                    </div>
                  )
                )}
                <div className="flex justify-between">
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>GST (18%)</span>
                  <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(premiumCalculation.taxes.gst)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add-ons Selection */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            Customize Your Coverage
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? 'Save Changes' : 'Edit Coverage'}</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {availableAddOns.map((addon) => (
            <div key={addon.id} className="flex items-start space-x-4 p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
              <input
                type="checkbox"
                id={addon.id}
                checked={addon.isSelected}
                onChange={(e) => handleAddOnChange(addon.id, e.target.checked)}
                disabled={!isEditing}
                className="mt-1"
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <div className="flex-1">
                <label htmlFor={addon.id} className="font-semibold font-poppins cursor-pointer" style={{ color: 'var(--color-foreground)' }}>
                  {addon.name}
                </label>
                <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                  {addon.description}
                </p>
                {addon.terms && (
                  <ul className="text-xs font-roboto space-y-1" style={{ color: 'var(--color-muted)' }}>
                    {addon.terms.map((term, idx) => (
                      <li key={idx} className="flex items-start space-x-1">
                        <span>•</span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="text-right">
                {premiumCalculation && premiumCalculation.addOnPremiums[addon.id] && (
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    +{formatCurrency(premiumCalculation.addOnPremiums[addon.id])}
                  </p>
                )}
                {addon.sumInsured && (
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Coverage: {formatCurrency(addon.sumInsured)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Comparison */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
          Coverage Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left py-3 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Coverage Type
                </th>
                <th className="text-center py-3 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Current Plan
                </th>
                <th className="text-center py-3 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Updated Plan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-3 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Own Damage
                </td>
                <td className="py-3 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                </td>
                <td className="py-3 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                </td>
              </tr>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-3 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Add-on Covers
                </td>
                <td className="py-3 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy.addOns.filter(a => a.isSelected).length}
                </td>
                <td className="py-3 text-center font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {availableAddOns.filter(a => a.isSelected).length}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Total Premium
                </td>
                <td className="py-3 text-center font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  {formatCurrency(policy.premiumBreakdown.totalPremium)}
                </td>
                <td className="py-3 text-center font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  {premiumCalculation ? formatCurrency(premiumCalculation.totalPremium) : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderPolicyOverview();
      case 'vehicle':
        return renderVehicleInfo();
      case 'drivers':
        return renderDriverInfo();
      case 'coverage':
        return renderCoverageDetails();
      case 'claims':
        return renderClaimsCenter();
      case 'documents':
        return renderDocuments();
      case 'calculator':
        return renderPremiumCalculator();
      case 'challans':
          return renderChallans();
      default:
        return renderPolicyOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy.vehicle.make} ${policy.vehicle.model} Insurance Dashboard - ${policy.policyNumber} | Trovity`}</title>
        <meta name="description" content={`Comprehensive vehicle insurance dashboard with premium calculator, claims center, and policy management tools`} />
      </Helmet>

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
                  onClick={handleGoBack}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                <div>
                  <h1 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {policy.vehicle.make} {policy.vehicle.model} Dashboard
                  </h1>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Policy: {policy.policyNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Info className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-primary)' }}>
                      Unsaved changes
                    </span>
                  </div>
                )}
                
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

        {/* Navigation Tabs */}
        <div className="sticky top-16 z-30 backdrop-blur-md border-b" style={{ 
          backgroundColor: 'var(--color-background)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-4">
              {[
                { id: 'overview', label: 'Overview', icon: Shield },
                { id: 'vehicle', label: 'Vehicle Info', icon: Car },
                { id: 'drivers', label: 'Drivers', icon: Users },
                { id: 'coverage', label: 'Coverage', icon: Shield },
                { id: 'claims', label: 'Claims', icon: AlertTriangle },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'calculator', label: 'Calculator', icon: Calculator },
                { id: 'challans', label: 'Challans', icon: Gavel }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSection === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id as DashboardSection)}
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderSectionContent()}
        </div>

        {/* Error Display */}
        {error && (
          <div className="fixed bottom-4 right-4 max-w-md p-4 rounded-lg bg-red-50 border border-red-200 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="font-roboto text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleInsuranceDetailsPage;