import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Printer,
  Shield,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Car,
  Phone,
  Mail,
  MapPin,
  Star,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Calculator,
  Wrench,
  Camera,
  User,
  Award,
  Navigation,
  Receipt,
  Gavel
} from 'lucide-react';
import { InsurancePolicy, NavigationState } from '../../types/insurance';
import { mockVehicleDashboardData } from '../../data/vehicleDashboardData';
import { VehicleDashboardData } from '../../types/vehicleDashboard';
import { premiumCalculator } from '../../utils/premiumCalculator';
import { mockChallansData, calculateChallanSummary } from '../../data/challansData';
import { Challan } from '../../types/challans';

type TabType = 'overview' | 'coverage' | 'vehicle' | 'drivers' | 'claims' | 'documents' | 'calculator' | 'challans';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState<InsurancePolicy | null>(null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(mockVehicleDashboardData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'disputed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get navigation state
  const navigationState = location.state as NavigationState;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (navigationState?.policy) {
        setPolicy(navigationState.policy);
        // Merge policy data with dashboard data
        setDashboardData(prev => ({
          ...prev,
          policy: navigationState.policy
        }));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigationState]);

  // Challan data processing
  const challansData = mockChallansData.filter(challan => 
    policy ? challan.vehicleNumber === policy.vehicle.registrationNumber : true
  );

  const challanSummary = calculateChallanSummary(challansData);

  // Filter and sort challans
  const filteredChallans = challansData
    .filter(challan => {
      const matchesSearch = searchQuery === '' || 
        challan.challanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challan.violationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challan.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || challan.paymentStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.dateOfViolation).getTime() - new Date(b.dateOfViolation).getTime();
          break;
        case 'amount':
          comparison = a.fineAmount - b.fineAmount;
          break;
        case 'status':
          comparison = a.paymentStatus.localeCompare(b.paymentStatus);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredChallans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChallans = filteredChallans.slice(startIndex, startIndex + itemsPerPage);

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

  const handleDownload = () => {
    console.log('Downloading policy...');
  };

  const handleShare = () => {
    console.log('Sharing policy...');
  };

  const handlePrint = () => {
    window.print();
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
    switch (status.toLowerCase()) {
      case 'active':
      case 'paid':
      case 'approved':
      case 'settled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'under_review':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
      case 'overdue':
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'disputed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'approved':
      case 'settled':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
      case 'under_review':
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'disputed':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h2 className="text-2xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Policy Not Found
          </h2>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            The requested policy could not be found.
          </p>
          <button
            onClick={() => navigate('/my-policy')}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Back to Policies
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'coverage', label: 'Coverage', icon: FileText },
    { id: 'vehicle', label: 'Vehicle', icon: Car },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'claims', label: 'Claims', icon: AlertTriangle },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'challans', label: 'Challans', icon: Gavel }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Policy Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
                <div className="flex items-center justify-between mb-4">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm opacity-80">Own Damage</span>
                </div>
                <p className="text-2xl font-bold font-poppins">{formatCurrency(policy.coverage.ownDamage.sumInsured)}</p>
                <p className="text-sm opacity-80">Sum Insured</p>
              </div>

              <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8" />
                  <span className="text-sm opacity-80">Third Party</span>
                </div>
                <p className="text-2xl font-bold font-poppins">{formatCurrency(policy.coverage.thirdPartyLiability.bodilyInjury)}</p>
                <p className="text-sm opacity-80">Liability Cover</p>
              </div>

              <div className="rounded-xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8" />
                  <span className="text-sm opacity-80">Premium</span>
                </div>
                <p className="text-2xl font-bold font-poppins">{formatCurrency(policy.premiumBreakdown.totalPremium)}</p>
                <p className="text-sm opacity-80">Annual</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                  <AlertTriangle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-left">
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>File a Claim</p>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Report an incident</p>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                  <Phone className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-left">
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Roadside Assistance</p>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>24/7 support</p>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
                  <Download className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <div className="text-left">
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Download Documents</p>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy & certificates</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'coverage':
        return (
          <div className="space-y-6">
            {/* Own Damage Coverage */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Own Damage Coverage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Sum Insured</p>
                  <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Deductible</p>
                  <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.coverage.ownDamage.deductible)}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>Coverage Includes:</p>
                <div className="grid grid-cols-2 gap-2">
                  {policy.coverage.ownDamage.coverage.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Third Party Liability */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Third Party Liability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Bodily Injury</p>
                  <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.coverage.thirdPartyLiability.bodilyInjury)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Property Damage</p>
                  <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.coverage.thirdPartyLiability.propertyDamage)}
                  </p>
                </div>
              </div>
            </div>

            {/* Add-on Coverages */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Add-on Coverages
              </h3>
              <div className="space-y-4">
                {policy.addOns.filter(addon => addon.isSelected).map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div>
                      <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{addon.name}</h4>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(addon.premium)}
                      </p>
                      <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Annual Premium</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'vehicle':
        return (
          <div className="space-y-6">
            {/* Basic Vehicle Details */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Vehicle Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Make & Model</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {policy.vehicle.make} {policy.vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Year</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Registration Number</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Engine Number</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.engineNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Chassis Number</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.chassisNumber}</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Fuel Type</p>
                  <p className="font-semibold font-poppins capitalize" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Cubic Capacity</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.cubicCapacity} CC</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Seating Capacity</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.vehicle.seatingCapacity || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Vehicle Value</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>{formatCurrency(policy.vehicle.vehicleValue)}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'drivers':
        return (
          <div className="space-y-6">
            {/* Primary Driver */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Primary Driver
              </h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {policy.policyHolder.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>{policy.policyHolder.name}</h4>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>License: {policy.policyHolder.drivingLicenseNumber}</p>
                  <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Expires: {formatDate(policy.policyHolder.licenseExpiryDate)}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Primary</span>
                </div>
              </div>
            </div>

            {/* Additional Drivers */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Additional Drivers
                </h3>
                <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Plus className="h-4 w-4" />
                  <span>Add Driver</span>
                </button>
              </div>
              
              {dashboardData.authorizedDrivers.filter(driver => driver.relationship !== 'Primary').map((driver) => (
                <div key={driver.id} className="flex items-start space-x-4 p-4 rounded-lg mb-4" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                    {driver.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>{driver.name}</h4>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {driver.relationship} • License: {driver.licenseNumber}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        driver.riskRating === 'low' ? 'bg-green-100 text-green-800' :
                        driver.riskRating === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {driver.riskRating} risk
                      </span>
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Premium impact: +{formatCurrency(driver.premiumImpact)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'claims':
        return (
          <div className="space-y-6">
            {/* Claims Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Total Claims</span>
                </div>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {dashboardData.claimsHistory.length}
                </p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Total Claimed</span>
                </div>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(dashboardData.claimsHistory.reduce((sum, claim) => sum + claim.requestedAmount, 0))}
                </p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Settled Amount</span>
                </div>
                <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(dashboardData.claimsHistory.reduce((sum, claim) => sum + (claim.settledAmount || 0), 0))}
                </p>
              </div>
            </div>

            {/* Claims History */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Claims History
                </h3>
                <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Plus className="h-4 w-4" />
                  <span>File New Claim</span>
                </button>
              </div>

              <div className="space-y-4">
                {dashboardData.claimsHistory.map((claim) => (
                  <div key={claim.id} className="border rounded-xl p-6" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {claim.claimNumber}
                        </h4>
                        <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {formatDate(claim.incidentDate)} • {claim.incidentLocation.address}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                        {claim.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Damage Type</p>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {claim.damageType.join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Requested Amount</p>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {formatCurrency(claim.requestedAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Settled Amount</p>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          {claim.settledAmount ? formatCurrency(claim.settledAmount) : 'Pending'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {claim.documents.length} documents
                        </span>
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {claim.photos.length} photos
                        </span>
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

      case 'documents':
        return (
          <div className="space-y-6">
            {/* Document Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.documents.map((doc) => (
                <div key={doc.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
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

            {/* Upload New Document */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Upload New Document
              </h3>
              <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: 'var(--color-border)' }}>
                <div className="p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <FileText className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Upload Document
                </h4>
                <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
                  Drag and drop your files here, or click to browse
                </p>
                <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        );

      case 'calculator':
        return (
          <div className="space-y-6">
            {/* Premium Breakdown */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Premium Calculation Breakdown
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>Base Premium (Own Damage)</span>
                  <span className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.premiumBreakdown.basePremium)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>Add-on Premiums</span>
                  <span className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.premiumBreakdown.addOnPremiums)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>NCB Discount</span>
                  <span className="font-bold font-poppins text-green-600">
                    -{formatCurrency(policy.premiumBreakdown.discounts.ncb)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>GST (18%)</span>
                  <span className="font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(policy.premiumBreakdown.taxes.gst)}
                  </span>
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <span className="font-bold font-poppins text-white">Total Premium</span>
                    <span className="font-bold font-poppins text-xl text-white">
                      {formatCurrency(policy.premiumBreakdown.totalPremium)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Breakdown */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <h3 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Coverage Breakdown
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Own Damage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Sum Insured</span>
                      <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatCurrency(policy.coverage.ownDamage.sumInsured)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Deductible</span>
                      <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatCurrency(policy.coverage.ownDamage.deductible)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Third Party</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Bodily Injury</span>
                      <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatCurrency(policy.coverage.thirdPartyLiability.bodilyInjury)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Property Damage</span>
                      <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatCurrency(policy.coverage.thirdPartyLiability.propertyDamage)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'challans':
        return (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredChallans.length)} of {filteredChallans.length} challans
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="py-2 px-4 border rounded-lg font-medium font-roboto transition-all duration-200 disabled:opacity-50"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)'
                      }}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`py-2 px-4 border rounded-lg font-medium font-roboto transition-all duration-200 ${
                          currentPage === page ? 'text-white' : ''
                        }`}
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-background)',
                          color: currentPage === page ? 'white' : 'var(--color-foreground)'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="py-2 px-4 border rounded-lg font-medium font-roboto transition-all duration-200 disabled:opacity-50"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)'
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
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
            {/* Back Button and Breadcrumb */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/my-policy')}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-primary)'
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <nav className="flex items-center space-x-2 text-sm font-roboto">
                <button 
                  onClick={() => navigate('/my-policy')}
                  className="hover:underline" 
                  style={{ color: 'var(--color-muted)' }}
                >
                  My Policies
                </button>
                <span style={{ color: 'var(--color-muted)' }}>/</span>
                <span style={{ color: 'var(--color-foreground)' }}>Vehicle Insurance Details</span>
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
                    {policy.policyNumber}
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(policy.status)}`}>
                {policy.status}
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

      {/* Tab Navigation */}
      <div className="sticky top-20 z-30 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide p-4">
            {tabs.map((tab) => {
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
  );
};

export default VehicleInsuranceDetailsPage;