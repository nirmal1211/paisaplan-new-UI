export interface VehiclePhoto {
  id: string;
  url: string;
  type: 'front' | 'back' | 'left' | 'right' | 'interior' | 'damage' | 'other';
  caption: string;
  uploadDate: string;
}

export interface SafetyFeature {
  id: string;
  name: string;
  category: 'active' | 'passive' | 'structural';
  premiumImpact: number; // percentage impact on premium
  description: string;
}

export interface VehicleModification {
  id: string;
  type: string;
  description: string;
  value: number;
  approvalRequired: boolean;
  approvalStatus: 'approved' | 'pending' | 'rejected' | 'not_required';
  installationDate: string;
}

export interface AuthorizedDriver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  dateOfBirth: string;
  relationship: string;
  riskRating: 'low' | 'medium' | 'high';
  premiumImpact: number;
  drivingHistory: DrivingHistoryRecord[];
  restrictions: string[];
  trainingCertificates: TrainingCertificate[];
}

export interface DrivingHistoryRecord {
  id: string;
  type: 'violation' | 'accident' | 'claim';
  date: string;
  description: string;
  severity: 'minor' | 'major' | 'severe';
  penaltyPoints?: number;
  fineAmount?: number;
  impactOnPremium: number;
}

export interface TrainingCertificate {
  id: string;
  name: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  discountPercentage: number;
}

export interface ClaimDetail {
  id: string;
  claimNumber: string;
  incidentDate: string;
  incidentLocation: {
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  damageType: string[];
  severity: 'minor' | 'moderate' | 'major' | 'total_loss';
  requestedAmount: number;
  settledAmount?: number;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'settled' | 'closed';
  documents: ClaimDocument[];
  photos: VehiclePhoto[];
  adjusterDetails?: {
    name: string;
    phone: string;
    email: string;
  };
  repairShop?: {
    name: string;
    address: string;
    phone: string;
  };
  futureImpact: {
    premiumIncrease: number;
    ncbLoss: number;
  };
}

export interface ClaimDocument {
  id: string;
  name: string;
  type: 'estimate' | 'invoice' | 'photo' | 'police_report' | 'medical' | 'other';
  url: string;
  uploadDate: string;
  size: string;
}

export interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'certificate' | 'receipt' | 'inspection' | 'correspondence' | 'other';
  version: string;
  url: string;
  uploadDate: string;
  size: string;
  isLatest: boolean;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: 'credit_card' | 'debit_card' | 'net_banking' | 'upi' | 'cash' | 'cheque';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  receiptNumber: string;
  description: string;
}

export interface Endorsement {
  id: string;
  type: string;
  description: string;
  effectiveDate: string;
  premium: number;
  status: 'active' | 'expired' | 'cancelled';
  documents: string[];
}

export interface CoverageLimit {
  type: string;
  limit: number;
  deductible: number;
  explanation: string;
  exclusions: string[];
  conditions: string[];
}

export interface TerritoryRestriction {
  type: 'geographical' | 'usage' | 'time';
  description: string;
  details: string[];
}

export interface EmergencyContact {
  type: 'claims' | 'roadside' | 'customer_service' | 'agent';
  name: string;
  phone: string;
  email?: string;
  available24x7: boolean;
}

export interface VehicleDashboardData {
  policy: any; // Using existing InsurancePolicy type
  vehiclePhotos: VehiclePhoto[];
  safetyFeatures: SafetyFeature[];
  modifications: VehicleModification[];
  authorizedDrivers: AuthorizedDriver[];
  claimsHistory: ClaimDetail[];
  documents: PolicyDocument[];
  paymentHistory: PaymentRecord[];
  endorsements: Endorsement[];
  coverageLimits: CoverageLimit[];
  territoryRestrictions: TerritoryRestriction[];
  emergencyContacts: EmergencyContact[];
}