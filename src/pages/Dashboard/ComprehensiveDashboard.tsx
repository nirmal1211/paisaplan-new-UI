import React, { useState, useEffect } from "react";

import {
  Shield,
  Heart,
  Activity,
  Calculator,
  User,
  Weight,
  Ruler,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  RefreshCw,
  Info,
  BarChart3,
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Phone,
  HeartPulse,
} from "lucide-react";
import { Button } from "../../components/UI/button";

// Types for the dashboard data

interface RiskScore {
  type: "life" | "health" | "accident";

  score: number;

  level: "low" | "medium" | "high";

  factors: string[];

  trend: "up" | "down" | "stable";
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

  status: "pending" | "approved" | "rejected" | "processing";

  lastUpdated: string;

  priority: "low" | "medium" | "high";
}

interface SharedPolicy {
  id: string;

  type: string;

  policyNumber: string;

  sharedBy: string;

  relationship: string;

  sharingDate: string;

  coverageDetails: string;

  status: "active" | "expired" | "pending";

  value: number;
}

const ComprehensiveDashboard: React.FC = () => {
  // State management with animations

  const [isLoading, setIsLoading] = useState(true);

  const [animatedValues, setAnimatedValues] = useState({
    overallScore: 0,

    totalClaims: 0,

    approvedClaims: 0,

    pendingClaims: 0,
  });

  const [riskScores] = useState<RiskScore[]>([
    {
      type: "life",

      score: 75,

      level: "medium",

      factors: [
        "Age: 35 years",
        "Non-smoker",
        "Regular exercise",
        "Family history of diabetes",
      ],

      trend: "up",
    },

    {
      type: "health",

      score: 82,

      level: "low",

      factors: [
        "Good BMI",
        "No chronic conditions",
        "Regular checkups",
        "Healthy lifestyle",
      ],

      trend: "stable",
    },

    {
      type: "accident",

      score: 68,

      level: "medium",

      factors: [
        "Urban driving",
        "Clean driving record",
        "Safety features in vehicle",
      ],

      trend: "down",
    },
  ]);

  const [healthInputs, setHealthInputs] = useState<HealthCalculatorInputs>({
    age: 30,

    height: 170,

    weight: 70,

    preExistingConditions: [],
  });

  const [calculatedCoverage, setCalculatedCoverage] = useState<number | null>(
    null
  );

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
      const animateValue = (
        start: number,
        end: number,
        duration: number,
        key: string
      ) => {
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;

          const progress = Math.min(elapsed / duration, 1);

          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          const current = Math.round(start + (end - start) * easeOutQuart);

          setAnimatedValues((prev) => ({ ...prev, [key]: current }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      };

      animateValue(0, 75, 2000, "overallScore");

      animateValue(0, 12, 1500, "totalClaims");

      animateValue(0, 8, 1800, "approvedClaims");

      animateValue(0, 2, 1200, "pendingClaims");
    }
  }, [isLoading]);

  // Mock data with enhanced properties

  const governmentSchemes: GovernmentScheme[] = [
    {
      id: "1",

      name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",

      description:
        "Provides health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization",

      eligibility: [
        "BPL families",
        "SECC database beneficiaries",
        "Rural and urban poor",
      ],

      coverageAmount: "₹5,00,000 per family per year",

      premium: "Free for eligible families",

      applicationLink: "https://pmjay.gov.in",

      popularity: 95,
    },

    {
      id: "2",

      name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",

      description: "Accidental death and disability insurance scheme",

      eligibility: ["Age 18-70 years", "Bank account holder", "Indian citizen"],

      coverageAmount: "₹2,00,000 for accidental death",

      premium: "₹20 per annum",

      applicationLink: "https://jansuraksha.gov.in",

      popularity: 78,
    },

    {
      id: "3",

      name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",

      description: "Life insurance scheme providing life cover",

      eligibility: [
        "Age 18-50 years",
        "Bank account holder",
        "Auto-renewal till age 55",
      ],

      coverageAmount: "₹2,00,000 life cover",

      premium: "₹436 per annum",

      applicationLink: "https://jansuraksha.gov.in",

      popularity: 82,
    },

    {
      id: "4",

      name: "Atal Pension Yojana (APY)",

      description: "Pension scheme for unorganized sector workers",

      eligibility: ["Age 18-40 years", "Indian citizen", "Bank account holder"],

      coverageAmount: "₹1,000 to ₹5,000 monthly pension",

      premium: "Varies based on age and pension amount",

      applicationLink: "https://npscra.nsdl.co.in",

      popularity: 65,
    },

    {
      id: "5",

      name: "Employees State Insurance (ESI)",

      description: "Medical care and cash benefits for employees",

      eligibility: [
        "Employees earning ≤₹25,000/month",
        "Organized sector workers",
      ],

      coverageAmount: "Medical benefits + cash benefits",

      premium: "3.25% of wages (shared between employer and employee)",

      applicationLink: "https://esic.nic.in",

      popularity: 88,
    },
  ];

  const claims: Claim[] = [
    {
      id: "1",

      type: "Health Insurance",

      dateSubmitted: "2024-05-15",

      amount: "₹45,000",

      status: "approved",

      lastUpdated: "2024-05-20",

      priority: "high",
    },

    {
      id: "2",

      type: "Motor Insurance",

      dateSubmitted: "2024-05-10",

      amount: "₹12,000",

      status: "processing",

      lastUpdated: "2024-05-18",

      priority: "medium",
    },

    {
      id: "3",

      type: "Life Insurance",

      dateSubmitted: "2024-04-28",

      amount: "₹8,500",

      status: "pending",

      lastUpdated: "2024-05-01",

      priority: "low",
    },

    {
      id: "4",

      type: "Health Insurance",

      dateSubmitted: "2024-04-15",

      amount: "₹22,000",

      status: "rejected",

      lastUpdated: "2024-04-20",

      priority: "medium",
    },
  ];

  const sharedPolicies: SharedPolicy[] = [
    {
      id: "1",

      type: "Family Health Insurance",

      policyNumber: "FHI-2024-001",

      sharedBy: "Rajesh Kumar",

      relationship: "Father",

      sharingDate: "2024-01-15",

      coverageDetails: "₹10,00,000 family floater",

      status: "active",

      value: 1000000,
    },

    {
      id: "2",

      type: "Group Life Insurance",

      policyNumber: "GLI-2024-002",

      sharedBy: "TechCorp Ltd.",

      relationship: "Employer",

      sharingDate: "2024-02-01",

      coverageDetails: "₹25,00,000 life cover",

      status: "active",

      value: 2500000,
    },

    {
      id: "3",

      type: "Motor Insurance",

      policyNumber: "MI-2024-003",

      sharedBy: "Priya Sharma",

      relationship: "Spouse",

      sharingDate: "2024-03-10",

      coverageDetails: "₹8,50,000 comprehensive",

      status: "active",

      value: 850000,
    },
  ];

  const preExistingConditions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Thyroid",

    "Kidney Disease",
    "Liver Disease",
    "Cancer History",
    "Mental Health",

    "Arthritis",
    "Obesity",
    "Sleep Apnea",
  ];

  // Helper functions

  const calculateBMI = (height: number, weight: number): number => {
    const heightInMeters = height / 100;

    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";

    if (bmi < 25) return "Normal";

    if (bmi < 30) return "Overweight";

    return "Obese";
  };

  const getRiskColor = (level: string): string => {
    switch (level) {
      case "low":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";

      case "medium":
        return "text-amber-700 bg-amber-50 border-amber-200";

      case "high":
        return "text-red-700 bg-red-50 border-red-200";

      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-emerald-500" />;

      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;

      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />;

      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;

      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;

      case "processing":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;

      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;

      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "expired":
        return "bg-gray-50 text-gray-700 border-gray-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "high":
        return "bg-red-500";

      case "medium":
        return "bg-amber-500";

      case "low":
        return "bg-emerald-500";

      default:
        return "bg-gray-500";
    }
  };

  // Calculate recommended coverage with enhanced algorithm

  const calculateRecommendedCoverage = async () => {
    setIsCalculating(true);

    // Simulate calculation delay with progress

    await new Promise((resolve) => setTimeout(resolve, 2500));

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

    const highRiskConditions = [
      "Heart Disease",
      "Cancer History",
      "Kidney Disease",
      "Liver Disease",
    ];

    const mediumRiskConditions = ["Diabetes", "Hypertension", "Thyroid"];

    let conditionMultiplier = 1;

    preExistingConditions.forEach((condition) => {
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
    setHealthInputs((prev) => ({
      ...prev,

      preExistingConditions: prev.preExistingConditions.includes(condition)
        ? prev.preExistingConditions.filter((c) => c !== condition)
        : [...prev.preExistingConditions, condition],
    }));
  };

  // Calculate statistics

  const claimStats = {
    total: claims.length,

    pending: claims.filter((c) => c.status === "pending").length,

    approved: claims.filter((c) => c.status === "approved").length,

    rejected: claims.filter((c) => c.status === "rejected").length,
  };

  const totalPolicyValue = sharedPolicies.reduce(
    (sum, policy) => sum + policy.value,
    0
  );

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <div className="relative">
            <div
              className="w-20 h-20 border-4 border-opacity-20 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <div
                className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent rounded-full animate-spin"
                style={{ borderTopColor: "var(--color-primary)" }}
              ></div>
            </div>

            <Sparkles
              className="h-8 w-8 mx-auto mb-4 animate-pulse"
              style={{ color: "var(--color-primary)" }}
            />
          </div>

          <h2
            className="text-2xl font-bold font-poppins mb-2"
            style={{ color: "var(--color-foreground)" }}
          >
            Loading Dashboard
          </h2>

          <p className="font-roboto" style={{ color: "var(--color-muted)" }}>
            Preparing your personalized insurance insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-3"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        ></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 space-y-8">
        <div className="max-w-7xl mx-auto">
          {/* Ultra-Modern Header Section */}
          <div className="relative mb-12 overflow-hidden">
            {/* Glass Morphism Background */}
            <div
              className="absolute inset-0 backdrop-blur-sm rounded-3xl border border-opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                borderColor: "var(--color-border)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            ></div>

            <div className="relative z-10 p-8 md:p-12">
              {/* Modern Badge */}
              <div className="flex justify-center mb-6">
                <div
                  className="inline-flex items-center space-x-3 px-6 py-3 rounded-full backdrop-blur-md border border-opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary)15, var(--color-accent)10)",
                    borderColor: "var(--color-primary)",
                  }}
                >
                  <div
                    className="p-2 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    <Shield className="h-6 w-6 text-white" />
                  </div>

                  <div
                    className="h-6 w-px bg-gradient-to-b from-transparent via-current to-transparent opacity-30"
                    style={{ color: "var(--color-primary)" }}
                  ></div>

                  <Sparkles
                    className="h-5 w-5 animate-pulse"
                    style={{ color: "var(--color-primary)" }}
                  />

                  <span
                    className="text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    }}
                  >
                    AI Powered Dashboard
                  </span>
                </div>
              </div>

              {/* Enhanced Title Section */}
              <div className="text-center mb-8">
                <h1
                  className="text-lg md:text-2xl font-bold font-poppins mb-1 bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-foreground), var(--color-primary))`,
                  }}
                >
                  Insurance Dashboard
                </h1>

                <p
                  className="text-xs md:text-sm font-roboto max-w-xl mx-auto leading-relaxed opacity-80"
                  style={{ color: "var(--color-muted)" }}
                >
                  Your comprehensive insurance portfolio with AI-powered
                  insights, risk assessment, and personalized recommendations
                </p>
              </div>

              {/* Modern Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Risk Score",
                    value: animatedValues.overallScore,
                    icon: Target,
                    color: "var(--color-primary)",
                    gradient: "from-red-500 to-pink-500",
                  },
                  {
                    label: "Total Coverage",
                    value: `₹${(totalPolicyValue / 10000000).toFixed(1)}Cr`,
                    icon: Shield,
                    color: "var(--color-success)",
                    gradient: "from-emerald-500 to-teal-500",
                  },
                  {
                    label: "Active Claims",
                    value: animatedValues.totalClaims,
                    icon: Activity,
                    color: "var(--color-accent)",
                    gradient: "from-blue-500 to-indigo-500",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-20 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                      borderColor: stat.color,
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Animated Background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: stat.color }}
                    ></div>

                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3">
                        <div
                          className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: stat.color }}
                        >
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      <div
                        className="text-base md:text-lg font-bold font-poppins mb-1"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        {stat.value}
                      </div>

                      <div
                        className="text-xs font-roboto opacity-70"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {stat.label}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 20px ${stat.color}` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ultra-Modern Risk Assessment Section */}
          <div className="relative mb-12">
            {/* Modern Card Container */}
            <div
              className="rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm border border-opacity-20"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Animated Background Elements */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-16 translate-x-16 animate-pulse"
                style={{ backgroundColor: "var(--color-primary)" }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-3"
                style={{ backgroundColor: "var(--color-accent)" }}
              ></div>

              {/* Enhanced Section Header */}
              <div className="relative z-10 flex flex-col md:flex-row items-start justify-between mb-8">
                {/* Left Title with Modern Badge */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="p-3 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2
                        className="text-lg font-bold font-poppins bg-gradient-to-r bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, var(--color-foreground), var(--color-primary))",
                        }}
                      >
                        Risk Assessment
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: "var(--color-success)" }}
                        ></div>
                        <span
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Real-time AI Analysis
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-xs font-roboto opacity-80"
                    style={{ color: "var(--color-muted)" }}
                  >
                    AI-powered analysis of your insurance risk profile across
                    categories
                  </p>
                </div>

                {/* Enhanced Right Score Widget */}
                <div className="mt-4 md:mt-0">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl border-4 border-opacity-20 flex items-center justify-center backdrop-blur-sm transform transition-transform duration-300 hover:scale-105"
                      style={{
                        borderColor: "var(--color-primary)",
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="text-base font-bold font-poppins"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {animatedValues.overallScore}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
                        style={{ backgroundColor: "var(--color-success)" }}
                      >
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-xs font-roboto mt-2 text-center opacity-70"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Overall Score
                  </div>
                </div>
              </div>
              {/* Ultra-Modern Risk Cards Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {riskScores.map((risk) => (
                  <div
                    key={risk.type}
                    className="group relative rounded-2xl p-6 backdrop-blur-sm border border-opacity-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "var(--color-border)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                    }}
                    onMouseEnter={() => setActiveSection(risk.type)}
                    onMouseLeave={() => setActiveSection(null)}
                  >
                    {/* Animated Background Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, var(--color-primary)10, var(--color-primary)05)`,
                      }}
                    ></div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      {/* Enhanced Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-3 rounded-xl transition-all duration-300 shadow-lg ${
                              activeSection === risk.type ? "scale-110" : ""
                            }`}
                            style={{ backgroundColor: "var(--color-primary)" }}
                          >
                            {risk.type === "life" && (
                              <Heart className="h-5 w-5 text-white" />
                            )}
                            {risk.type === "health" && (
                              <Activity className="h-5 w-5 text-white" />
                            )}
                            {risk.type === "accident" && (
                              <Shield className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div>
                            <h3
                              className="text-sm font-bold font-poppins capitalize"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {risk.type} Insurance
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span
                                className={`px-2 py-1 rounded-full text-[10px] font-bold ${getRiskColor(
                                  risk.level
                                )} backdrop-blur-sm`}
                              >
                                {risk.level.toUpperCase()} RISK
                              </span>
                              {getTrendIcon(risk.trend)}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Score Display */}
                        <div className="text-right">
                          <div
                            className="text-xl font-bold font-poppins"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {risk.score}
                          </div>
                          <div
                            className="text-xs font-roboto opacity-60"
                            style={{ color: "var(--color-muted)" }}
                          >
                            /100
                          </div>
                        </div>
                      </div>

                      {/* Risk Factors with Modern Styling */}
                      <div>
                        <h4
                          className="text-xs font-bold font-roboto uppercase tracking-wide mb-3 opacity-80"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Risk Factors
                        </h4>
                        <div className="space-y-2">
                          {risk.factors.map((factor, i) => (
                            <div
                              key={i}
                              className="flex items-center text-xs font-roboto group-hover:translate-x-1 transition-all duration-300"
                              style={{ color: "var(--color-muted)" }}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full mr-3 animate-pulse"
                                style={{
                                  backgroundColor: "var(--color-primary)",
                                }}
                              ></div>
                              {factor}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hover Effect Indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weather-based Health Insurance Suggestion Card */}
          <div className="mb-16">
            <div
              className="rounded-2xl shadow-xl p-4 md:p-6 relative overflow-hidden"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div
                className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-full -translate-y-6 translate-x-6"
                style={{
                  backgroundColor: "var(--color-success)",
                }}
              ></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <HeartPulse
                      className="h-5 w-5"
                      style={{ color: "var(--color-success)" }}
                    />
                    <span
                      className="text-lg font-bold font-poppins"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Health Insurance Tip
                    </span>
                  </div>
                  <p
                    className="text-xs font-roboto mb-2"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Weather update:{" "}
                    <span
                      className="font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      High humidity and monsoon season
                    </span>{" "}
                    increases the risk of waterborne and vector-borne diseases.
                    Protect your family with a comprehensive health insurance
                    plan.
                  </p>
                  <ul
                    className="list-disc pl-4 space-y-1 text-xs font-roboto mb-3"
                    style={{ color: "var(--color-muted)" }}
                  >
                    <li>Cashless hospitalization for seasonal illnesses</li>
                    <li>Coverage for dengue, malaria, and viral fevers</li>
                    <li>24x7 telemedicine and doctor consultations</li>
                    <li>Wellness benefits and preventive checkups</li>
                  </ul>
                  <Button
                    className="mt-1 py-2 px-4 rounded-lg font-bold font-roboto text-xs text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-success)",
                    }}
                    asChild
                  >
                    <a href="/buy-policy/health">
                      <span>Explore Health Insurance Plans</span>
                    </a>
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="/weatherHealth.png"
                    alt="Weather Health Suggestion"
                    className="w-20 h-auto md:w-28 drop-shadow-xl select-none pointer-events-none"
                    style={{
                      filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.10))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Modern Health Coverage Calculator Section */}
          <section className="mb-16">
            <div
              className="rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-sm border border-opacity-20"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Advanced Background Elements */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 -translate-y-20 translate-x-20 animate-pulse"
                style={{ backgroundColor: "var(--color-accent)" }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-3 translate-y-16 -translate-x-16"
                style={{ backgroundColor: "var(--color-secondary)" }}
              ></div>

              <div className="relative z-10">
                {/* Enhanced Section Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div
                    className="p-4 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    <Calculator className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold font-poppins bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--color-foreground), var(--color-accent))",
                      }}
                    >
                      AI Coverage Calculator
                    </h2>
                    <p
                      className="text-sm font-roboto opacity-80"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Get personalized health insurance recommendations powered
                      by machine learning
                    </p>
                  </div>
                </div>

                {/* Ultra-Modern Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Enhanced Input Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className="w-1 h-8 rounded-full"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      ></div>
                      <h3
                        className="text-lg font-bold font-poppins"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Personal Information
                      </h3>
                    </div>

                    {/* Modern Age Input with Enhanced Slider */}
                    <div className="space-y-4">
                      <label
                        className="block text-sm font-semibold font-roboto flex items-center space-x-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        <User
                          className="h-4 w-4"
                          style={{ color: "var(--color-accent)" }}
                        />
                        <span>Age: {healthInputs.age} years</span>
                      </label>

                      <div
                        className="relative p-4 rounded-2xl backdrop-blur-sm border border-opacity-20"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        <input
                          type="range"
                          min="18"
                          max="80"
                          value={healthInputs.age}
                          onChange={(e) =>
                            setHealthInputs((prev) => ({
                              ...prev,
                              age: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-2 rounded-full appearance-none cursor-pointer slider transition-all duration-300"
                          style={{
                            background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${
                              ((healthInputs.age - 18) / (80 - 18)) * 100
                            }%, var(--color-border) ${
                              ((healthInputs.age - 18) / (80 - 18)) * 100
                            }%, var(--color-border) 100%)`,
                          }}
                        />
                        <div
                          className="flex justify-between text-xs font-roboto mt-3 opacity-70"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <span>18</span>
                          <span>80</span>
                        </div>
                      </div>
                    </div>

                    {/* Modern Height and Weight Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label
                          className="block text-sm font-semibold font-roboto flex items-center space-x-2"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          <Ruler
                            className="h-4 w-4"
                            style={{ color: "var(--color-accent)" }}
                          />
                          <span>Height (cm)</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="number"
                            value={healthInputs.height}
                            onChange={(e) =>
                              setHealthInputs((prev) => ({
                                ...prev,
                                height: parseInt(e.target.value) || 150,
                              }))
                            }
                            className="w-full px-4 py-3 border-2 rounded-2xl font-roboto text-sm focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300 backdrop-blur-sm"
                            style={{
                              borderColor: "var(--color-border)",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "var(--color-foreground)",
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            }}
                            min="100"
                            max="250"
                          />
                          <User
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: "var(--color-muted)" }}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label
                          className="block text-sm font-semibold font-roboto flex items-center space-x-2"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          <Weight
                            className="h-4 w-4"
                            style={{ color: "var(--color-accent)" }}
                          />
                          <span>Weight (kg)</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="number"
                            value={healthInputs.weight}
                            onChange={(e) =>
                              setHealthInputs((prev) => ({
                                ...prev,
                                weight: parseInt(e.target.value) || 50,
                              }))
                            }
                            className="w-full px-4 py-3 border-2 rounded-2xl font-roboto text-sm focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300 backdrop-blur-sm"
                            style={{
                              borderColor: "var(--color-border)",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              color: "var(--color-foreground)",
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            }}
                            min="30"
                            max="200"
                          />
                          <Weight
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: "var(--color-muted)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced BMI Display */}
                  <div
                    className="p-3 rounded-xl border-2"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className="text-sm font-bold font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          BMI Analysis
                        </span>
                        <p
                          className="text-xs font-roboto mt-1"
                          style={{ color: "var(--color-muted)" }}
                        >
                          Body Mass Index calculation
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className="text-lg font-bold font-poppins"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {calculateBMI(
                            healthInputs.height,
                            healthInputs.weight
                          ).toFixed(1)}
                        </span>
                        <p
                          className="text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {getBMICategory(
                            calculateBMI(
                              healthInputs.height,
                              healthInputs.weight
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Pre-existing Conditions */}

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-semibold font-roboto"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      Pre-existing Conditions
                    </label>
                    <p
                      className="text-xs font-roboto"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Select all conditions that apply to get accurate coverage
                      recommendations
                    </p>
                    <div
                      className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 rounded-lg"
                      style={{ backgroundColor: "var(--color-background)" }}
                    >
                      {preExistingConditions.map((condition) => (
                        <label
                          key={condition}
                          className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:shadow-md transition-all duration-200"
                          style={{ backgroundColor: "var(--color-card)" }}
                        >
                          <input
                            type="checkbox"
                            checked={healthInputs.preExistingConditions.includes(
                              condition
                            )}
                            onChange={() => toggleCondition(condition)}
                            className="w-4 h-4 rounded focus:ring-4 focus:ring-opacity-20"
                            style={{
                              accentColor: "var(--color-primary)",
                            }}
                          />
                          <span
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {condition}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Calculate Button */}

                  <button
                    onClick={calculateRecommendedCoverage}
                    disabled={isCalculating}
                    className="w-full py-2 px-4 rounded-xl font-bold font-roboto text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 relative overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-primary)",
                    }}
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Analyzing Your Profile...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Calculate AI Recommendations</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Enhanced Results Section */}

                <div className="space-y-6">
                  <h3
                    className="text-base font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    AI Recommendations
                  </h3>

                  {calculatedCoverage ? (
                    <div className="space-y-4">
                      <div
                        className="p-4 rounded-xl border-2 relative overflow-hidden"
                        style={{
                          borderColor: "var(--color-primary)",
                          backgroundColor: "var(--color-secondary)",
                        }}
                      >
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-full -translate-y-8 translate-x-8"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                          }}
                        ></div>
                        <div className="relative z-10 text-center">
                          <Sparkles
                            className="h-6 w-6 mx-auto mb-2 animate-pulse"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <div
                            className="text-2xl font-bold font-poppins mb-1"
                            style={{ color: "var(--color-primary)" }}
                          >
                            ₹{(calculatedCoverage / 100000).toFixed(0)} Lakhs
                          </div>
                          <div
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-muted)" }}
                          >
                            Recommended Health Insurance Coverage
                          </div>
                          <div
                            className="mt-2 inline-flex items-center space-x-1 px-2 py-1 rounded-full"
                            style={{ backgroundColor: "var(--color-card)" }}
                          >
                            <Zap
                              className="h-3 w-3"
                              style={{ color: "var(--color-primary)" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4
                          className="text-sm font-bold font-roboto"
                          style={{ color: "var(--color-foreground)" }}
                        >
                          Personalized Insights
                        </h4>
                        <div className="space-y-2">
                          <div
                            className="flex items-start space-x-2 p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-background)",
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <div>
                              <p
                                className="font-semibold font-roboto"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Family Floater Recommended
                              </p>

                              <p
                                className="text-sm font-roboto"
                                style={{ color: "var(--color-muted)" }}
                              >
                                ₹{(calculatedCoverage / 100000).toFixed(0)}{" "}
                                lakhs coverage for comprehensive protection
                              </p>
                            </div>
                          </div>
                          <div
                            className="flex items-start space-x-2 p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-background)",
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <div>
                              <p
                                className="font-semibold font-roboto"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Critical Illness Add-on
                              </p>

                              <p
                                className="text-sm font-roboto"
                                style={{ color: "var(--color-muted)" }}
                              >
                                Enhanced protection for serious health
                                conditions
                              </p>
                            </div>
                          </div>
                          <div
                            className="flex items-start space-x-2 p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-background)",
                            }}
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <div>
                              <p
                                className="font-semibold font-roboto"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                Wellness Benefits
                              </p>

                              <p
                                className="text-sm font-roboto"
                                style={{ color: "var(--color-muted)" }}
                              >
                                Annual health checkups and preventive care
                                included
                              </p>
                            </div>
                          </div>
                          {healthInputs.preExistingConditions.length > 0 && (
                            <div
                              className="flex items-start space-x-2 p-2 rounded-lg"
                              style={{
                                backgroundColor: "var(--color-background)",
                              }}
                            >
                              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                              <div>
                                <p
                                  className="font-semibold font-roboto"
                                  style={{ color: "var(--color-foreground)" }}
                                >
                                  Pre-existing Condition Coverage
                                </p>

                                <p
                                  className="text-sm font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  Waiting period applies, consider immediate
                                  coverage options
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          className="py-2 px-3 rounded-lg font-bold font-roboto transition-all duration-300 hover:scale-105 text-white text-xs"
                          style={{
                            backgroundColor: "var(--color-primary)",
                          }}
                        >
                          View Plans
                        </button>
                        <button
                          className="py-2 px-3 rounded-lg font-bold font-roboto transition-all duration-300 hover:scale-105 text-xs"
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "var(--color-primary)",
                          }}
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="relative">
                        <Calculator
                          className="h-10 w-10 mx-auto mb-3 animate-pulse"
                          style={{ color: "var(--color-muted)" }}
                        />
                        <div className="absolute -top-1 -right-1">
                          <Sparkles className="h-4 w-4 text-yellow-500 animate-bounce" />
                        </div>
                      </div>
                      <h4
                        className="text-base font-bold font-poppins mb-2"
                        style={{ color: "var(--color-foreground)" }}
                      >
                        Ready for AI Analysis
                      </h4>
                      <p
                        className="font-roboto text-xs"
                        style={{ color: "var(--color-muted)" }}
                      >
                        Complete your profile and get personalized insurance
                        recommendations powered by machine learning
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Claims Dashboard Section */}
          <section className="mb-16 relative">
            {/* oooDashboard image at top right of Claims Analytics section */}
            {/* <img
            src="/oooDashboard.png"
            alt="Dashboard Hero"
            className="hidden md:block absolute top-[-20px] right-20 w-[6rem] h-auto z-30 pointer-events-none select-none"
            style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.15))" }}
          /> */}
            <div
              className="rounded-2xl shadow-xl p-4 md:p-6 relative"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className="p-2 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "var(--color-primary)",
                  }}
                >
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h2
                    className="text-lg font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Claims Analytics
                  </h2>

                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Real-time tracking and insights for all your insurance
                    claims
                  </p>
                </div>
              </div>

              {/* Enhanced Claims Statistics */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div
                  className="text-center p-3 rounded-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--color-primary)",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className="text-xl font-bold font-poppins mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {animatedValues.totalClaims}
                    </div>

                    <div
                      className="text-xs font-roboto uppercase tracking-wide"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Total Claims
                    </div>

                    <div className="mt-1 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                      <span className="text-xs font-roboto text-emerald-600">
                        +2 this month
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="text-center p-3 rounded-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--color-warning)",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-xl font-bold font-poppins mb-1 text-amber-600">
                      {claimStats.pending}
                    </div>

                    <div
                      className="text-xs font-roboto uppercase tracking-wide"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Pending
                    </div>

                    <div className="mt-1 flex items-center justify-center">
                      <Clock className="h-3 w-3 text-amber-500 mr-1" />
                      <span className="text-xs font-roboto text-amber-600">
                        Avg 5 days
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="text-center p-3 rounded-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--color-success)",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-xl font-bold font-poppins mb-1 text-emerald-600">
                      {animatedValues.approvedClaims}
                    </div>

                    <div
                      className="text-xs font-roboto uppercase tracking-wide"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Approved
                    </div>

                    <div className="mt-1 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-emerald-500 mr-1" />
                      <span className="text-xs font-roboto text-emerald-600">
                        95% rate
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="text-center p-3 rounded-xl relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "var(--color-secondary)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--color-danger)",
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="text-xl font-bold font-poppins mb-1 text-red-600">
                      {claimStats.rejected}
                    </div>

                    <div
                      className="text-xs font-roboto uppercase tracking-wide"
                      style={{ color: "var(--color-muted)" }}
                    >
                      Rejected
                    </div>

                    <div className="mt-1 flex items-center justify-center">
                      <XCircle className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-xs font-roboto text-red-600">
                        Review needed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Recent Claims */}

              <div>
                <h3
                  className="text-base md:text-lg font-bold font-poppins mb-4 md:mb-6"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Recent Claims Activity
                </h3>

                <div className="space-y-4">
                  {claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="group border-2 rounded-xl p-3 md:p-4 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <div
                        className="absolute left-0 top-0 w-1 h-full transition-all duration-300 group-hover:w-2"
                        style={{
                          backgroundColor: getPriorityColor(claim.priority),
                        }}
                      ></div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="p-1 md:p-2 rounded-xl"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                            }}
                          >
                            {getStatusIcon(claim.status)}
                          </div>

                          <div>
                            <h4
                              className="text-sm md:text-base font-bold font-poppins"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {claim.type}
                            </h4>

                            <p
                              className="text-xs font-roboto"
                              style={{ color: "var(--color-muted)" }}
                            >
                              Claim ID: {claim.id} •{" "}
                              {claim.priority.toUpperCase()} Priority
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(
                              claim.status
                            )}`}
                          >
                            {claim.status.charAt(0).toUpperCase() +
                              claim.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-roboto text-[var(--color-muted)]">
                            Amount
                          </span>
                          <span className="text-xs font-roboto text-[var(--color-foreground)]">
                            {claim.amount}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-roboto text-[var(--color-muted)]">
                            Submitted
                          </span>
                          <span className="text-xs font-roboto text-[var(--color-foreground)]">
                            {claim.dateSubmitted}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-roboto text-[var(--color-muted)]">
                            Last Updated
                          </span>
                          <span className="text-xs font-roboto text-[var(--color-foreground)]">
                            {claim.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Enhanced Shared Policies Section */}

          <section className="mb-12 relative">
            {/* oooSharePolicy image at top right of Shared Policies card */}
            {/* <img
            src="/oooSharePolicy.png"
            alt="Shared Policy Hero"
            className="hidden md:block absolute top-[-6px] right-10 w-[6rem] h-auto z-30 pointer-events-none select-none"
            style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.15))" }}
          /> */}
            <div
              className="rounded-2xl shadow-xl p-4 md:p-6 relative"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className="p-2 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "var(--color-accent)",
                  }}
                >
                  <Users className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h2
                    className="text-lg font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Shared Policies
                  </h2>

                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Insurance coverage shared by family members and employers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sharedPolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className="group border-2 rounded-xl p-4 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="absolute top-0 right-0 w-16 h-16 opacity-5 rounded-full -translate-y-8 translate-x-8"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                      }}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div
                            className="p-2 rounded-xl"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                            }}
                          >
                            <Shield
                              className="h-4 w-4"
                              style={{ color: "var(--color-primary)" }}
                            />
                          </div>

                          <div>
                            <h3
                              className="text-base font-bold font-poppins"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              {policy.type}
                            </h3>

                            <p
                              className="text-xs font-roboto"
                              style={{ color: "var(--color-muted)" }}
                            >
                              {policy.policyNumber}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                            policy.status
                          )}`}
                        >
                          {policy.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: "var(--color-secondary)" }}
                        >
                          <span
                            className="text-xs font-bold font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            Shared by
                          </span>

                          <p
                            className="text-base font-bold font-poppins"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {policy.sharedBy}
                          </p>

                          <p
                            className="text-xs font-roboto"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {policy.relationship}
                          </p>
                        </div>

                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: "var(--color-secondary)" }}
                        >
                          <span
                            className="text-xs font-bold font-roboto"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            Coverage
                          </span>

                          <p
                            className="text-base font-bold font-poppins"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {policy.coverageDetails}
                          </p>
                        </div>

                        <div
                          className="flex items-center justify-between text-xs font-roboto"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <span>Shared on: {policy.sharingDate}</span>

                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />

                            <span>Active</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="w-full py-2 px-3 rounded-lg font-bold font-roboto transition-all duration-300 hover:scale-105 text-xs"
                        style={{
                          backgroundColor: "var(--color-secondary)",
                          color: "var(--color-primary)",
                        }}
                      >
                        View Policy Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Enhanced Government Schemes Section */}

          <section className="mb-16 relative">
            {/* Officer image absolutely positioned to left bottom of the card */}
            {/* <img
            src="/oooOfficer.png"
            alt="Officer Hero"
            className="hidden md:block absolute left-[-30px] bottom-[-60px] w-24 h-auto z-30 pointer-events-none select-none"
            style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.10))" }}
          /> */}
            <div
              className="rounded-2xl shadow-xl p-4 md:p-6"
              style={{ backgroundColor: "var(--color-card)" }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className="p-2 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "var(--color-warning)",
                  }}
                >
                  <Award className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h2
                    className="text-lg font-bold font-poppins"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Government Schemes
                  </h2>

                  <p
                    className="text-xs font-roboto"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Explore government-backed insurance programs with guaranteed
                    benefits
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {governmentSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="group border-2 rounded-xl p-4 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div
                      className="absolute top-0 right-0 w-12 h-12 opacity-5 rounded-full -translate-y-6 translate-x-6"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                      }}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                            ></div>
                            <span
                              className="text-xs font-bold font-roboto uppercase tracking-wide"
                              style={{ color: "var(--color-primary)" }}
                            >
                              Government Scheme
                            </span>
                          </div>
                          <h3
                            className="text-base font-bold font-poppins mb-2 group-hover:text-opacity-80 transition-all"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            {scheme.name}
                          </h3>
                          <p
                            className="text-xs font-roboto leading-relaxed"
                            style={{ color: "var(--color-muted)" }}
                          >
                            {scheme.description}
                          </p>
                        </div>
                        <div className="ml-2 text-center">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-opacity-20 flex items-center justify-center"
                            style={{ borderColor: "var(--color-primary)" }}
                          >
                            <span
                              className="text-xs font-bold font-poppins"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {scheme.popularity}%
                            </span>
                          </div>
                          <p
                            className="text-xs font-roboto mt-1"
                            style={{ color: "var(--color-muted)" }}
                          >
                            Popularity
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="grid grid-cols-1 gap-2">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                            }}
                          >
                            <h4
                              className="text-xs font-bold font-roboto mb-1"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              Coverage Amount
                            </h4>
                            <p
                              className="text-base font-bold font-poppins"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {scheme.coverageAmount}
                            </p>
                          </div>
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                            }}
                          >
                            <h4
                              className="text-xs font-bold font-roboto mb-1"
                              style={{ color: "var(--color-foreground)" }}
                            >
                              Premium
                            </h4>
                            <p
                              className="text-base font-bold font-poppins"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {scheme.premium}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4
                            className="text-xs font-bold font-roboto mb-1"
                            style={{ color: "var(--color-foreground)" }}
                          >
                            Eligibility Criteria
                          </h4>
                          <ul className="space-y-1">
                            {scheme.eligibility.map(
                              (criteria, criteriaIndex) => (
                                <li
                                  key={criteriaIndex}
                                  className="flex items-center text-xs font-roboto"
                                  style={{ color: "var(--color-muted)" }}
                                >
                                  <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                                  {criteria}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Use shadcn Button for both actions, styled for visual appeal */}
                        <Button
                          asChild
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold font-roboto text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                        >
                          <a
                            href={scheme.applicationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>

                        <Button
                          asChild
                          variant="secondary"
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold font-roboto text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[var(--color-secondary)] text-[var(--color-primary)]"
                        >
                          <a
                            href={"mailto:support@paisaplan.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Contact Us</span>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;
