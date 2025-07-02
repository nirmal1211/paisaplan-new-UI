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
  Car,
  Users,
  FileText,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Search,
  Filter,
  Star,
  Navigation,
  Plus,
  Edit,
  Trash2,
  Upload,
  Camera,
  Settings,
  Info,
  TrendingUp,
  Award,
  Target,
  Zap,
  Wrench,
  Gavel,
  BookOpen,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { InsurancePolicy, NavigationState } from '../../types/insurance';
import { mockVehicleDashboardData } from '../../data/vehicleDashboardData';
import { VehicleDashboardData, ClaimDetail, AuthorizedDriver, PolicyDocument, PaymentRecord, VehiclePhoto, SafetyFeature, VehicleModification, Endorsement } from '../../types/vehicleDashboard';

type TabType = 'overview' | 'vehicle' | 'drivers' | 'claims' | 'documents' | 'payments' | 'challans' | 'endorsements';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [policy, setPolicy] = useState<InsurancePolicy | null>(null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(mockVehicleDashboardData);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Challan-specific state
  const [challanSearchQuery, setChallanSearchQuery] = useState('');
  const [challanFilterStatus, setChallanFilterStatus] = useState('all');
  const [challanSortBy, setChallanSortBy] = useState('date');

  // Mock challan data
  const mockChallans = [
    {
      id: '1',
      challanNumber: 'CH2024001',
      date: '2024-03-15',
      location: 'Mumbai-Pune Highway',
      violation: 'Speed Limit Violation',
      fineAmount: 1000,
      status: 'paid',
      paymentDate: '2024-03-20',
      vehicleNumber: 'MH01CD5678'
    },
    {
      id: '2',
      challanNumber: 'CH2024002',
      date: '2024-02-10',
      location: 'Bandra West, Mumbai',
      violation: 'Parking Violation',
      fineAmount: 500,
      status: 'pending',
      paymentDate: null,
      vehicleNumber: 'MH01CD5678'
    },
    {
      id: '3',
      challanNumber: 'CH2023003',
      date: '2023-12-05',
      location: 'Andheri East, Mumbai',
      violation: 'Signal Jump',
      fineAmount: 1500,
      status: 'paid',
      paymentDate: '2023-12-08',
      vehicleNumber: 'MH01CD5678'
    }
  ];

  // Calculate challan summary
  const challanSummary = {
    total: mockChallans.length,
    totalFines: mockChallans.reduce((sum, challan) => sum + challan.fineAmount, 0),
    paid: mockChallans.filter(c => c.status === 'paid').reduce((sum, challan) => sum + challan.fineAmount, 0),
    pending: mockChallans.filter(c => c.status === 'pending').reduce((sum, challan) => sum + challan.fineAmount, 0)
  };

  // Filter challans based on search and status
  const filteredChallans = mockChallans.filter(challan => {
    const matchesSearch = challanSearchQuery === '' || 
      challan.challanNumber.toLowerCase().includes(challanSearchQuery.toLowerCase()) ||
      challan.violation.toLowerCase().includes(challanSearchQuery.toLowerCase()) ||
      challan.location.toLowerCase().includes(challanSearchQuery.toLowerCase());
    
    const matchesStatus = challanFilterStatus === 'all' || challan.status === challanFilterStatus;
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    // Get policy data from navigation state or fetch from API
    const navigationState = location.state as NavigationState;
    
    if (navigationState?.policy) {
      setPolicy(navigationState.policy);
      setDashboardData(prev => ({ ...prev, policy: navigationState.policy }));
    } else {
      // Fallback: create mock policy data
      console.warn('No policy data found in navigation state');
      // In a real app, you would fetch the policy data using the ID
    }
    
    setLoading(false);
  }, [location.state, id]);

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
    console.log('Downloading policy documents...');
  };

  const handleShare = () => {
    console.log('Sharing policy...');
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'settled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'paid':
      case 'settled':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
      case 'under_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'expired':
      case 'rejected':
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'vehicle', label: 'Vehicle Info', icon: Car },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'claims', label: 'Claims', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'challans', label: 'Challans', icon: Gavel },
    { id: 'endorsements', label: 'Endorsements', icon: Edit }
  ];

  const renderPolicyOverview = () => (
    <div className="space-y-6">
      {/* Policy Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Coverage Amount</p>
              <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(policy?.coverage.ownDamage.sumInsured || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Calendar className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy Expires</p>
              <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {policy?.policyTerm.endDate ? formatDate(policy.policyTerm.endDate) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <DollarSign className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Annual Premium</p>
              <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(policy?.premiumBreakdown.totalPremium || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Users className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Authorized Drivers</p>
              <p className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {dashboardData.authorizedDrivers.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h3 className="text-xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <FileText className="h-8 w-8 mb-2" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>File Claim</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <CreditCard className="h-8 w-8 mb-2" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>Pay Premium</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Download className="h-8 w-8 mb-2" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>Download Policy</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <Phone className="h-8 w-8 mb-2" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="space-y-6">
      {/* Vehicle Details */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h3 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
          Vehicle Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Make & Model</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.make} {policy?.vehicle.model}
            </p>
          </div>
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Registration Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.registrationNumber}
            </p>
          </div>
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Year</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.year}
            </p>
          </div>
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Engine Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.engineNumber}
            </p>
          </div>
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Chassis Number</p>
            <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.chassisNumber}
            </p>
          </div>
          <div>
            <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Fuel Type</p>
            <p className="font-semibold font-poppins capitalize" style={{ color: 'var(--color-foreground)' }}>
              {policy?.vehicle.fuelType}
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Photos */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
            Vehicle Photos
          </h3>
          <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Camera className="h-4 w-4" />
            <span>Add Photos</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dashboardData.vehiclePhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <button className="text-white hover:text-gray-300">
                  <Eye className="h-6 w-6" />
                </button>
              </div>
              <p className="text-xs font-roboto mt-2 text-center" style={{ color: 'var(--color-muted)' }}>
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h3 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
          Safety Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.safetyFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <div>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {feature.name}
                </p>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {feature.description}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                feature.premiumImpact < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {feature.premiumImpact > 0 ? '+' : ''}{feature.premiumImpact}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Authorized Drivers
        </h3>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
          <Plus className="h-4 w-4" />
          <span>Add Driver</span>
        </button>
      </div>

      <div className="space-y-4">
        {dashboardData.authorizedDrivers.map((driver) => (
          <div key={driver.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  {driver.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {driver.name}
                  </h4>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {driver.relationship} • License: {driver.licenseNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  driver.riskRating === 'low' ? 'bg-green-100 text-green-800' :
                  driver.riskRating === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {driver.riskRating} risk
                </span>
                <button className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Date of Birth</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatDate(driver.dateOfBirth)}
                </p>
              </div>
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>License Expiry</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatDate(driver.licenseExpiryDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Premium Impact</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {driver.premiumImpact > 0 ? '+' : ''}{formatCurrency(driver.premiumImpact)}
                </p>
              </div>
            </div>

            {driver.restrictions.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>Restrictions:</p>
                <div className="flex flex-wrap gap-2">
                  {driver.restrictions.map((restriction, index) => (
                    <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {driver.trainingCertificates.length > 0 && (
              <div>
                <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>Training Certificates:</p>
                <div className="space-y-2">
                  {driver.trainingCertificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      <div>
                        <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
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
          </div>
        ))}
      </div>
    </div>
  );

  const renderClaims = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
          <div key={claim.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  {getStatusIcon(claim.status)}
                </div>
                <div>
                  <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Claim #{claim.claimNumber}
                  </h4>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {formatDate(claim.incidentDate)} • {claim.incidentLocation.address}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                {claim.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Damage Type</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {claim.damageType.join(', ')}
                </p>
              </div>
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Requested Amount</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {formatCurrency(claim.requestedAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Settled Amount</p>
                <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  {claim.settledAmount ? formatCurrency(claim.settledAmount) : 'Pending'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  {claim.documents.length} documents • {claim.photos.length} photos
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

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Policy Documents
        </h3>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.documents.map((doc) => (
          <div key={doc.id} className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
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
              {doc.isLatest && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Latest
                </span>
              )}
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
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Payment History
        </h3>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
          <Download className="h-4 w-4" />
          <span>Export History</span>
        </button>
      </div>

      <div className="space-y-4">
        {dashboardData.paymentHistory.map((payment) => (
          <div key={payment.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <CreditCard className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(payment.amount)}
                  </h4>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {formatDate(payment.date)} • {payment.method.replace('_', ' ')} • {payment.receiptNumber}
                  </p>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {payment.description}
                  </p>
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

  const renderChallans = () => (
    <div className="space-y-6">
      {/* Challan Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Gavel className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Challans</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {challanSummary.total}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-red-100">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Total Fines</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(challanSummary.totalFines)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Paid Amount</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(challanSummary.paid)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Pending Amount</p>
              <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                {formatCurrency(challanSummary.pending)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
            <input
              type="text"
              placeholder="Search challans by number, violation, or location..."
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
          <div className="relative">
            <select
              value={challanFilterStatus}
              onChange={(e) => setChallanFilterStatus(e.target.value)}
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
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Challan Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Violation
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Fine Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredChallans.map((challan, index) => (
                <tr key={challan.id} className={index % 2 === 0 ? '' : ''} style={{ backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-secondary)' }}>
                  <td className="px-6 py-4 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {challan.challanNumber}
                  </td>
                  <td className="px-6 py-4 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {formatDate(challan.date)}
                  </td>
                  <td className="px-6 py-4 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {challan.violation}
                  </td>
                  <td className="px-6 py-4 font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {challan.location}
                  </td>
                  <td className="px-6 py-4 font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {formatCurrency(challan.fineAmount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(challan.status)}`}>
                      {challan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="py-1 px-3 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 text-sm" style={{ backgroundColor: 'var(--color-primary)' }}>
                        {challan.status === 'pending' ? 'Pay Now' : 'View Receipt'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredChallans.length === 0 && (
        <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
          <Gavel className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h3 className="text-xl font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            No Challans Found
          </h3>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
            No challans match your search criteria or you have no traffic violations on record.
          </p>
        </div>
      )}
    </div>
  );

  const renderEndorsements = () => (
    <div className="space-y-6">
      {/* Endorsements Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Policy Endorsements
        </h3>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
          <Plus className="h-4 w-4" />
          <span>Request Endorsement</span>
        </button>
      </div>

      {/* Endorsement Types Info */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h4 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
          Available Endorsement Types
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <Users className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Add/Remove Driver</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Add or remove authorized drivers from your policy
            </p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <Car className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Vehicle Modification</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Update policy for vehicle modifications or accessories
            </p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Coverage Change</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Increase or decrease coverage amounts and add-ons
            </p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Address Change</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Update registered address or contact information
            </p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Nominee Change</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Update nominee or beneficiary details
            </p>
          </div>

          <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-secondary)' }}>
            <div className="flex items-center space-x-3 mb-2">
              <Settings className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              <h5 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Policy Transfer</h5>
            </div>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Transfer policy ownership or change vehicle registration
            </p>
          </div>
        </div>
      </div>

      {/* Active Endorsements */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Endorsement History
        </h4>
        
        {dashboardData.endorsements.map((endorsement) => (
          <div key={endorsement.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Edit className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h5 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {endorsement.type}
                  </h5>
                  <p className="font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>
                    {endorsement.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    <span>Effective Date: {formatDate(endorsement.effectiveDate)}</span>
                    <span>Premium Impact: {formatCurrency(endorsement.premium)}</span>
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
              <div className="flex space-x-2">
                <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                  View Documents
                </button>
                <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Endorsement Process Info */}
      <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
        <h4 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
          How to Request an Endorsement
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold">1</span>
            </div>
            <h5 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Submit Request
            </h5>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Click "Request Endorsement" and fill out the required details
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold">2</span>
            </div>
            <h5 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Document Upload
            </h5>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Upload supporting documents as required for your endorsement type
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold">3</span>
            </div>
            <h5 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Review & Approval
            </h5>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Our team will review your request and approve within 2-3 business days
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold">4</span>
            </div>
            <h5 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Policy Update
            </h5>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Your policy will be updated and new documents will be issued
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="rounded-xl shadow-lg p-6 border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <HelpCircle className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Need Help with Endorsements?
            </h4>
            <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
              Our customer support team is available to help you with any endorsement-related queries.
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <Phone className="h-4 w-4" />
              <span>Call Support</span>
            </button>
            <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderPolicyOverview();
      case 'vehicle':
        return renderVehicleInfo();
      case 'drivers':
        return renderDrivers();
      case 'claims':
        return renderClaims();
      case 'documents':
        return renderDocuments();
      case 'payments':
        return renderPayments();
      case 'challans':
        return renderChallans();
      case 'endorsements':
        return renderEndorsements();
      default:
        return renderPolicyOverview();
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
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
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
                <button onClick={() => navigate('/my-policy')} className="hover:underline" style={{ color: 'var(--color-muted)' }}>
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
      <div className="sticky top-16 z-30 backdrop-blur-md border-b" style={{ 
        backgroundColor: 'var(--color-background)', 
        borderColor: 'var(--color-border)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-4">
            {tabs.map((tab) => {
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default VehicleInsuranceDetailsPage;