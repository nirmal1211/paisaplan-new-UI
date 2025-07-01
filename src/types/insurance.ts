// Core Insurance Policy Types
export interface InsurancePolicy {
  // Core Policy Details
  policyId: string;
  insuranceType: 'two-wheeler' | 'motor';
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  policyNumber: string;
  
  // Vehicle Information
  vehicle: {
    registrationNumber: string;
    make: string;
    model: string;
    year: number;
    engineNumber: string;
    chassisNumber: string;
    cubic_capacity: number;
    seatingCapacity: number;
    fuelType: string;
    variant: string;
    color: string;
  };
  
  // Coverage Details
  coverage: {
    startDate: Date;
    endDate: Date;
    type: 'comprehensive' | 'third-party' | 'zero-dep';
    sumInsured: number;
    addOns: Array<{
      name: string;
      description: string;
      cost: number;
      isSelected: boolean;
    }>;
    exclusions: string[];
    waitingPeriod: number;
  };
  
  // Premium Details
  premium: {
    baseAmount: number;
    addOnCost: number;
    taxes: number;
    discounts: {
      noClaimBonus: number;
      onlineDiscount: number;
      otherDiscounts: Array<{type: string, amount: number}>;
    };
    totalAmount: number;
    paymentSchedule: Array<{
      dueDate: Date;
      amount: number;
      status: 'paid' | 'pending' | 'overdue';
    }>;
  };
  
  // Claims Information
  claims: Array<{
    claimId: string;
    dateSubmitted: Date;
    type: string;
    amount: number;
    status: 'approved' | 'pending' | 'rejected';
    documents: Array<{type: string, url: string}>;
  }>;
  
  // Documents
  documents: Array<{
    type: 'policy' | 'rc' | 'invoice' | 'inspection';
    url: string;
    uploadDate: Date;
    isVerified: boolean;
  }>;
  
  // Customer Details
  customer: {
    id: string;
    name: string;
    contact: {
      email: string;
      phone: string;
      address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
      };
    };
    nominees: Array<{
      name: string;
      relationship: string;
      share: number;
    }>;
  };
}

// Validation and calculation types
export interface ValidationRule {
  field: string;
  rule: 'required' | 'email' | 'phone' | 'pincode' | 'custom';
  message: string;
  customValidator?: (value: any) => boolean;
}

export interface PremiumCalculationParams {
  vehicleValue: number;
  vehicleAge: number;
  driverAge: number;
  location: string;
  previousClaims: number;
  coverageType: 'comprehensive' | 'third-party' | 'zero-dep';
  addOns: string[];
  voluntaryDeductible: number;
}

export interface CalculationResult {
  baseAmount: number;
  addOnCost: number;
  taxes: number;
  discounts: number;
  totalAmount: number;
  breakdown: Array<{
    component: string;
    amount: number;
    percentage?: number;
  }>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PolicyApiEndpoints {
  fetch: string;
  create: string;
  update: string;
  delete: string;
  calculate: string;
  validate: string;
}

// Cache and performance types
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'lfu';
}

export interface PerformanceMetrics {
  loadTime: number;
  cacheHitRate: number;
  apiResponseTime: number;
  errorRate: number;
}

// Analytics types
export interface AnalyticsEvent {
  eventType: 'policy_view' | 'premium_calculation' | 'claim_submission' | 'document_download';
  policyId?: string;
  userId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}