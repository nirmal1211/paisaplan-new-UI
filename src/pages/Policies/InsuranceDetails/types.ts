export type DashboardSection =
  | "overview"
  | "vehicle"
  | "coverage"
  | "claims"
  | "documents"
  | "challans"
  | "endorsements"
  | "hospitals"
  | "benefits"
  | "dependents"
  | "faqs";

export interface Policy {
  id?: string;
  policyNumber: string;
  type: string;
  policyType?: string;
  category?: string;
  provider: string;
  status: string;
  sumInsured?: string;
  premium?: string;
  validFrom?: string;
  validTo?: string;
  policyTerm?: {
    startDate: string;
    endDate: string;
    renewalDate: string;
  };
  benefits?: string[];
  exclusions?: string[];
  dependents?: Dependent[];
  hospitals?: Hospital[];
  vehicle?: Vehicle;
  documents?: Record<string, string>;
  endorsements?: Endorsement[];
  claims?: Claim[];
}

export interface Vehicle {
  make?: string;
  model?: string;
  year?: string;
  registrationNumber?: string;
  engineNumber?: string;
  chassisNumber?: string;
  fuelType?: string;
  variant?: string;
  engineCapacity?: string;
  seatingCapacity?: number;
  bodyType?: string;
  color?: string;
  transmission?: string;
  mileage?: string;
  maxSpeed?: string;
  registrationDate?: string;
  fitnessValidTill?: string;
  pucValidTill?: string;
  insuranceValidTill?: string;
  roadTaxValidTill?: string;
  rcStatus?: string;
  hypothecatedTo?: string;
  loanAccount?: string;
  previousInsurer?: string;
  claimHistory?: VehicleClaim[];
  accessories?: Accessory[];
  inspection?: Inspection;
  roadworthiness?: Roadworthiness;
}

export interface VehicleClaim {
  date: string;
  claimNumber: string;
  type: string;
  amount: number;
  status: string;
  garage: string;
}

export interface Accessory {
  name: string;
  value: number;
  make: string;
}

export interface Inspection {
  lastInspectionDate: string;
  nextInspectionDue: string;
  inspectionAgency: string;
  inspectorName: string;
  inspectionReport: string;
  photos: string[];
}

export interface Roadworthiness {
  batteryCondition: string;
  tyreCondition: string;
  brakeCondition: string;
  lightsCondition: string;
  suspensionCondition: string;
  engineCondition: string;
  lastServiceDate: string;
  nextServiceDue: string;
  serviceCenter: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  specialties: string[];
  rating: number;
  distance: string;
  cashless: boolean;
  type: string;
  emergency: boolean;
}

export interface Dependent {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  age: number;
  sumInsured: string;
  status: string;
  policyStartDate: string;
  claimHistory: {
    totalClaimed: number;
    pendingClaims: number;
    settledClaims: number;
    claimCount: number;
  };
}

export interface Endorsement {
  number: string;
  type: string;
  status: string;
  requestedDate: string;
  effectiveDate?: string;
  fee: string;
  description?: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  type: string;
  status: string;
  amount: number;
  dateRaised: string;
  dateSettled?: string;
  description: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  available24x7: boolean;
}
