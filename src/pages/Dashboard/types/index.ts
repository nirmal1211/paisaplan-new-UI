// Dashboard domain types
export interface RiskScore {
  type: "life" | "health" | "accident";
  score: number;
  level: "low" | "medium" | "high";
  factors: string[];
  trend: "up" | "down" | "stable";
}

export interface HealthCalculatorInputs {
  age: number;
  height: number; // in cm
  weight: number; // in kg
  preExistingConditions: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  coverageAmount: string;
  premium: string;
  applicationLink: string;
  popularity: number; // percent
}

export interface Claim {
  id: string;
  type: string;
  dateSubmitted: string;
  amount: string;
  status: "pending" | "approved" | "rejected" | "processing";
  lastUpdated: string;
  priority: "low" | "medium" | "high";
}

export interface SharedPolicy {
  id: string;
  type: string;
  policyNumber: string;
  sharedBy: string;
  relationship: string;
  sharingDate: string;
  coverageDetails: string;
  status: "active" | "expired" | "pending";
  value: number; // numeric value for aggregation
}
