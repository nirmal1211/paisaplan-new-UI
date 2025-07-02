import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Printer,
  Calendar,
  DollarSign,
  Shield,
  Car,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  CreditCard,
  Star,
  Camera,
  Wrench,
  UserCheck,
  Building,
  Navigation,
  Filter,
  Search,
  Plus,
  Minus,
  Calculator,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { InsurancePolicy, NavigationState, PremiumCalculatorParams } from '../../types/insurance';
import { mockVehicleDashboardData } from '../../data/vehicleDashboardData';
import { VehicleDashboardData } from '../../types/vehicleDashboard';
import { premiumCalculator } from '../../utils/premiumCalculator';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [policy, setPolicy] = useState<InsurancePolicy | null>(null);
  const [dashboardData, setDashboardData] = useState<VehicleDashboardData>(mockVehicleDashboardData);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
  // Premium calculator state
  const [calculatorParams, setCalculatorParams] = useState<PremiumCalculatorParams | null>(null);
  const [calculatedPremium, setCalculatedPremium] = useState<any>(null);
  const [calculatorExpanded, setCalculatorExpanded] = useState(false);

  // Initialize data from navigation state
  useEffect(() => {
    const navigationState = location.state as NavigationState;
    
    if (navigationState?.policy) {
      setPolicy(navigationState.policy);
      setCalculatorParams(navigationState.calculatorParams);
      
      // Merge policy data with dashboard data
      setDashboardData(prev => ({
        ...prev,
        policy: navigationState.policy
      }));
    } else {
      // Handle direct URL access - you might want to fetch data from API
      console.warn('No policy data found in navigation state');
    }
    
    setLoading(false);
  }, [location.state]);

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

  // Navigation sections
  const sections = [
    { id: 'overview', label: 'Policy Overview', icon: Shield },
    { id: 'vehicle', label: 'Vehicle Details', icon: Car },
    { id: 'drivers', label: 'Authorized Drivers', icon: Users },
    { id: 'claims', label: 'Claims Center', icon: AlertTriangle },
    { id: 'documents', label: 'Document Center', icon: FileText },
    { id: 'endorsements', label: 'Endorsements', icon: Edit },
    { id: 'calculator', label: 'Premium Calculator', icon: Calculator }
  ];

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
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Calculate premium with current parameters
  const calculatePremium = () => {
    if (calculatorParams) {
      try {
        const result = premiumCalculator.calculatePremium(calculatorParams);
        setCalculatedPremium(result);
      } catch (error) {
        console.error('Premium calculation failed:', error);
      }
    }
  };

  // Update calculator parameter
  const updateCalculatorParam = (key: string, value: any) => {
    if (calculatorParams) {
      setCalculatorParams(prev => prev ? { ...prev, [key]: value } : null);
    }
  };

  // Render policy overview section
  const renderPolicyOverview = () => (
    <div className="space-y-6">
      {/* Policy Status Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Policy Status</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(policy?.status || '')}`}>
            {policy?.status?.toUpperCase()}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Policy Start</p>
            <p className="text-lg font-semibold text-gray-900">{formatDate(policy?.policyTerm.startDate || '')}</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Coverage Amount</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(policy?.coverage.ownDamage.sumInsured || 0)}</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Days to Renewal</p>
            <p className="text-lg font-semibold text-gray-900">
              {Math.ceil((new Date(policy?.policyTerm.endDate || '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Coverage Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Own Damage Coverage</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sum Insured:</span>
                <span className="font-medium">{formatCurrency(policy?.coverage.ownDamage.sumInsured || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deductible:</span>
                <span className="font-medium">{formatCurrency(policy?.coverage.ownDamage.deductible || 0)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Third Party Liability</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Bodily Injury:</span>
                <span className="font-medium">{formatCurrency(policy?.coverage.thirdPartyLiability.bodilyInjury || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Damage:</span>
                <span className="font-medium">{formatCurrency(policy?.coverage.thirdPartyLiability.propertyDamage || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Base Premium:</span>
            <span className="font-medium">{formatCurrency(policy?.premiumBreakdown.basePremium || 0)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Add-on Premiums:</span>
            <span className="font-medium">{formatCurrency(policy?.premiumBreakdown.addOnPremiums || 0)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">NCB Discount:</span>
            <span className="font-medium text-green-600">-{formatCurrency(policy?.premiumBreakdown.discounts.ncb || 0)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">GST (18%):</span>
            <span className="font-medium">{formatCurrency(policy?.premiumBreakdown.taxes.gst || 0)}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Total Premium:</span>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(policy?.premiumBreakdown.totalPremium || 0)}</span>
          </div>
        </div>
      </div>

      {/* Add-on Coverages */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Add-on Coverages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policy?.addOns.filter(addon => addon.isSelected).map((addon) => (
            <div key={addon.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{addon.name}</h4>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
              <p className="text-sm font-medium text-green-700">Premium: {formatCurrency(addon.premium)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-900">Pay Premium</p>
          </button>
          
          <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-green-900">Renew Policy</p>
          </button>
          
          <button className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="font-medium text-orange-900">File Claim</p>
          </button>
        </div>
      </div>
    </div>
  );

  // Render vehicle details section
  const renderVehicleDetails = () => (
    <div className="space-y-6">
      {/* Vehicle Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Basic Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Make:</span>
                <span className="font-medium">{policy?.vehicle.make}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium">{policy?.vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="font-medium">{policy?.vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-medium capitalize">{policy?.vehicle.fuelType}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Registration Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration No:</span>
                <span className="font-medium">{policy?.vehicle.registrationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engine No:</span>
                <span className="font-medium">{policy?.vehicle.engineNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chassis No:</span>
                <span className="font-medium">{policy?.vehicle.chassisNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Date:</span>
                <span className="font-medium">{formatDate(policy?.vehicle.registrationDate || '')}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Value & Capacity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Value:</span>
                <span className="font-medium">{formatCurrency(policy?.vehicle.vehicleValue || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cubic Capacity:</span>
                <span className="font-medium">{policy?.vehicle.cubicCapacity} CC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seating Capacity:</span>
                <span className="font-medium">{policy?.vehicle.seatingCapacity || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NCB:</span>
                <span className="font-medium">{policy?.vehicle.ncbPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Photos */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Vehicle Photos</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Camera className="h-4 w-4" />
            <span>Add Photos</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dashboardData.vehiclePhotos.map((photo) => (
            <div key={photo.id} className="relative group cursor-pointer" onClick={() => setSelectedPhoto(photo.url)}>
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 group-hover:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 rounded-lg transition-all">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Safety Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.safetyFeatures.map((feature) => (
            <div key={feature.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                <span className="text-sm font-medium text-green-700">
                  {feature.premiumImpact > 0 ? '+' : ''}{feature.premiumImpact}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {feature.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Modifications */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Vehicle Modifications</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Wrench className="h-4 w-4" />
            <span>Add Modification</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {dashboardData.modifications.map((modification) => (
            <div key={modification.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{modification.type}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(modification.approvalStatus)}`}>
                  {modification.approvalStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{modification.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Value: {formatCurrency(modification.value)}</span>
                <span className="text-gray-500">Installed: {formatDate(modification.installationDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render authorized drivers section
  const renderAuthorizedDrivers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Authorized Drivers</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserCheck className="h-4 w-4" />
            <span>Add Driver</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {dashboardData.authorizedDrivers.map((driver) => (
            <div key={driver.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.relationship}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    driver.riskRating === 'low' ? 'bg-green-100 text-green-800' :
                    driver.riskRating === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {driver.riskRating.toUpperCase()} RISK
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">License Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">License No:</span> {driver.licenseNumber}</p>
                    <p><span className="text-gray-600">Expires:</span> {formatDate(driver.licenseExpiryDate)}</p>
                    <p><span className="text-gray-600">DOB:</span> {formatDate(driver.dateOfBirth)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Premium Impact</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Additional Premium:</span> {formatCurrency(driver.premiumImpact)}</p>
                    <p><span className="text-gray-600">Violations:</span> {driver.drivingHistory.length}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
                  <div className="space-y-1 text-sm">
                    {driver.trainingCertificates.map((cert) => (
                      <p key={cert.id} className="text-green-600">
                        {cert.name} (-{cert.discountPercentage}%)
                      </p>
                    ))}
                    {driver.trainingCertificates.length === 0 && (
                      <p className="text-gray-500">No certifications</p>
                    )}
                  </div>
                </div>
              </div>
              
              {driver.restrictions.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-1">Restrictions</h4>
                  <ul className="text-sm text-yellow-700">
                    {driver.restrictions.map((restriction, index) => (
                      <li key={index}>• {restriction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render claims center section
  const renderClaimsCenter = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Claims Center</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>File New Claim</span>
          </button>
        </div>
        
        {/* Claims Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900">{dashboardData.claimsHistory.length}</p>
            <p className="text-sm text-blue-700">Total Claims</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900">
              {dashboardData.claimsHistory.filter(c => c.status === 'settled').length}
            </p>
            <p className="text-sm text-green-700">Settled</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-900">
              {dashboardData.claimsHistory.filter(c => ['submitted', 'under_review'].includes(c.status)).length}
            </p>
            <p className="text-sm text-yellow-700">Pending</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(dashboardData.claimsHistory.reduce((sum, claim) => sum + (claim.settledAmount || 0), 0))}
            </p>
            <p className="text-sm text-purple-700">Total Settled</p>
          </div>
        </div>
        
        {/* Claims List */}
        <div className="space-y-4">
          {dashboardData.claimsHistory.map((claim) => (
            <div key={claim.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      claim.status === 'settled' ? 'bg-green-100' :
                      claim.status === 'rejected' ? 'bg-red-100' :
                      'bg-yellow-100'
                    }`}>
                      {claim.status === 'settled' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : claim.status === 'rejected' ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{claim.claimNumber}</h3>
                      <p className="text-sm text-gray-600">{formatDate(claim.incidentDate)} • {claim.incidentLocation.address}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(claim.settledAmount || claim.requestedAmount)}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              {expandedClaim === claim.id && (
                <div className="p-6 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Incident Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600">Damage Type:</span> {claim.damageType.join(', ')}</p>
                        <p><span className="text-gray-600">Severity:</span> {claim.severity.replace('_', ' ').toUpperCase()}</p>
                        <p><span className="text-gray-600">Requested Amount:</span> {formatCurrency(claim.requestedAmount)}</p>
                        {claim.settledAmount && (
                          <p><span className="text-gray-600">Settled Amount:</span> {formatCurrency(claim.settledAmount)}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        {claim.adjusterDetails && (
                          <div>
                            <p className="text-gray-600">Adjuster:</p>
                            <p>{claim.adjusterDetails.name}</p>
                            <p>{claim.adjusterDetails.phone}</p>
                          </div>
                        )}
                        {claim.repairShop && (
                          <div className="mt-3">
                            <p className="text-gray-600">Repair Shop:</p>
                            <p>{claim.repairShop.name}</p>
                            <p>{claim.repairShop.phone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {claim.photos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Claim Photos</h4>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {claim.photos.map((photo) => (
                          <img
                            key={photo.id}
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
                            onClick={() => setSelectedPhoto(photo.url)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Documents
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      Track Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render document center section
  const renderDocumentCenter = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Document Center</h2>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="policy">Policy</option>
              <option value="receipt">Receipt</option>
              <option value="inspection">Inspection</option>
              <option value="correspondence">Correspondence</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardData.documents
            .filter(doc => 
              (filterType === 'all' || doc.type === filterType) &&
              (searchQuery === '' || doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((document) => (
              <div key={document.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  {document.isLatest && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Latest</span>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{document.name}</h3>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>Type: {document.type.charAt(0).toUpperCase() + document.type.slice(1)}</p>
                  <p>Version: {document.version}</p>
                  <p>Size: {document.size}</p>
                  <p>Uploaded: {formatDate(document.uploadDate)}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Eye className="h-4 w-4 inline mr-1" />
                    View
                  </button>
                  <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Render endorsements section
  const renderEndorsements = () => (
    <div className="space-y-6">
      {/* Endorsement Types Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Endorsements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-900">Add/Remove Driver</h3>
            </div>
            <p className="text-sm text-blue-700">Add or remove authorized drivers from your policy</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center mb-3">
              <Wrench className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-900">Vehicle Modification</h3>
            </div>
            <p className="text-sm text-green-700">Update policy for vehicle modifications or upgrades</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center mb-3">
              <Shield className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="font-semibold text-purple-900">Coverage Change</h3>
            </div>
            <p className="text-sm text-purple-700">Increase/decrease coverage amounts and add-ons</p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center mb-3">
              <MapPin className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="font-semibold text-orange-900">Address Change</h3>
            </div>
            <p className="text-sm text-orange-700">Update registered address or contact information</p>
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
            <div className="flex items-center mb-3">
              <Users className="h-6 w-6 text-pink-600 mr-2" />
              <h3 className="font-semibold text-pink-900">Nominee Change</h3>
            </div>
            <p className="text-sm text-pink-700">Update nominee or beneficiary details</p>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center mb-3">
              <Building className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="font-semibold text-indigo-900">Policy Transfer</h3>
            </div>
            <p className="text-sm text-indigo-700">Transfer policy ownership or change vehicle registration</p>
          </div>
        </div>

        {/* Request Endorsement Button */}
        <div className="text-center mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            <Plus className="h-5 w-5 inline mr-2" />
            Request Endorsement
          </button>
        </div>
      </div>

      {/* Endorsement History */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Endorsement History</h3>
        
        <div className="space-y-4">
          {dashboardData.endorsements.map((endorsement) => (
            <div key={endorsement.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{endorsement.type}</h4>
                    <p className="text-sm text-gray-600">{endorsement.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(endorsement.status)}`}>
                  {endorsement.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Effective Date:</span>
                  <p className="font-medium">{formatDate(endorsement.effectiveDate)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Premium Impact:</span>
                  <p className="font-medium">{formatCurrency(endorsement.premium)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Documents:</span>
                  <p className="font-medium">{endorsement.documents.length} file(s)</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <FileText className="h-4 w-4 inline mr-1" />
                  View Documents
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  <Eye className="h-4 w-4 inline mr-1" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endorsement Process Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">How to Request an Endorsement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Submit Request</h4>
            <p className="text-sm text-gray-600">Choose endorsement type and fill required details</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Document Upload</h4>
            <p className="text-sm text-gray-600">Upload supporting documents as required</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-600 font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Review & Approval</h4>
            <p className="text-sm text-gray-600">Our team reviews and processes your request</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Policy Update</h4>
            <p className="text-sm text-gray-600">Policy updated with new endorsement details</p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help with Endorsements?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Phone className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Call Support</p>
              <p className="text-sm text-blue-700">1800-123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Mail className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Email Support</p>
              <p className="text-sm text-green-700">endorsements@trovity.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render premium calculator section
  const renderPremiumCalculator = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Premium Calculator</h2>
          <button
            onClick={() => setCalculatorExpanded(!calculatorExpanded)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calculator className="h-4 w-4" />
            <span>{calculatorExpanded ? 'Collapse' : 'Expand'} Calculator</span>
          </button>
        </div>
        
        {calculatorExpanded && calculatorParams && (
          <div className="space-y-6">
            {/* Calculator Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Value</label>
                <input
                  type="number"
                  value={calculatorParams.vehicleValue}
                  onChange={(e) => updateCalculatorParam('vehicleValue', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NCB Percentage</label>
                <select
                  value={calculatorParams.ncbPercentage}
                  onChange={(e) => updateCalculatorParam('ncbPercentage', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>0%</option>
                  <option value={20}>20%</option>
                  <option value={25}>25%</option>
                  <option value={35}>35%</option>
                  <option value={45}>45%</option>
                  <option value={50}>50%</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Policy Duration (Months)</label>
                <select
                  value={calculatorParams.policyDuration}
                  onChange={(e) => updateCalculatorParam('policyDuration', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={12}>12 Months</option>
                  <option value={24}>24 Months</option>
                  <option value={36}>36 Months</option>
                </select>
              </div>
            </div>
            
            {/* Calculate Button */}
            <div className="text-center">
              <button
                onClick={calculatePremium}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Calculator className="h-5 w-5 inline mr-2" />
                Calculate Premium
              </button>
            </div>
            
            {/* Calculation Results */}
            {calculatedPremium && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Premium Calculation Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Premium Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Premium:</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.basePremium)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Add-on Premiums:</span>
                        <span className="font-medium">
                          {formatCurrency(Object.values(calculatedPremium.addOnPremiums).reduce((sum: number, premium: any) => sum + premium, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">NCB Discount:</span>
                        <span className="font-medium text-green-600">-{formatCurrency(calculatedPremium.discounts.ncb)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST (18%):</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.taxes.gst)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-semibold text-gray-900">Total Premium:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(calculatedPremium.totalPremium)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Coverage Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Own Damage:</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.breakdown.ownDamage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Third Party:</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.breakdown.thirdParty)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Personal Accident:</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.breakdown.personalAccident)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Add-ons:</span>
                        <span className="font-medium">{formatCurrency(calculatedPremium.breakdown.addOns)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Current Policy Premium Comparison */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Current Policy Premium</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(policy?.premiumBreakdown.totalPremium || 0)}</p>
          <p className="text-sm text-blue-700">Your current annual premium</p>
        </div>
      </div>
    </div>
  );

  // Render section content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderPolicyOverview();
      case 'vehicle':
        return renderVehicleDetails();
      case 'drivers':
        return renderAuthorizedDrivers();
      case 'claims':
        return renderClaimsCenter();
      case 'documents':
        return renderDocumentCenter();
      case 'endorsements':
        return renderEndorsements();
      case 'calculator':
        return renderPremiumCalculator();
      default:
        return renderPolicyOverview();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading policy details...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Policy Not Found</h2>
          <p className="text-gray-600 mb-4">The requested policy could not be found.</p>
          <button
            onClick={() => navigate('/my-policy')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Policies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Back Button and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/my-policy')}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{policy.vehicle.make} {policy.vehicle.model}</h1>
                <p className="text-sm text-gray-600">{policy.policyNumber} • {policy.provider}</p>
              </div>
            </div>

            {/* Policy Number and Actions */}
            <div className="flex items-center space-x-4">
              {/* Policy Number with Copy */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{policy.policyNumber}</span>
                <button
                  onClick={copyPolicyNumber}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy policy number"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-600" />}
                </button>
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(policy.status)}`}>
                {policy.status.toUpperCase()}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Print Policy"
                >
                  <Printer className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Download Policy"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
                
                <button
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Share Policy"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{section.label}</span>
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

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <XCircle className="h-8 w-8" />
            </button>
            <img
              src={selectedPhoto}
              alt="Vehicle photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Emergency Contacts Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData.emergencyContacts.map((contact) => (
              <div key={contact.type} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full">
                  <Phone className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  {contact.available24x7 && (
                    <span className="text-xs text-green-600">24x7 Available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsuranceDetailsPage;