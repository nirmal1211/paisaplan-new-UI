import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  Activity, 
  Calculator, 
  User, 
  Weight, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  RefreshCw,
  Info,
  Plus,
  Minus,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

// Types for the dashboard data
interface RiskScore {
  type: 'life' | 'health' | 'accident';
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: string[];
}

interface HealthCalculatorInputs {
  age: number;
  height: number;
  weight: number;
  preExistingConditions: string[];
}

interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  coverageAmount: string;
  premium: string;
  applicationLink: string;
}

interface Claim {
  id: string;
  type: string;
  dateSubmitted: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  lastUpdated: string;
}

interface SharedPolicy {
  id: string;
  type: string;
  policyNumber: string;
  sharedBy: string;
  relationship: string;
  sharingDate: string;
  coverageDetails: string;
  status: 'active' | 'expired' | 'pending';
}

const ComprehensiveDashboard: React.FC = () => {
  // State management
  const [riskScores, setRiskScores] = useState<RiskScore[]>([
    {
      type: 'life',
      score: 75,
      level: 'medium',
      factors: ['Age: 35 years', 'Non-smoker', 'Regular exercise', 'Family history of diabetes']
    },
    {
      type: 'health',
      score: 82,
      level: 'low',
      factors: ['Good BMI', 'No chronic conditions', 'Regular checkups', 'Healthy lifestyle']
    },
    {
      type: 'accident',
      score: 68,
      level: 'medium',
      factors: ['Urban driving', 'Clean driving record', 'Safety features in vehicle']
    }
  ]);

  const [healthInputs, setHealthInputs] = useState<HealthCalculatorInputs>({
    age: 30,
    height: 170,
    weight: 70,
    preExistingConditions: []
  });

  const [calculatedCoverage, setCalculatedCoverage] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Mock data
  const governmentSchemes: GovernmentScheme[] = [
    {
      id: '1',
      name: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      description: 'Provides health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization',
      eligibility: ['BPL families', 'SECC database beneficiaries', 'Rural and urban poor'],
      coverageAmount: '₹5,00,000 per family per year',
      premium: 'Free for eligible families',
      applicationLink: 'https://pmjay.gov.in'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      description: 'Accidental death and disability insurance scheme',
      eligibility: ['Age 18-70 years', 'Bank account holder', 'Indian citizen'],
      coverageAmount: '₹2,00,000 for accidental death',
      premium: '₹20 per annum',
      applicationLink: 'https://jansuraksha.gov.in'
    },
    {
      id: '3',
      name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      description: 'Life insurance scheme providing life cover',
      eligibility: ['Age 18-50 years', 'Bank account holder', 'Auto-renewal till age 55'],
      coverageAmount: '₹2,00,000 life cover',
      premium: '₹436 per annum',
      applicationLink: 'https://jansuraksha.gov.in'
    },
    {
      id: '4',
      name: 'Atal Pension Yojana (APY)',
      description: 'Pension scheme for unorganized sector workers',
      eligibility: ['Age 18-40 years', 'Indian citizen', 'Bank account holder'],
      coverageAmount: '₹1,000 to ₹5,000 monthly pension',
      premium: 'Varies based on age and pension amount',
      applicationLink: 'https://npscra.nsdl.co.in'
    },
    {
      id: '5',
      name: 'Employees State Insurance (ESI)',
      description: 'Medical care and cash benefits for employees',
      eligibility: ['Employees earning ≤₹25,000/month', 'Organized sector workers'],
      coverageAmount: 'Medical benefits + cash benefits',
      premium: '3.25% of wages (shared between employer and employee)',
      applicationLink: 'https://esic.nic.in'
    }
  ];

  const claims: Claim[] = [
    {
      id: '1',
      type: 'Health Insurance',
      dateSubmitted: '2024-05-15',
      amount: '₹45,000',
      status: 'approved',
      lastUpdated: '2024-05-20'
    },
    {
      id: '2',
      type: 'Motor Insurance',
      dateSubmitted: '2024-05-10',
      amount: '₹12,000',
      status: 'processing',
      lastUpdated: '2024-05-18'
    },
    {
      id: '3',
      type: 'Life Insurance',
      dateSubmitted: '2024-04-28',
      amount: '₹8,500',
      status: 'pending',
      lastUpdated: '2024-05-01'
    },
    {
      id: '4',
      type: 'Health Insurance',
      dateSubmitted: '2024-04-15',
      amount: '₹22,000',
      status: 'rejected',
      lastUpdated: '2024-04-20'
    }
  ];

  const sharedPolicies: SharedPolicy[] = [
    {
      id: '1',
      type: 'Family Health Insurance',
      policyNumber: 'FHI-2024-001',
      sharedBy: 'Rajesh Kumar',
      relationship: 'Father',
      sharingDate: '2024-01-15',
      coverageDetails: '₹10,00,000 family floater',
      status: 'active'
    },
    {
      id: '2',
      type: 'Group Life Insurance',
      policyNumber: 'GLI-2024-002',
      sharedBy: 'TechCorp Ltd.',
      relationship: 'Employer',
      sharingDate: '2024-02-01',
      coverageDetails: '₹25,00,000 life cover',
      status: 'active'
    },
    {
      id: '3',
      type: 'Motor Insurance',
      policyNumber: 'MI-2024-003',
      sharedBy: 'Priya Sharma',
      relationship: 'Spouse',
      sharingDate: '2024-03-10',
      coverageDetails: '₹8,50,000 comprehensive',
      status: 'active'
    }
  ];

  const preExistingConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid',
    'Kidney Disease', 'Liver Disease', 'Cancer History', 'Mental Health',
    'Arthritis', 'Obesity', 'Sleep Apnea'
  ];

  // Helper functions
  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getRiskColor = (level: string): string => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing': return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string): string => {
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

  // Calculate recommended coverage
  const calculateRecommendedCoverage = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { age, height, weight, preExistingConditions } = healthInputs;
    const bmi = calculateBMI(height, weight);
    
    // Base coverage calculation
    let baseCoverage = 500000; // Base ₹5 lakhs
    
    // Age factor
    if (age > 45) baseCoverage *= 1.5;
    else if (age > 35) baseCoverage *= 1.3;
    else if (age > 25) baseCoverage *= 1.1;
    
    // BMI factor
    if (bmi > 30 || bmi < 18.5) baseCoverage *= 1.4;
    else if (bmi > 25) baseCoverage *= 1.2;
    
    // Pre-existing conditions factor
    const conditionMultiplier = 1 + (preExistingConditions.length * 0.3);
    baseCoverage *= conditionMultiplier;
    
    // Round to nearest lakh
    const finalCoverage = Math.round(baseCoverage / 100000) * 100000;
    
    setCalculatedCoverage(finalCoverage);
    setIsCalculating(false);
  };

  const toggleCondition = (condition: string) => {
    setHealthInputs(prev => ({
      ...prev,
      preExistingConditions: prev.preExistingConditions.includes(condition)
        ? prev.preExistingConditions.filter(c => c !== condition)
        : [...prev.preExistingConditions, condition]
    }));
  };

  // Calculate statistics
  const claimStats = {
    total: claims.length,
    pending: claims.filter(c => c.status === 'pending').length,
    approved: claims.filter(c => c.status === 'approved').length,
    rejected: claims.filter(c => c.status === 'rejected').length
  };

  const overallRiskScore = Math.round(
    riskScores.reduce((sum, risk) => sum + risk.score, 0) / riskScores.length
  );

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
            Insurance Dashboard
          </h1>
          <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
            Comprehensive overview of your insurance portfolio and risk assessment
          </p>
        </div>

        {/* Risk Assessment Overview Section */}
        <section className="mb-12">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Risk Assessment Overview
                </h2>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Your personalized risk profile across different insurance categories
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                  {overallRiskScore}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Overall Score
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {riskScores.map((risk) => (
                <div key={risk.type} className="border rounded-xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        {risk.type === 'life' && <Heart className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />}
                        {risk.type === 'health' && <Activity className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />}
                        {risk.type === 'accident' && <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />}
                      </div>
                      <div>
                        <h3 className="font-semibold font-poppins capitalize" style={{ color: 'var(--color-foreground)' }}>
                          {risk.type} Insurance
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.level)}`}>
                          {risk.level.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {risk.score}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                      Risk Factors:
                    </h4>
                    {risk.factors.map((factor, index) => (
                      <div key={index} className="flex items-center text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Health Coverage Calculator Section */}
        <section className="mb-12">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Calculator className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Personal Health Coverage Calculator
                </h2>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Calculate your recommended health insurance coverage based on personal factors
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Personal Information
                </h3>

                {/* Age Input */}
                <div>
                  <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                    Age (years)
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setHealthInputs(prev => ({ ...prev, age: Math.max(18, prev.age - 1) }))}
                      className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      value={healthInputs.age}
                      onChange={(e) => setHealthInputs(prev => ({ ...prev, age: parseInt(e.target.value) || 18 }))}
                      className="flex-1 px-4 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)',
                        '--tw-ring-color': 'var(--color-primary)'
                      }}
                      min="18"
                      max="100"
                    />
                    <button
                      onClick={() => setHealthInputs(prev => ({ ...prev, age: Math.min(100, prev.age + 1) }))}
                      className="p-2 rounded-lg transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Height and Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium font-roboto mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={healthInputs.height}
                      onChange={(e) => setHealthInputs(prev => ({ ...prev, height: parseInt(e.target.value) || 150 }))}
                      className="w-full px-4 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
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
                      onChange={(e) => setHealthInputs(prev => ({ ...prev, weight: parseInt(e.target.value) || 50 }))}
                      className="w-full px-4 py-2 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
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
                </div>

                {/* BMI Display */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>BMI:</span>
                    <span className="font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      {calculateBMI(healthInputs.height, healthInputs.weight).toFixed(1)} ({getBMICategory(calculateBMI(healthInputs.height, healthInputs.weight))})
                    </span>
                  </div>
                </div>

                {/* Pre-existing Conditions */}
                <div>
                  <label className="block text-sm font-medium font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                    Pre-existing Conditions (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {preExistingConditions.map((condition) => (
                      <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={healthInputs.preExistingConditions.includes(condition)}
                          onChange={() => toggleCondition(condition)}
                          className="rounded focus:ring-2"
                          style={{ 
                            accentColor: 'var(--color-primary)',
                            '--tw-ring-color': 'var(--color-primary)'
                          }}
                        />
                        <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                          {condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateRecommendedCoverage}
                  disabled={isCalculating}
                  className="w-full py-3 px-6 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    'Calculate Recommended Coverage'
                  )}
                </button>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                  Calculation Results
                </h3>

                {calculatedCoverage ? (
                  <div className="space-y-4">
                    <div className="p-6 rounded-xl border-2" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-secondary)' }}>
                      <div className="text-center">
                        <div className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-primary)' }}>
                          ₹{(calculatedCoverage / 100000).toFixed(0)} Lakhs
                        </div>
                        <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          Recommended Health Insurance Coverage
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Personalized Recommendations:
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            Family Floater Plan with ₹{(calculatedCoverage / 100000).toFixed(0)} lakhs coverage
                          </span>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            Consider add-on covers for critical illness
                          </span>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                            Annual health checkup benefit recommended
                          </span>
                        </div>
                        
                        {healthInputs.preExistingConditions.length > 0 && (
                          <div className="flex items-start space-x-2">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                              Waiting period applies for pre-existing conditions
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full py-3 px-6 rounded-lg font-semibold font-roboto transition-all duration-200 hover:opacity-90" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                      View Recommended Plans
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
                    <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Enter your details and click calculate to see personalized recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Government Insurance Schemes Section */}
        <section className="mb-12">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Award className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Government Insurance Schemes
                </h2>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Explore available government insurance schemes and their benefits
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governmentSchemes.map((scheme) => (
                <div key={scheme.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      {scheme.name}
                    </h3>
                    <p className="text-sm font-roboto mb-3" style={{ color: 'var(--color-muted)' }}>
                      {scheme.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Coverage Amount:
                      </h4>
                      <p className="text-sm font-roboto font-medium" style={{ color: 'var(--color-primary)' }}>
                        {scheme.coverageAmount}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Premium:
                      </h4>
                      <p className="text-sm font-roboto font-medium" style={{ color: 'var(--color-primary)' }}>
                        {scheme.premium}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold font-roboto mb-1" style={{ color: 'var(--color-foreground)' }}>
                        Eligibility:
                      </h4>
                      <ul className="text-sm font-roboto space-y-1" style={{ color: 'var(--color-muted)' }}>
                        {scheme.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                            {criteria}
                          </li>
                        ))}
                      </ul>
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
        </section>

        {/* Claims Dashboard Section */}
        <section className="mb-12">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <FileText className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Claims Dashboard
                </h2>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Track and manage your insurance claims
                </p>
              </div>
            </div>

            {/* Claims Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="text-2xl font-bold font-poppins mb-1" style={{ color: 'var(--color-primary)' }}>
                  {claimStats.total}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Total Claims
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="text-2xl font-bold font-poppins mb-1 text-yellow-600">
                  {claimStats.pending}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Pending
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="text-2xl font-bold font-poppins mb-1 text-green-600">
                  {claimStats.approved}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Approved
                </div>
              </div>
              
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <div className="text-2xl font-bold font-poppins mb-1 text-red-600">
                  {claimStats.rejected}
                </div>
                <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Rejected
                </div>
              </div>
            </div>

            {/* Recent Claims */}
            <div>
              <h3 className="text-xl font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                Recent Claims
              </h3>
              
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(claim.status)}
                        <div>
                          <h4 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            {claim.type}
                          </h4>
                          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            Claim ID: {claim.id}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}>
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-roboto">
                      <div>
                        <span style={{ color: 'var(--color-muted)' }}>Amount:</span>
                        <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{claim.amount}</p>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-muted)' }}>Submitted:</span>
                        <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{claim.dateSubmitted}</p>
                      </div>
                      <div>
                        <span style={{ color: 'var(--color-muted)' }}>Last Updated:</span>
                        <p className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{claim.lastUpdated}</p>
                      </div>
                      <div className="flex justify-end">
                        <button className="py-1 px-3 rounded-lg font-medium transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shared Policies Section */}
        <section className="mb-12">
          <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <Users className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Shared Policies
                </h2>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Policies shared with you by family members and employers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sharedPolicies.map((policy) => (
                <div key={policy.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        <Shield className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          {policy.type}
                        </h3>
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                          {policy.policyNumber}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Shared by:</span>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                        {policy.sharedBy}
                      </p>
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        ({policy.relationship})
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Coverage:</span>
                      <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {policy.coverageDetails}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Shared on:</span>
                      <p className="font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        {policy.sharingDate}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 rounded-lg font-medium font-roboto transition-colors" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                    View Policy Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;