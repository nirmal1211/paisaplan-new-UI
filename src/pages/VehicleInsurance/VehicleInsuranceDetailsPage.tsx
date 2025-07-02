import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  Copy, 
  Check, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign,
  FileText,
  Users,
  Car,
  Settings,
  Calculator,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Navigation,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Zap,
  Activity
} from 'lucide-react';
import { InsurancePolicy, NavigationState, PremiumCalculationResult } from '../../types/insurance';
import { VehicleDashboardData } from '../../types/vehicleDashboard';
import { Challan, ChallanSummary } from '../../types/challans';
import { mockVehicleDashboardData } from '../../data/vehicleDashboardData';
import { mockChallansData, calculateChallanSummary } from '../../data/challansData';
import { premiumCalculator } from '../../utils/premiumCalculator';

type TabType = 'overview' | 'coverage' | 'vehicle' | 'drivers' | 'claims' | 'documents' | 'calculator' | 'challans';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Challan>('dateOfViolation');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get navigation state
  const navigationState = location.state as NavigationState | null;
  const [policy, setPolicy] = useState<InsurancePolicy | null>(navigationState?.policy || null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(mockVehicleDashboardData);
  const [premiumCalculation, setPremiumCalculation] = useState<PremiumCalculationResult | null>(null);
  const [challansData, setChallansData] = useState<Challan[]>(mockChallansData);

  // Calculate challan summary
  const challanSummary = useMemo(() => calculateChallanSummary(challansData), [challansData]);

  // Filter and sort challans
  const filteredChallans = useMemo(() => {
    let filtered = challansData.filter(challan => {
      const matchesSearch = searchQuery === '' || 
        challan.challanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challan.violationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challan.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || challan.paymentStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort challans
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      return 0;
    });

    return filtered;
  }, [challansData, searchQuery, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredChallans.length / itemsPerPage);
  const paginatedChallans = filteredChallans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Calculate premium if we have calculator params
    if (navigationState?.calculatorParams) {
      try {
        const calculation = premiumCalculator.calculatePremium(navigationState.calculatorParams);
        setPremiumCalculation(calculation);
      } catch (error) {
        console.error('Premium calculation failed:', error);
      }
    }

    return () => clearTimeout(timer);
  }, [navigationState]);

  // Handle policy not found
  if (!loading && !policy) {
    return <Navigate to="/my-policy" replace />;
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'disputed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'disputed':
        return <XCircle className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleSort = (field: keyof Challan) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (field: keyof Challan) => {
    if (sortField !== field) {
      return <ChevronDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-blue-600" /> : 
      <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading vehicle insurance details...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Policy Overview Card */}
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy Status */}
          <div className="text-center">
            <div className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Shield className="h-10 w-10" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>Policy Active</h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Valid until {formatDate(policy?.policyTerm.endDate || '')}</p>
          </div>

          {/* Coverage Amount */}
          <div className="text-center">
            <div className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <DollarSign className="h-10 w-10" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrency(policy?.coverage.ownDamage.sumInsured || 0)}
            </h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Total Coverage</p>
          </div>

          {/* Next Payment */}
          <div className="text-center">
            <div className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Calendar className="h-10 w-10" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              {formatCurrency(policy?.premiumBreakdown.totalPremium || 0)}
            </h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Annual Premium</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="p-6 rounded-xl shadow-lg text-left hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
          <FileText className="h-8 w-8 mb-4" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>File a Claim</h3>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Report an incident and start your claim process</p>
        </button>

        <button className="p-6 rounded-xl shadow-lg text-left hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
          <Phone className="h-8 w-8 mb-4" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>Roadside Assistance</h3>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>24/7 emergency roadside support</p>
        </button>

        <button className="p-6 rounded-xl shadow-lg text-left hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
          <Download className="h-8 w-8 mb-4" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>Download Documents</h3>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Access your policy documents anytime</p>
        </button>
      </div>
    </div>
  );

  const renderCoverageTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>Coverage Details</h2>
        
        {/* Own Damage Coverage */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Own Damage Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Sum Insured</h4>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {formatCurrency(policy?.coverage.ownDamage.sumInsured || 0)}
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Deductible</h4>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {formatCurrency(policy?.coverage.ownDamage.deductible || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Third Party Liability */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Third Party Liability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Bodily Injury</h4>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {formatCurrency(policy?.coverage.thirdPartyLiability.bodilyInjury || 0)}
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Property Damage</h4>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                {formatCurrency(policy?.coverage.thirdPartyLiability.propertyDamage || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Add-on Coverages */}
        <div>
          <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Add-on Coverages</h3>
          <div className="space-y-4">
            {policy?.addOns.filter(addon => addon.isSelected).map((addon) => (
              <div key={addon.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div>
                  <h4 className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>{addon.name}</h4>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>{addon.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {formatCurrency(addon.premium)}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicleTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>Vehicle Information</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Vehicle Details */}
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Basic Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Make & Model:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.make} {policy?.vehicle.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Year:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Registration Number:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.registrationNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Engine Number:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.engineNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Chassis Number:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.chassisNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Technical Specifications</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Fuel Type:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.fuelType?.charAt(0).toUpperCase() + policy?.vehicle.fuelType?.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Cubic Capacity:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.cubicCapacity} CC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Seating Capacity:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.vehicle.seatingCapacity} persons
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Vehicle Value:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(policy?.vehicle.vehicleValue || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Registration Date:</span>
                <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {formatDate(policy?.vehicle.registrationDate || '')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDriversTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>Authorized Drivers</h2>
        
        {/* Primary Driver */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Primary Driver</h3>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  {policy?.policyHolder.name}
                </h4>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  License: {policy?.policyHolder.drivingLicenseNumber}
                </p>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Expires: {formatDate(policy?.policyHolder.licenseExpiryDate || '')}
                </p>
              </div>
              <div>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Date of Birth: {formatDate(policy?.policyHolder.dateOfBirth || '')}
                </p>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Phone: {policy?.policyHolder.phone}
                </p>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Email: {policy?.policyHolder.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Drivers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Additional Drivers</h3>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
              <Plus className="h-4 w-4" />
              <span>Add Driver</span>
            </button>
          </div>
          
          {dashboardData.authorizedDrivers.filter(driver => driver.relationship !== 'Primary').map((driver) => (
            <div key={driver.id} className="p-6 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  {driver.name} ({driver.relationship})
                </h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  driver.riskRating === 'low' ? 'bg-green-100 text-green-800' :
                  driver.riskRating === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {driver.riskRating} risk
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    License: {driver.licenseNumber}
                  </p>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Expires: {formatDate(driver.licenseExpiryDate)}
                  </p>
                </div>
                <div>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Premium Impact: {formatCurrency(driver.premiumImpact)}
                  </p>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Violations: {driver.drivingHistory.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClaimsTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>Claims History</h2>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Plus className="h-4 w-4" />
            <span>File New Claim</span>
          </button>
        </div>

        {dashboardData.claimsHistory.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.claimsHistory.map((claim) => (
              <div key={claim.id} className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Claim #{claim.claimNumber}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    claim.status === 'settled' ? 'bg-green-100 text-green-800' :
                    claim.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    claim.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {claim.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Incident Date</p>
                    <p className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatDate(claim.incidentDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Claim Amount</p>
                    <p className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(claim.settledAmount || claim.requestedAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Damage Type</p>
                    <p className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {claim.damageType.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Location: {claim.incidentLocation.address}
                  </p>
                  <button className="px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>No Claims Found</h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>You haven't filed any claims yet. We hope it stays that way!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>Policy Documents</h2>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Upload className="h-4 w-4" />
            <span>Upload Document</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData.documents.map((doc) => (
            <div key={doc.id} className="p-6 rounded-lg border hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-card)' }}>
                  <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {doc.name}
                  </h3>
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
                <button className="py-2 px-3 rounded-lg transition-all duration-200" style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-primary)' }}>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCalculatorTab = () => (
    <div className="space-y-6">
      <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>Premium Calculator</h2>
        
        {premiumCalculation ? (
          <div className="space-y-6">
            {/* Premium Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Base Premium</h3>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  {formatCurrency(premiumCalculation.basePremium)}
                </p>
              </div>
              
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Add-ons</h3>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  {formatCurrency(Object.values(premiumCalculation.addOnPremiums).reduce((sum, premium) => sum + premium, 0))}
                </p>
              </div>
              
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Discounts</h3>
                <p className="text-2xl font-bold font-poppins text-green-600">
                  -{formatCurrency(Object.values(premiumCalculation.discounts).reduce((sum, discount) => sum + discount, 0))}
                </p>
              </div>
              
              <div className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="font-semibold font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>Total Premium</h3>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                  {formatCurrency(premiumCalculation.totalPremium)}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-lg font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Coverage Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Own Damage:</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.breakdown.ownDamage)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Third Party:</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.breakdown.thirdParty)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Personal Accident:</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.breakdown.personalAccident)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Add-ons:</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.breakdown.addOns)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-lg font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>Taxes & Charges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>GST (18%):</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.taxes.gst)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Service Tax:</span>
                    <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(premiumCalculation.taxes.serviceTax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calculator className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
            <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>Premium Calculator</h3>
            <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Premium calculation data not available</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderChallansTab = () => (
    <div className="space-y-6">
      {/* Challans Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Challans</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {challanSummary.totalChallans}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Fine Amount</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(challanSummary.totalFineAmount)}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Pending Amount</p>
              <p className="text-2xl font-bold font-poppins text-red-600">
                {formatCurrency(challanSummary.pendingAmount)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Penalty Points</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {challanSummary.penaltyPoints}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Target className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex flex-col lg:flex-row gap-4">
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
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 transition-all min-w-48"
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
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
          </div>
        </div>
      </div>

      {/* Challans Table */}
      <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: 'var(--color-secondary)' }}>
              <tr>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('challanId')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Challan ID</span>
                    {renderSortIcon('challanId')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('dateOfViolation')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Date</span>
                    {renderSortIcon('dateOfViolation')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('violationType')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Violation Type</span>
                    {renderSortIcon('violationType')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Location</span>
                    {renderSortIcon('location')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('fineAmount')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Fine Amount</span>
                    {renderSortIcon('fineAmount')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left font-semibold font-roboto cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-foreground)' }}
                  onClick={() => handleSort('paymentStatus')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Status</span>
                    {renderSortIcon('paymentStatus')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedChallans.map((challan, index) => (
                <tr 
                  key={challan.id} 
                  className={`border-t hover:opacity-80 transition-opacity ${index % 2 === 0 ? '' : 'bg-opacity-50'}`}
                  style={{ 
                    borderColor: 'var(--color-border)',
                    backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-secondary)'
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {challan.challanId}
                    </div>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {challan.vehicleNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {formatDate(challan.dateOfViolation)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {challan.violationType}
                    </div>
                    {challan.penaltyPoints && (
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {challan.penaltyPoints} penalty points
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      {challan.location}
                    </div>
                    {challan.officerName && (
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Officer: {challan.officerName}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {formatCurrency(challan.fineAmount)}
                    </div>
                    {challan.paymentDate && (
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Paid: {formatDate(challan.paymentDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(challan.paymentStatus)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(challan.paymentStatus)}`}>
                        {challan.paymentStatus.charAt(0).toUpperCase() + challan.paymentStatus.slice(1)}
                      </span>
                    </div>
                    {challan.courtDate && challan.paymentStatus !== 'paid' && (
                      <div className="text-sm font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                        Court: {formatDate(challan.courtDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ 
                          backgroundColor: 'var(--color-secondary)',
                          color: 'var(--color-primary)'
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {challan.paymentStatus === 'pending' && (
                        <button 
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-105 text-white"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                          title="Pay Now"
                        >
                          <CreditCard className="h-4 w-4" />
                        </button>
                      )}
                      {challan.receiptNumber && (
                        <button 
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                          style={{ 
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-primary)'
                          }}
                          title="Download Receipt"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredChallans.length)} of {filteredChallans.length} challans
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 font-roboto ${
                    currentPage === page 
                      ? 'text-white' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-secondary)',
                    color: currentPage === page ? 'white' : 'var(--color-primary)'
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredChallans.length === 0 && (
        <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            No Challans Found
          </h3>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
            {searchQuery || statusFilter !== 'all' 
              ? 'No challans match your search criteria. Try adjusting your filters.'
              : 'No traffic challans found for this vehicle. Keep up the good driving!'
            }
          </p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'coverage':
        return renderCoverageTab();
      case 'vehicle':
        return renderVehicleTab();
      case 'drivers':
        return renderDriversTab();
      case 'claims':
        return renderClaimsTab();
      case 'documents':
        return renderDocumentsTab();
      case 'calculator':
        return renderCalculatorTab();
      case 'challans':
        return renderChallansTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${policy?.vehicle.make} ${policy?.vehicle.model} Insurance - ${policy?.policyNumber} | Trovity`}</title>
        <meta name="description" content={`Comprehensive vehicle insurance dashboard for ${policy?.vehicle.make} ${policy?.vehicle.model}`} />
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
                <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105" style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}>
                  <Car className="h-5 w-5" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {policy?.vehicle.make} {policy?.vehicle.model} ({policy?.vehicle.year})
                  </h1>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {policy?.vehicle.registrationNumber} • {policy?.provider}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
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

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  {policy?.status}
                </span>
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
                { id: 'coverage', label: 'Coverage', icon: FileText },
                { id: 'vehicle', label: 'Vehicle Info', icon: Car },
                { id: 'drivers', label: 'Drivers', icon: Users },
                { id: 'claims', label: 'Claims', icon: AlertTriangle },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'calculator', label: 'Premium Calculator', icon: Calculator },
                { id: 'challans', label: 'Challans', icon: FileText }
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
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>
      </div>
    </>
  );
};

export default VehicleInsuranceDetailsPage;