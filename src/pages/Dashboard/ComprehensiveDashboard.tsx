import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Shield, 
  Heart, 
  AlertTriangle, 
  Calculator, 
  Users, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  Share2,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Activity,
  Target,
  Award,
  Info,
  User,
  Phone,
  Mail,
  MapPin,
  Building
} from 'lucide-react';

// Types for dashboard data
interface RiskScore {
  overall: number;
  life: number;
  health: number;
  accident: number;
  factors: string[];
  recommendations: string[];
}

interface HealthCalculatorInputs {
  age: number;
  height: number;
  weight: number;
  preExistingConditions: string[];
  lifestyle: 'sedentary' | 'moderate' | 'active';
  smokingStatus: 'never' | 'former' | 'current';
  familyHistory: string[];
}

interface HealthCalculatorResult {
  recommendedCoverage: number;
  bmi: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  estimatedPremium: number;
}

interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  coverageAmount: string;
  premium: string;
  applicationLink: string;
  category: 'health' | 'life' | 'accident' | 'crop' | 'social';
  launchDate: string;
  beneficiaries: string;
}

interface Claim {
  id: string;
  claimId: string;
  type: 'health' | 'life' | 'motor' | 'accident';
  dateSubmitted: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  lastUpdated: string;
  description: string;
  policyNumber: string;
}

interface SharedPolicy {
  id: string;
  policyType: string;
  policyNumber: string;
  sharedBy: {
    name: string;
    relationship: string;
    avatar: string;
  };
  sharingDate: string;
  coverageDetails: {
    sumInsured: string;
    premium: string;
    validTill: string;
  };
  status: 'active' | 'expired' | 'pending';
  accessLevel: 'view' | 'manage' | 'claim';
}

const ComprehensiveDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // State management
  const [activeSection, setActiveSection] = useState<'risk' | 'calculator' | 'schemes' | 'claims' | 'shared'>('risk');
  const [healthInputs, setHealthInputs] = useState<HealthCalculatorInputs>({
    age: 30,
    height: 170,
    weight: 70,
    preExistingConditions: [],
    lifestyle: 'moderate',
    smokingStatus: 'never',
    familyHistory: []
  });
  const [calculatorResult, setCalculatorResult] = useState<HealthCalculatorResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeCategory, setSelectedSchemeCategory] = useState<string>('all');
  const [selectedClaimStatus, setSelectedClaimStatus] = useState<string>('all');

  // Mock data
  const riskScore: RiskScore = {
    overall: 72,
    life: 68,
    health: 75,
    accident: 73,
    factors: [
      'Age: 35 years (Low risk)',
      'BMI: 24.2 (Normal)',
      'No smoking history',
      'Regular exercise',
      'Family history of diabetes'
    ],
    recommendations: [
      'Consider increasing health insurance coverage',
      'Add critical illness rider to life insurance',
      'Maintain regular health checkups',
      'Consider accident insurance for high-risk activities'
    ]
  };

  const governmentSchemes: GovernmentScheme[] = [
    {
      id: '1',
      name: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      description: 'World\'s largest health insurance scheme providing coverage up to ₹5 lakh per family per year',
      eligibility: ['BPL families', 'SECC database beneficiaries', 'Rural and urban poor'],
      coverageAmount: '₹5,00,000 per family per year',
      premium: 'Free for eligible families',
      applicationLink: 'https://pmjay.gov.in',
      category: 'health',
      launchDate: '2018-09-23',
      beneficiaries: '12+ crore families'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      description: 'Life insurance scheme offering coverage of ₹2 lakh for accidental death',
      eligibility: ['Age 18-50 years', 'Bank account holder', 'Auto-debit consent'],
      coverageAmount: '₹2,00,000',
      premium: '₹330 per annum',
      applicationLink: 'https://jansuraksha.gov.in',
      category: 'life',
      launchDate: '2015-05-09',
      beneficiaries: '10+ crore people'
    },
    {
      id: '3',
      name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      description: 'Accident insurance scheme providing coverage for accidental death and disability',
      eligibility: ['Age 18-70 years', 'Bank account holder', 'Auto-debit consent'],
      coverageAmount: '₹2,00,000 (Death), ₹1,00,000 (Partial Disability)',
      premium: '₹12 per annum',
      applicationLink: 'https://jansuraksha.gov.in',
      category: 'accident',
      launchDate: '2015-05-09',
      beneficiaries: '25+ crore people'
    },
    {
      id: '4',
      name: 'Atal Pension Yojana (APY)',
      description: 'Pension scheme for unorganized sector workers with guaranteed pension',
      eligibility: ['Age 18-40 years', 'Indian citizen', 'Bank account holder'],
      coverageAmount: '₹1,000 to ₹5,000 monthly pension',
      premium: 'Based on age and pension amount',
      applicationLink: 'https://npscra.nsdl.co.in',
      category: 'social',
      launchDate: '2015-05-09',
      beneficiaries: '4+ crore subscribers'
    },
    {
      id: '5',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Crop insurance scheme providing financial support to farmers',
      eligibility: ['All farmers', 'Sharecroppers', 'Tenant farmers'],
      coverageAmount: 'Sum insured based on crop value',
      premium: '2% for Kharif, 1.5% for Rabi crops',
      applicationLink: 'https://pmfby.gov.in',
      category: 'crop',
      launchDate: '2016-01-13',
      beneficiaries: '5+ crore farmers'
    },
    {
      id: '6',
      name: 'Employees\' State Insurance (ESI)',
      description: 'Medical care and cash benefits to employees and their dependents',
      eligibility: ['Employees earning ≤₹25,000', 'Factories with 10+ employees'],
      coverageAmount: 'Medical benefits + cash benefits',
      premium: '3.25% of wages (shared between employer and employee)',
      applicationLink: 'https://esic.nic.in',
      category: 'health',
      launchDate: '1948-04-24',
      beneficiaries: '3+ crore beneficiaries'
    }
  ];

  const claims: Claim[] = [
    {
      id: '1',
      claimId: 'CLM2024001',
      type: 'health',
      dateSubmitted: '2024-05-15',
      amount: 45000,
      status: 'approved',
      lastUpdated: '2024-05-20',
      description: 'Hospitalization for appendectomy',
      policyNumber: 'HLTH12345'
    },
    {
      id: '2',
      claimId: 'CLM2024002',
      type: 'motor',
      dateSubmitted: '2024-05-10',
      amount: 12000,
      status: 'processing',
      lastUpdated: '2024-05-18',
      description: 'Vehicle repair after minor accident',
      policyNumber: 'MOTR67890'
    },
    {
      id: '3',
      claimId: 'CLM2024003',
      type: 'health',
      dateSubmitted: '2024-05-08',
      amount: 8500,
      status: 'pending',
      lastUpdated: '2024-05-08',
      description: 'Diagnostic tests and consultation',
      policyNumber: 'HLTH12345'
    },
    {
      id: '4',
      claimId: 'CLM2024004',
      type: 'accident',
      dateSubmitted: '2024-04-25',
      amount: 25000,
      status: 'rejected',
      lastUpdated: '2024-05-01',
      description: 'Personal accident claim',
      policyNumber: 'ACCDT98765'
    }
  ];

  const sharedPolicies: SharedPolicy[] = [
    {
      id: '1',
      policyType: 'Family Health Insurance',
      policyNumber: 'FHLTH001234',
      sharedBy: {
        name: 'Rajesh Kumar',
        relationship: 'Father',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      sharingDate: '2024-01-15',
      coverageDetails: {
        sumInsured: '₹10,00,000',
        premium: '₹25,000',
        validTill: '2025-01-14'
      },
      status: 'active',
      accessLevel: 'view'
    },
    {
      id: '2',
      policyType: 'Group Life Insurance',
      policyNumber: 'GLIFE567890',
      sharedBy: {
        name: 'Priya Sharma',
        relationship: 'Spouse',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      sharingDate: '2024-02-20',
      coverageDetails: {
        sumInsured: '₹50,00,000',
        premium: '₹15,000',
        validTill: '2025-02-19'
      },
      status: 'active',
      accessLevel: 'manage'
    },
    {
      id: '3',
      policyType: 'Motor Insurance',
      policyNumber: 'MOTR123456',
      sharedBy: {
        name: 'Amit Patel',
        relationship: 'Brother',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      sharingDate: '2024-03-10',
      coverageDetails: {
        sumInsured: '₹8,50,000',
        premium: '₹18,500',
        validTill: '2025-03-09'
      },
      status: 'active',
      accessLevel: 'claim'
    }
  ];

  // Health calculator functions
  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const calculateHealthCoverage = (): void => {
    const bmi = calculateBMI(healthInputs.height, healthInputs.weight);
    
    // Base coverage calculation
    let baseCoverage = 300000; // Base ₹3 lakh
    
    // Age factor
    if (healthInputs.age > 45) baseCoverage += 200000;
    else if (healthInputs.age > 35) baseCoverage += 100000;
    
    // BMI factor
    if (bmi > 30 || bmi < 18.5) baseCoverage += 150000;
    else if (bmi > 25 || bmi < 20) baseCoverage += 75000;
    
    // Pre-existing conditions
    baseCoverage += healthInputs.preExistingConditions.length * 100000;
    
    // Lifestyle factors
    if (healthInputs.smokingStatus === 'current') baseCoverage += 200000;
    else if (healthInputs.smokingStatus === 'former') baseCoverage += 100000;
    
    if (healthInputs.lifestyle === 'sedentary') baseCoverage += 50000;
    
    // Family history
    baseCoverage += healthInputs.familyHistory.length * 75000;
    
    // Risk level calculation
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (healthInputs.preExistingConditions.length > 2 || healthInputs.smokingStatus === 'current' || bmi > 30) {
      riskLevel = 'high';
    } else if (healthInputs.preExistingConditions.length > 0 || healthInputs.age > 45 || bmi > 25) {
      riskLevel = 'medium';
    }
    
    // Premium estimation (simplified)
    const basePremium = baseCoverage * 0.03; // 3% of coverage
    let premiumMultiplier = 1;
    
    if (riskLevel === 'high') premiumMultiplier = 1.5;
    else if (riskLevel === 'medium') premiumMultiplier = 1.2;
    
    const estimatedPremium = Math.round(basePremium * premiumMultiplier);
    
    // Recommendations
    const recommendations = [];
    if (bmi > 25) recommendations.push('Consider weight management for better health and lower premiums');
    if (healthInputs.smokingStatus !== 'never') recommendations.push('Quit smoking to reduce health risks and insurance costs');
    if (healthInputs.lifestyle === 'sedentary') recommendations.push('Increase physical activity for better health outcomes');
    if (healthInputs.preExistingConditions.length > 0) recommendations.push('Regular monitoring and management of existing conditions');
    if (healthInputs.age > 40) recommendations.push('Consider comprehensive health checkups annually');
    
    setCalculatorResult({
      recommendedCoverage: baseCoverage,
      bmi,
      riskLevel,
      recommendations,
      estimatedPremium
    });
  };

  // Filtered data
  const filteredSchemes = useMemo(() => {
    return governmentSchemes.filter(scheme => {
      const matchesCategory = selectedSchemeCategory === 'all' || scheme.category === selectedSchemeCategory;
      const matchesSearch = searchQuery === '' || 
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedSchemeCategory]);

  const filteredClaims = useMemo(() => {
    return claims.filter(claim => {
      return selectedClaimStatus === 'all' || claim.status === selectedClaimStatus;
    });
  }, [selectedClaimStatus]);

  // Statistics
  const claimStats = useMemo(() => {
    const total = claims.length;
    const pending = claims.filter(c => c.status === 'pending').length;
    const approved = claims.filter(c => c.status === 'approved').length;
    const rejected = claims.filter(c => c.status === 'rejected').length;
    const processing = claims.filter(c => c.status === 'processing').length;
    
    return { total, pending, approved, rejected, processing };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing': return <Activity className="h-5 w-5 text-blue-500" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  const preExistingConditionOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 
    'Kidney Disease', 'Liver Disease', 'Cancer History', 'Arthritis', 'Depression'
  ];

  const familyHistoryOptions = [
    'Heart Disease', 'Diabetes', 'Cancer', 'Stroke', 'High Blood Pressure',
    'Kidney Disease', 'Mental Health Issues', 'Autoimmune Disorders'
  ];

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Insurance Dashboard
          </h1>
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
            Comprehensive insurance management and risk assessment
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
          {[
            { id: 'risk', label: 'Risk Assessment', icon: Shield },
            { id: 'calculator', label: 'Health Calculator', icon: Calculator },
            { id: 'schemes', label: 'Government Schemes', icon: Building },
            { id: 'claims', label: 'Claims Dashboard', icon: FileText },
            { id: 'shared', label: 'Shared Policies', icon: Share2 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium font-roboto transition-all ${
                activeSection === id ? 'shadow-sm transform scale-105' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: activeSection === id ? 'var(--color-card)' : 'transparent',
                color: activeSection === id ? 'var(--color-primary)' : 'var(--color-muted)',
                border: activeSection === id ? `1px solid var(--color-border)` : '1px solid transparent'
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'risk' && (
          <div className="space-y-6">
            {/* Risk Score Overview */}
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Risk Assessment Overview
              </h2>
              
              {/* Overall Risk Score */}
              <div className="text-center mb-8">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="var(--color-secondary)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="var(--color-primary)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(riskScore.overall / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {riskScore.overall}
                      </div>
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Risk Score
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Good Risk Profile
                </p>
              </div>

              {/* Individual Risk Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { type: 'Life Insurance', score: riskScore.life, icon: Heart, color: '#ef4444' },
                  { type: 'Health Insurance', score: riskScore.health, icon: Shield, color: '#22c55e' },
                  { type: 'Accident Insurance', score: riskScore.accident, icon: AlertTriangle, color: '#f59e0b' }
                ].map(({ type, score, icon: Icon, color }) => (
                  <div key={type} className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
                        <Icon className="h-6 w-6" style={{ color }} />
                      </div>
                    </div>
                    <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      {type}
                    </h3>
                    <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {score}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${score}%`,
                          backgroundColor: color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk Factors and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                    Risk Factors
                  </h3>
                  <div className="space-y-3">
                    {riskScore.factors.map((factor, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {factor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {riskScore.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Target className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {recommendation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <h2 className="text-2xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
                Personal Health Coverage Calculator
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Age
                      </label>
                      <input
                        type="number"
                        value={healthInputs.age}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, age: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                        min="18"
                        max="80"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={healthInputs.height}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, height: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                        min="100"
                        max="250"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={healthInputs.weight}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, weight: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                        min="30"
                        max="200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Lifestyle
                      </label>
                      <select
                        value={healthInputs.lifestyle}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, lifestyle: e.target.value as any }))}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="sedentary">Sedentary</option>
                        <option value="moderate">Moderate</option>
                        <option value="active">Active</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                        Smoking Status
                      </label>
                      <select
                        value={healthInputs.smokingStatus}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, smokingStatus: e.target.value as any }))}
                        className="w-full px-3 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="never">Never Smoked</option>
                        <option value="former">Former Smoker</option>
                        <option value="current">Current Smoker</option>
                      </select>
                    </div>
                  </div>

                  {/* Pre-existing Conditions */}
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Pre-existing Conditions
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {preExistingConditionOptions.map((condition) => (
                        <label key={condition} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={healthInputs.preExistingConditions.includes(condition)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setHealthInputs(prev => ({
                                  ...prev,
                                  preExistingConditions: [...prev.preExistingConditions, condition]
                                }));
                              } else {
                                setHealthInputs(prev => ({
                                  ...prev,
                                  preExistingConditions: prev.preExistingConditions.filter(c => c !== condition)
                                }));
                              }
                            }}
                            className="rounded"
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {condition}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Family History */}
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Family History
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {familyHistoryOptions.map((condition) => (
                        <label key={condition} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={healthInputs.familyHistory.includes(condition)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setHealthInputs(prev => ({
                                  ...prev,
                                  familyHistory: [...prev.familyHistory, condition]
                                }));
                              } else {
                                setHealthInputs(prev => ({
                                  ...prev,
                                  familyHistory: prev.familyHistory.filter(c => c !== condition)
                                }));
                              }
                            }}
                            className="rounded"
                            style={{ accentColor: 'var(--color-primary)' }}
                          />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            {condition}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={calculateHealthCoverage}
                    className="w-full py-3 px-6 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Calculate Recommended Coverage
                  </button>
                </div>

                {/* Results */}
                <div>
                  {calculatorResult && (
                    <div className="space-y-6">
                      <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <h3 className="text-lg font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                          Recommended Coverage
                        </h3>
                        <div className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                          {formatCurrency(calculatorResult.recommendedCoverage)}
                        </div>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          Based on your profile and risk factors
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                          <div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                            {calculatorResult.bmi}
                          </div>
                          <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>BMI</div>
                        </div>

                        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                          <div className={`text-xl font-bold font-poppins ${
                            calculatorResult.riskLevel === 'low' ? 'text-green-600' :
                            calculatorResult.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {calculatorResult.riskLevel.toUpperCase()}
                          </div>
                          <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Risk Level</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <h4 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                          Estimated Annual Premium
                        </h4>
                        <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                          {formatCurrency(calculatorResult.estimatedPremium)}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold font-poppins mb-3" style={{ color: 'var(--color-foreground)' }}>
                          Personalized Recommendations
                        </h4>
                        <div className="space-y-2">
                          {calculatorResult.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Award className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                              <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                {recommendation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'schemes' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search government schemes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2"
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
                    value={selectedSchemeCategory}
                    onChange={(e) => setSelectedSchemeCategory(e.target.value)}
                    className="appearance-none border rounded-lg px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-2 min-w-48"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="health">Health</option>
                    <option value="life">Life</option>
                    <option value="accident">Accident</option>
                    <option value="social">Social Security</option>
                    <option value="crop">Crop Insurance</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
                </div>
              </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                        {scheme.name}
                      </h3>
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                        style={{ 
                          backgroundColor: 'var(--color-secondary)',
                          color: 'var(--color-primary)'
                        }}
                      >
                        {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="font-roboto mb-4" style={{ color: 'var(--color-foreground)' }}>
                    {scheme.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-semibold font-roboto text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Coverage Amount:
                      </h4>
                      <p className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                        {scheme.coverageAmount}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold font-roboto text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Premium:
                      </h4>
                      <p className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                        {scheme.premium}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold font-roboto text-sm mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Eligibility:
                      </h4>
                      <ul className="list-disc list-inside text-sm font-roboto space-y-1" style={{ color: 'var(--color-muted)' }}>
                        {scheme.eligibility.slice(0, 3).map((criteria, index) => (
                          <li key={index}>{criteria}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      <span>Launched: {formatDate(scheme.launchDate)}</span>
                      <span>Beneficiaries: {scheme.beneficiaries}</span>
                    </div>
                  </div>

                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'claims' && (
          <div className="space-y-6">
            {/* Claims Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Total Claims', value: claimStats.total, icon: FileText, color: '#6b7280' },
                { label: 'Pending', value: claimStats.pending, icon: Clock, color: '#f59e0b' },
                { label: 'Processing', value: claimStats.processing, icon: Activity, color: '#3b82f6' },
                { label: 'Approved', value: claimStats.approved, icon: CheckCircle, color: '#22c55e' },
                { label: 'Rejected', value: claimStats.rejected, icon: XCircle, color: '#ef4444' }
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-xl shadow-lg p-4 text-center" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {value}
                  </div>
                  <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Claims Filter */}
            <div className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex items-center space-x-4">
                <span className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Filter by status:
                </span>
                <select
                  value={selectedClaimStatus}
                  onChange={(e) => setSelectedClaimStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2 font-roboto focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Claims List */}
            <div className="space-y-4">
              {filteredClaims.map((claim) => (
                <div key={claim.id} className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        {getStatusIcon(claim.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {claim.claimId}
                        </h3>
                        <p className="font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>
                          {claim.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          <span>Type: {claim.type.charAt(0).toUpperCase() + claim.type.slice(1)}</span>
                          <span>Amount: {formatCurrency(claim.amount)}</span>
                          <span>Policy: {claim.policyNumber}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-4 text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      <span>Submitted: {formatDate(claim.dateSubmitted)}</span>
                      <span>Last Updated: {formatDate(claim.lastUpdated)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        <Eye className="h-4 w-4 inline mr-2" />
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
        )}

        {activeSection === 'shared' && (
          <div className="space-y-6">
            {/* Shared Policies Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Shared Policies
              </h2>
              <button className="flex items-center space-x-2 py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                <Plus className="h-4 w-4" />
                <span>Request Access</span>
              </button>
            </div>

            {/* Shared Policies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sharedPolicies.map((policy) => (
                <div key={policy.id} className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--color-card)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={policy.sharedBy.avatar}
                        alt={policy.sharedBy.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {policy.policyType}
                        </h3>
                        <p className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                          {policy.policyNumber}
                        </p>
                        <p className="font-roboto text-sm" style={{ color: 'var(--color-muted)' }}>
                          Shared by {policy.sharedBy.name} ({policy.sharedBy.relationship})
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(policy.status)}`}>
                        {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-secondary)',
                          color: 'var(--color-primary)'
                        }}
                      >
                        {policy.accessLevel.charAt(0).toUpperCase() + policy.accessLevel.slice(1)} Access
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Sum Insured</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {policy.coverageDetails.sumInsured}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Premium</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {policy.coverageDetails.premium}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Valid Till</p>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {formatDate(policy.coverageDetails.validTill)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Shared on: {formatDate(policy.sharingDate)}
                    </div>
                    <div className="flex space-x-2">
                      <button className="py-2 px-4 rounded-lg font-medium font-roboto transition-all duration-200" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                        <Eye className="h-4 w-4 inline mr-2" />
                        View
                      </button>
                      {policy.accessLevel !== 'view' && (
                        <button className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)' }}>
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;