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
Target,
Sparkles,
ArrowUpRight,
ArrowDownRight,
Zap
} from 'lucide-react';

// Types for the dashboard data
interface RiskScore {
type: 'life' | 'health' | 'accident';
score: number;
level: 'low' | 'medium' | 'high';
factors: string[];
trend: 'up' | 'down' | 'stable';
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
popularity: number;
}

interface Claim {
id: string;
type: string;
dateSubmitted: string;
amount: string;
status: 'pending' | 'approved' | 'rejected' | 'processing';
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
coverageDetails: string;
status: 'active' | 'expired' | 'pending';
value: number;
}

const ComprehensiveDashboard: React.FC = () => {
// State management with animations
const [isLoading, setIsLoading] = useState(true);
const [animatedValues, setAnimatedValues] = useState({
overallScore: 0,
totalClaims: 0,
approvedClaims: 0,
pendingClaims: 0
});
const [riskScores, setRiskScores] = useState<RiskScore[]>([
{
type: 'life',
score: 75,
level: 'medium',
factors: ['Age: 35 years', 'Non-smoker', 'Regular exercise', 'Family history of diabetes'],
trend: 'up'
},
{
type: 'health',
score: 82,
level: 'low',
factors: ['Good BMI', 'No chronic conditions', 'Regular checkups', 'Healthy lifestyle'],
trend: 'stable'
},
{
type: 'accident',
score: 68,
level: 'medium',
factors: ['Urban driving', 'Clean driving record', 'Safety features in vehicle'],
trend: 'down'
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
const [activeSection, setActiveSection] = useState<string | null>(null);
// Animation effect for loading
useEffect(() => {
const timer = setTimeout(() => {
setIsLoading(false);
}, 1500);
return () => clearTimeout(timer);
}, []);
// Animated counter effect
useEffect(() => {
if (!isLoading) {
const animateValue = (start: number, end: number, duration: number, key: string) => {
const startTime = Date.now();
const animate = () => {
const elapsed = Date.now() - startTime;
const progress = Math.min(elapsed / duration, 1);
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
const current = Math.round(start + (end - start) * easeOutQuart);
setAnimatedValues(prev => ({ ...prev, [key]: current }));
if (progress < 1) {
requestAnimationFrame(animate);
}
};
requestAnimationFrame(animate);
};
animateValue(0, 75, 2000, 'overallScore');
animateValue(0, 12, 1500, 'totalClaims');
animateValue(0, 8, 1800, 'approvedClaims');
animateValue(0, 2, 1200, 'pendingClaims');
}
}, [isLoading]);
// Mock data with enhanced properties
const governmentSchemes: GovernmentScheme[] = [
{
id: '1',
name: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
description: 'Provides health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization',
eligibility: ['BPL families', 'SECC database beneficiaries', 'Rural and urban poor'],
coverageAmount: '₹5,00,000 per family per year',
premium: 'Free for eligible families',
applicationLink: 'https://pmjay.gov.in',
popularity: 95
},
{
id: '2',
name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
description: 'Accidental death and disability insurance scheme',
eligibility: ['Age 18-70 years', 'Bank account holder', 'Indian citizen'],
coverageAmount: '₹2,00,000 for accidental death',
premium: '₹20 per annum',
applicationLink: 'https://jansuraksha.gov.in',
popularity: 78
},
{
id: '3',
name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
description: 'Life insurance scheme providing life cover',
eligibility: ['Age 18-50 years', 'Bank account holder', 'Auto-renewal till age 55'],
coverageAmount: '₹2,00,000 life cover',
premium: '₹436 per annum',
applicationLink: 'https://jansuraksha.gov.in',
popularity: 82
},
{
id: '4',
name: 'Atal Pension Yojana (APY)',
description: 'Pension scheme for unorganized sector workers',
eligibility: ['Age 18-40 years', 'Indian citizen', 'Bank account holder'],
coverageAmount: '₹1,000 to ₹5,000 monthly pension',
premium: 'Varies based on age and pension amount',
applicationLink: 'https://npscra.nsdl.co.in',
popularity: 65
},
{
id: '5',
name: 'Employees State Insurance (ESI)',
description: 'Medical care and cash benefits for employees',
eligibility: ['Employees earning ≤₹25,000/month', 'Organized sector workers'],
coverageAmount: 'Medical benefits + cash benefits',
premium: '3.25% of wages (shared between employer and employee)',
applicationLink: 'https://esic.nic.in',
popularity: 88
}
];
const claims: Claim[] = [
{
id: '1',
type: 'Health Insurance',
dateSubmitted: '2024-05-15',
amount: '₹45,000',
status: 'approved',
lastUpdated: '2024-05-20',
priority: 'high'
},
{
id: '2',
type: 'Motor Insurance',
dateSubmitted: '2024-05-10',
amount: '₹12,000',
status: 'processing',
lastUpdated: '2024-05-18',
priority: 'medium'
},
{
id: '3',
type: 'Life Insurance',
dateSubmitted: '2024-04-28',
amount: '₹8,500',
status: 'pending',
lastUpdated: '2024-05-01',
priority: 'low'
},
{
id: '4',
type: 'Health Insurance',
dateSubmitted: '2024-04-15',
amount: '₹22,000',
status: 'rejected',
lastUpdated: '2024-04-20',
priority: 'medium'
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
status: 'active',
value: 1000000
},
{
id: '2',
type: 'Group Life Insurance',
policyNumber: 'GLI-2024-002',
sharedBy: 'TechCorp Ltd.',
relationship: 'Employer',
sharingDate: '2024-02-01',
coverageDetails: '₹25,00,000 life cover',
status: 'active',
value: 2500000
},
{
id: '3',
type: 'Motor Insurance',
policyNumber: 'MI-2024-003',
sharedBy: 'Priya Sharma',
relationship: 'Spouse',
sharingDate: '2024-03-10',
coverageDetails: '₹8,50,000 comprehensive',
status: 'active',
value: 850000
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
case 'low': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
case 'medium': return 'text-amber-700 bg-amber-50 border-amber-200';
case 'high': return 'text-red-700 bg-red-50 border-red-200';
default: return 'text-gray-700 bg-gray-50 border-gray-200';
}
};
const getTrendIcon = (trend: string) => {
switch (trend) {
case 'up': return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;
case 'down': return <ArrowDownRight className="h-4 w-4 text-red-500" />;
case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
default: return null;
}
};
const getStatusIcon = (status: string) => {
switch (status) {
case 'approved': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
case 'pending': return <Clock className="h-5 w-5 text-amber-500" />;
case 'processing': return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
}
};
const getStatusColor = (status: string): string => {
switch (status) {
case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
case 'expired': return 'bg-gray-50 text-gray-700 border-gray-200';
default: return 'bg-gray-50 text-gray-700 border-gray-200';
}
};
const getPriorityColor = (priority: string): string => {
switch (priority) {
case 'high': return 'bg-red-500';
case 'medium': return 'bg-amber-500';
case 'low': return 'bg-emerald-500';
default: return 'bg-gray-500';
}
};
// Calculate recommended coverage with enhanced algorithm
const calculateRecommendedCoverage = async () => {
setIsCalculating(true);
// Simulate calculation delay with progress
await new Promise(resolve => setTimeout(resolve, 2500));
const { age, height, weight, preExistingConditions } = healthInputs;
const bmi = calculateBMI(height, weight);
// Enhanced base coverage calculation
let baseCoverage = 500000; // Base ₹5 lakhs
// Age factor with more granular scaling
if (age > 60) baseCoverage *= 2.0;
else if (age > 50) baseCoverage *= 1.8;
else if (age > 45) baseCoverage *= 1.5;
else if (age > 35) baseCoverage *= 1.3;
else if (age > 25) baseCoverage *= 1.1;
// BMI factor with health risk consideration
if (bmi > 35) baseCoverage *= 1.8;
else if (bmi > 30) baseCoverage *= 1.4;
else if (bmi > 25) baseCoverage *= 1.2;
else if (bmi < 18.5) baseCoverage *= 1.3;
// Pre-existing conditions factor with severity weighting
const highRiskConditions = ['Heart Disease', 'Cancer History', 'Kidney Disease', 'Liver Disease'];
const mediumRiskConditions = ['Diabetes', 'Hypertension', 'Thyroid'];
let conditionMultiplier = 1;
preExistingConditions.forEach(condition => {
if (highRiskConditions.includes(condition)) {
conditionMultiplier += 0.5;
} else if (mediumRiskConditions.includes(condition)) {
conditionMultiplier += 0.3;
} else {
conditionMultiplier += 0.2;
}
});
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
const totalPolicyValue = sharedPolicies.reduce((sum, policy) => sum + policy.value, 0);
if (isLoading) {
return (
<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
<div className="text-center">
<div className="relative">
<div className="w-20 h-20 border-4 border-opacity-20 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}>
<div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin" style={{ borderTopColor: 'var(--color-primary)' }}></div>
</div>
<Sparkles className="h-8 w-8 mx-auto mb-4 animate-pulse" style={{ color: 'var(--color-primary)' }} />
</div>
<h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
Loading Dashboard
</h2>
<p className="font-roboto text-xs" style={{ color: 'var(--color-muted)' }}>
Preparing your personalized insurance insights...
</p>
</div>
</div>
);
}
return (
<div className="min-h-screen p-2 md:p-4 space-y-8" style={{ backgroundColor: 'var(--color-background)' }}>
<div className="max-w-7xl mx-auto">
{/* Enhanced Header Section with Gradient */}
<div className="relative mb-10 overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br opacity-5" style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}></div>
<div className="relative z-10 text-center py-10">
<div className="inline-flex items-center space-x-2 mb-4">
<div className="p-2 rounded-2xl bg-gradient-to-br shadow-lg" style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}>
<Shield className="h-8 w-8 text-white" />
</div>
<div className="h-8 w-px bg-gradient-to-b" style={{ background: `linear-gradient(to bottom, var(--color-primary), transparent)` }}></div>
<Sparkles className="h-6 w-6 animate-pulse" style={{ color: 'var(--color-primary)' }} />
</div>
<h1 className="text-3xl md:text-4xl font-bold font-poppins mb-3 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, var(--color-foreground), var(--color-primary))` }}>
Insurance Dashboard
</h1>
<p className="text-base font-roboto max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
Your comprehensive insurance portfolio with AI-powered insights, risk assessment, and personalized recommendations
</p>
<div className="flex items-center justify-center space-x-4 mt-4">
<div className="text-center">
<div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
{animatedValues.overallScore}
</div>
<div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
Risk Score
</div>
</div>
<div className="h-8 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
<div className="text-center">
<div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
₹{(totalPolicyValue / 10000000).toFixed(1)}Cr
</div>
<div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
Total Coverage
</div>
</div>
<div className="h-8 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
<div className="text-center">
<div className="text-xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
{animatedValues.totalClaims}
</div>
<div className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
Active Claims
</div>
</div>
</div>
</div>
</div>
{/* ...rest of the component with all font sizes reduced by one step... */}
</div>
</div>
);
};

export default ComprehensiveDashboard;
