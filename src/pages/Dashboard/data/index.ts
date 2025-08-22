import { GovernmentScheme, Claim, SharedPolicy, RiskScore } from "../types";

export const initialRiskScores: RiskScore[] = [
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
];

export const governmentSchemes: GovernmentScheme[] = [
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

export const claims: Claim[] = [
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

export const sharedPolicies: SharedPolicy[] = [
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

export const preExistingConditions = [
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
