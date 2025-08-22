export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  engineNumber: string;
  chassisNumber: string;
  fuelType: "petrol" | "diesel" | "cng" | "electric" | "hybrid";
  vehicleType: "two-wheeler" | "four-wheeler";
  cubicCapacity: number;
  seatingCapacity?: number;
  vehicleValue: number;
  registrationDate: string;
  previousInsurer?: string;
  ncbPercentage: number;
}

export interface PolicyHolderDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  panNumber: string;
  aadharNumber: string;
  drivingLicenseNumber: string;
  licenseExpiryDate: string;
}

export interface CoverageDetails {
  ownDamage: {
    sumInsured: number;
    deductible: number;
    coverage: string[];
  };
  thirdPartyLiability: {
    bodilyInjury: number;
    propertyDamage: number;
  };
  personalAccident: {
    ownerDriver: number;
    paidDriver?: number;
    passengers?: number;
  };
}

export interface AddOnCoverage {
  id: string;
  name: string;
  description: string;
  premium: number;
  sumInsured?: number;
  isSelected: boolean;
  isAvailable: boolean;
  terms?: string[];
}

export interface PremiumBreakdown {
  basePremium: number;
  addOnPremiums: number;
  discounts: {
    ncb: number;
    loyalty: number;
    multiPolicy: number;
    others: number;
  };
  taxes: {
    gst: number;
    serviceTax: number;
  };
  totalPremium: number;
  payableAmount: number;
}

export interface ClaimsHistory {
  claimNumber: string;
  claimDate: string;
  claimAmount: number;
  claimType: string;
  status: "approved" | "rejected" | "pending";
  description: string;
}

export interface PolicyTerm {
  startDate: string;
  endDate: string;
  duration: number; // in months
  renewalDate: string;
  gracePeriod: number; // in days
}

export interface HealthDetails {
  insuredPersons: Array<{
    name: string;
    age: number;
    relation: string;
  }>;
  sumInsured: number;
  hospitalNetwork: string[];
  preExistingDiseases?: string[];
  policyFeatures?: string[];
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  policyType: "two-wheeler" | "motor" | "health";
  status: "active" | "expired" | "pending" | "cancelled";
  provider: string;

  // Core details
  policyHolder: PolicyHolderDetails;
  vehicle?: VehicleDetails;
  health?: HealthDetails;
  coverage?: CoverageDetails;
  addOns?: AddOnCoverage[];
  premiumBreakdown?: PremiumBreakdown;
  policyTerm?: PolicyTerm;

  // History and metadata
  claimsHistory?: ClaimsHistory[];
  previousPolicies?: string[];
  createdAt: string;
  updatedAt: string;

  // Documents
  documents?: {
    policyDocument?: string;
    rcCopy?: string;
    drivingLicense?: string;
    previousPolicy?: string;
    inspectionReport?: string;
  };
}

export interface PremiumCalculatorParams {
  vehicleValue: number;
  vehicleType: "two-wheeler" | "four-wheeler";
  fuelType: string;
  cubicCapacity: number;
  registrationYear: number;
  city: string;
  previousInsurer?: string;
  ncbPercentage: number;
  selectedAddOns: string[];
  policyDuration: number;
  claimsHistory: ClaimsHistory[];
}

export interface PremiumCalculationResult {
  basePremium: number;
  addOnPremiums: { [key: string]: number };
  discounts: {
    ncb: number;
    loyalty: number;
    multiPolicy: number;
    others: number;
  };
  taxes: {
    gst: number;
    serviceTax: number;
  };
  totalPremium: number;
  breakdown: {
    ownDamage: number;
    thirdParty: number;
    personalAccident: number;
    addOns: number;
  };
}

export interface NavigationState {
  policy: InsurancePolicy;
  returnPath: string;
}

// Type guards for validation
export const isValidPolicyType = (
  type: string,
): type is "two-wheeler" | "motor" | "Health" => {
  return type === "two-wheeler" || type === "motor" || type === "Health";
};

export const isValidPolicyId = (id: string): boolean => {
  return typeof id === "string" && id.length > 0 && /^[a-zA-Z0-9-_]+$/.test(id);
};

export const isCompletePolicy = (
  policy: Partial<InsurancePolicy>,
): policy is InsurancePolicy => {
  return !!(
    policy.id &&
    policy.policyNumber &&
    policy.policyType &&
    policy.policyHolder &&
    policy.coverage &&
    policy.policyTerm
  );
};
