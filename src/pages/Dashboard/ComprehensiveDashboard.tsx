import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Car, 
  AlertTriangle, 
  TrendingUp, 
  Calculator, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Activity,
  Target,
  Award,
  Zap,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Info,
  ExternalLink,
  Download,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Sparkles,
  Gauge
} from 'lucide-react';

interface RiskScore {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
  recommendation: string;
}

interface HealthMetrics {
  age: number;
  height: number;
  weight: number;
  bmi: number;
  preExistingConditions: string[];
  recommendedCoverage: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  coverage: string;
  premium: string;
  applicationLink: string;
  popularity: number;
  category: string;
}

interface Claim {
  id: string;
  type: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  dateSubmitted: string;
  lastUpdated: string;
  priority: 'low' | 'medium' | 'high';
}

interface SharedPolicy {
  id: string;
  type: string;
  policyNumber: string;
  sharedBy: string;
  relationship: string;
  sharingDate: string;
  coverage: string;
  status: 'active' | 'pending' | 'expired';
}

const ComprehensiveDashboard: React.FC = () => {
  // Risk Assessment State
  const [riskScores] = useState<RiskScore[]>([
    {
      category: 'Life Insurance',
      score: 85,
      trend: 'up',
      factors: ['Age: 32 years', 'Non-smoker', 'Regular exercise', 'Family history'],
      recommendation: 'Consider increasing coverage by 20%'
    },
    {
      category: 'Health Insurance',
      score: 78,
      trend: 'stable',
      factors: ['BMI: 24.5', 'No chronic conditions', 'Annual checkups'],
      recommendation: 'Add critical illness rider'
    },
    {
      category: 'Accident Insurance',
      score: 92,
      trend: 'up',
      factors: ['Safe driving record', 'Low-risk occupation', 'Safety training'],
      recommendation: 'Excellent profile, consider premium discounts'
    }
  ]);

  // Health Calculator State
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    age: 32,
    height: 175,
    weight: 70,
    bmi: 22.9,
    preExistingConditions: [],
    recommendedCoverage: 500000,
    riskLevel: 'low'
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedCoverage, setAnimatedCoverage] = useState(0);

  // Government Schemes State
  const [governmentSchemes] = useState<GovernmentScheme[]>([
    {
      id: '1',
      name: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      description: 'Comprehensive health insurance for economically vulnerable families',
      eligibility: ['BPL families', 'Annual income < ₹2.5 lakhs', 'SECC database inclusion'],
      coverage: '₹5,00,000 per family per year',
      premium: 'Free for eligible families',
      applicationLink: 'https://pmjay.gov.in',
      popularity: 95,
      category: 'Health'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      description: 'Life insurance scheme providing coverage in case of death',
      eligibility: ['Age 18-50 years', 'Bank account holder', 'Auto-debit consent'],
      coverage: '₹2,00,000 in case of death',
      premium: '₹330 per annum',
      applicationLink: 'https://jansuraksha.gov.in',
      popularity: 88,
      category: 'Life'
    },
    {
      id: '3',
      name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      description: 'Accident insurance scheme for accidental death and disability',
      eligibility: ['Age 18-70 years', 'Bank account holder', 'Auto-debit consent'],
      coverage: '₹2,00,000 for death, ₹1,00,000 for disability',
      premium: '₹12 per annum',
      applicationLink: 'https://jansuraksha.gov.in',
      popularity: 82,
      category: 'Accident'
    },
    {
      id: '4',
      name: 'Atal Pension Yojana (APY)',
      description: 'Pension scheme for unorganized sector workers',
      eligibility: ['Age 18-40 years', 'Indian citizen', 'Bank account'],
      coverage: '₹1,000 to ₹5,000 monthly pension',
      premium: 'Varies by age and pension amount',
      applicationLink: 'https://npscra.nsdl.co.in',
      popularity: 76,
      category: 'Pension'
    },
    {
      id: '5',
      name: 'Employees State Insurance (ESI)',
      description: 'Medical care and cash benefits for employees',
      eligibility: ['Employees earning ≤ ₹25,000/month', 'Organized sector'],
      coverage: 'Medical benefits + cash benefits',
      premium: '3.25% of wages (shared)',
      applicationLink: 'https://esic.nic.in',
      popularity: 71,
      category: 'Health'
    }
  ]);

  // Claims State
  const [claims] = useState<Claim[]>([
    {
      id: '1',
      type: 'Health Insurance',
      amount: '₹45,000',
      status: 'approved',
      dateSubmitted: '2024-01-15',
      lastUpdated: '2024-01-20',
      priority: 'high'
    },
    {
      id: '2',
      type: 'Motor Insurance',
      amount: '₹12,500',
      status: 'processing',
      dateSubmitted: '2024-01-18',
      lastUpdated: '2024-01-22',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Life Insurance',
      amount: '₹8,000',
      status: 'pending',
      dateSubmitted: '2024-01-20',
      lastUpdated: '2024-01-20',
      priority: 'low'
    }
  ]);

  // Shared Policies State
  const [sharedPolicies] = useState<SharedPolicy[]>([
    {
      id: '1',
      type: 'Family Health Insurance',
      policyNumber: 'FHI-2024-001',
      sharedBy: 'John Doe',
      relationship: 'Father',
      sharingDate: '2024-01-10',
      coverage: '₹10,00,000',
      status: 'active'
    },
    {
      id: '2',
      type: 'Group Life Insurance',
      policyNumber: 'GLI-2024-002',
      sharedBy: 'TechCorp Ltd.',
      relationship: 'Employer',
      sharingDate: '2024-01-05',
      coverage: '₹5,00,000',
      status: 'active'
    }
  ]);

  // Animation for coverage amount
  useEffect(() => {
    const targetAmount = healthMetrics.recommendedCoverage;
    const duration = 1500;
    const steps = 50;
    const increment = targetAmount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAmount) {
        setAnimatedCoverage(targetAmount);
        clearInterval(timer);
      } else {
        setAnimatedCoverage(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [healthMetrics.recommendedCoverage]);

  // Calculate BMI and update health metrics
  const calculateHealthMetrics = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const bmi = healthMetrics.weight / Math.pow(healthMetrics.height / 100, 2);
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      let baseCoverage = 300000;

      // Risk assessment based on age, BMI, and conditions
      if (healthMetrics.age > 45 || bmi > 30 || healthMetrics.preExistingConditions.length > 0) {
        riskLevel = 'high';
        baseCoverage = 800000;
      } else if (healthMetrics.age > 35 || bmi > 25) {
        riskLevel = 'medium';
        baseCoverage = 600000;
      }

      // Additional coverage for pre-existing conditions
      const conditionMultiplier = 1 + (healthMetrics.preExistingConditions.length * 0.2);
      const recommendedCoverage = Math.round(baseCoverage * conditionMultiplier);

      setHealthMetrics(prev => ({
        ...prev,
        bmi: Math.round(bmi * 10) / 10,
        riskLevel,
        recommendedCoverage
      }));

      setIsCalculating(false);
    }, 1000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'rejected': case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': case 'active':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'processing':
        return <Activity className="h-3 w-3" />;
      case 'rejected': case 'expired':
        return <XCircle className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
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

  return (
    <div className="min-h-screen p-3 md:p-4" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 rounded-xl mr-3" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-poppins bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Insurance Dashboard
            </h1>
          </div>
          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
            Comprehensive insurance management and risk assessment
          </p>
        </div>

        {/* Risk Assessment Overview */}
        <section className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Gauge className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              Risk Assessment Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {riskScores.map((risk, index) => (
              <div key={index} className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md hover:scale-105 ${getRiskBgColor(risk.score)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {risk.category}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <span className={`text-lg font-bold font-poppins ${getRiskColor(risk.score)}`}>
                      {risk.score}
                    </span>
                    {risk.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : risk.trend === 'down' ? (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    ) : (
                      <Minus className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        risk.score >= 80 ? 'bg-green-500' : 
                        risk.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${risk.score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {risk.factors.slice(0, 2).map((factor, idx) => (
                    <p key={idx} className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      • {factor}
                    </p>
                  ))}
                </div>

                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-background)' }}>
                  <p className="text-xs font-roboto font-medium" style={{ color: 'var(--color-foreground)' }}>
                    {risk.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Health Coverage Calculator */}
        <section className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Calculator className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
              AI-Powered Coverage Calculator
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={healthMetrics.age}
                    onChange={(e) => setHealthMetrics(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 text-sm border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={healthMetrics.height}
                    onChange={(e) => setHealthMetrics(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 text-sm border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Weight: {healthMetrics.weight} kg
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={healthMetrics.weight}
                    onChange={(e) => setHealthMetrics(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((healthMetrics.weight - 40) / 110) * 100}%, var(--color-border) ${((healthMetrics.weight - 40) / 110) * 100}%, var(--color-border) 100%)`
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Pre-existing Conditions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma'].map((condition) => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={healthMetrics.preExistingConditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setHealthMetrics(prev => ({
                              ...prev,
                              preExistingConditions: [...prev.preExistingConditions, condition]
                            }));
                          } else {
                            setHealthMetrics(prev => ({
                              ...prev,
                              preExistingConditions: prev.preExistingConditions.filter(c => c !== condition)
                            }));
                          }
                        }}
                        className="rounded border-2 transition-colors"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          accentColor: 'var(--color-primary)'
                        }}
                      />
                      <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateHealthMetrics}
                disabled={isCalculating}
                className="w-full py-2 px-4 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 text-sm"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </div>
                ) : (
                  'Calculate Coverage'
                )}
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>BMI</p>
                  <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {healthMetrics.bmi}
                  </p>
                  <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                    {healthMetrics.bmi < 18.5 ? 'Underweight' :
                     healthMetrics.bmi < 25 ? 'Normal' :
                     healthMetrics.bmi < 30 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Risk Level</p>
                  <p className={`text-lg font-bold font-poppins ${
                    healthMetrics.riskLevel === 'low' ? 'text-green-600' :
                    healthMetrics.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {healthMetrics.riskLevel.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-secondary)' }}>
                <div className="text-center">
                  <p className="text-xs font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>
                    Recommended Coverage
                  </p>
                  <p className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                    {formatCurrency(animatedCoverage)}
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="h-1 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        width: `${(animatedCoverage / healthMetrics.recommendedCoverage) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Personalized Recommendations:
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Family floater plan recommended
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Critical illness rider suggested
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Annual health checkup included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Government Insurance Schemes */}
        <section className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Government Insurance Schemes
              </h2>
            </div>
            <span className="text-xs font-roboto px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              {governmentSchemes.length} Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {governmentSchemes.map((scheme) => (
              <div key={scheme.id} className="border rounded-xl p-3 hover:shadow-md transition-all duration-300 hover:scale-105" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold font-poppins mb-1" style={{ color: 'var(--color-foreground)' }}>
                      {scheme.name}
                    </h3>
                    <span className="text-xs font-roboto px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      {scheme.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                        {scheme.popularity}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-roboto mb-2 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                  {scheme.description}
                </p>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3 w-3" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-roboto font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {scheme.coverage}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {scheme.premium}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                    Eligibility:
                  </p>
                  <ul className="space-y-0.5">
                    {scheme.eligibility.slice(0, 2).map((criteria, idx) => (
                      <li key={idx} className="text-xs font-roboto flex items-start" style={{ color: 'var(--color-muted)' }}>
                        <span className="mr-1">•</span>
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 text-center text-xs"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Apply Now
                  </a>
                  <button className="py-2 px-3 rounded-lg transition-all duration-200 text-xs" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                    <Info className="h-3 w-3" />
                  </button>
                </div>

                {/* Popularity Indicator */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Popularity</span>
                    <span className="font-roboto font-medium" style={{ color: 'var(--color-foreground)' }}>{scheme.popularity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="h-1 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        width: `${scheme.popularity}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Claims Dashboard */}
        <section className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <FileText className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Claims Dashboard
              </h2>
            </div>
            <button className="text-xs font-roboto px-3 py-1 rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              View All
            </button>
          </div>

          {/* Quick Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Total Claims</p>
              <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>12</p>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Pending</p>
              <p className="text-lg font-bold font-poppins text-yellow-600">3</p>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Approved</p>
              <p className="text-lg font-bold font-poppins text-green-600">8</p>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>Rejected</p>
              <p className="text-lg font-bold font-poppins text-red-600">1</p>
            </div>
          </div>

          {/* Recent Claims */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
              Recent Claims
            </h3>
            {claims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-3 hover:shadow-sm transition-all duration-200" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                      {getStatusIcon(claim.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {claim.type}
                      </h4>
                      <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Claim ID: {claim.id} • {claim.amount}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                    <p className="text-xs font-roboto mt-1" style={{ color: 'var(--color-muted)' }}>
                      {claim.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shared Policies Section */}
        <section className="rounded-xl shadow-lg p-4" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Users className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <h2 className="text-lg font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                Shared Policies
              </h2>
            </div>
            <span className="text-xs font-roboto px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
              {sharedPolicies.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sharedPolicies.map((policy) => (
              <div key={policy.id} className="border rounded-lg p-3 hover:shadow-sm transition-all duration-200" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.type}
                    </h3>
                    <p className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                      {policy.policyNumber}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Shared by: {policy.sharedBy}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-3 w-3" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Relationship: {policy.relationship}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3 w-3" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Coverage: {policy.coverage}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-3 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90 text-xs" style={{ backgroundColor: 'var(--color-primary)' }}>
                    View Details
                  </button>
                  <button className="py-2 px-3 rounded-lg transition-all duration-200 text-xs" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                    <Download className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ComprehensiveDashboard;