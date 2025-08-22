export interface PolicyType {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseFields: FormField[];
}

export interface FormField {
  id: string;
  name: string;
  type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "array";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface Dependent {
  id: string;
  name: string;
  age: number;
  relation: string;
  medicalHistory: string[];
}

export interface PolicyFormData {
  // Common fields
  fullName: string;
  email: string;
  mobile: string;

  // Health insurance specific
  age?: number;
  medicalHistory?: string[];
  dependents?: Dependent[];

  // Vehicle insurance specific
  vehicleRegistrationNumber?: string;
  manufacturingYear?: number;
  vehicleType?: string;
  previousClaims?: string;

  // Verification
  mobileVerified: boolean;
  otpCode?: string;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number;
  basePremium: number;
  keyBenefits: string[];
  description: string;
  features: {
    cashlessHospitals?: number;
    claimSettlementRatio?: number;
    networkSize?: string;
    customerSupport?: string;
  };
  addOns: AddOn[];
  termsAndConditions: string[];
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  premium: number;
  isSelected: boolean;
  isRecommended?: boolean;
}

export interface PremiumBreakdown {
  basePremium: number;
  addOnPremiums: number;
  taxes: number;
  discounts: number;
  totalPremium: number;
}

export interface PurchaseContext {
  policyType: string;
  formData: PolicyFormData;
  selectedProviders: string[];
  currentProvider?: Provider;
  premiumBreakdown?: PremiumBreakdown;
  currentStep: number;
  totalSteps: number;
}
