export interface Policy {
  id: string;
  policyNumber: string;
  provider: string;
  type: 'Health' | 'Motor' | 'Two-wheeler' | 'Life' | 'Travel' | 'Home' | 'Fire' | 'Marine' | 'Cyber' | 'Professional';
  status: 'Active' | 'Pending' | 'Expired';
  validFrom: string;
  validTo: string;
  sumInsured: string;
  premium: string;
  expiryDays: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface InsuranceSlide {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export type RenewalStatus = 'urgent' | 'warning' | 'normal' | 'overdue';
export type UploadStatus = 'pending' | 'uploading' | 'processing' | 'completed' | 'failed';

export interface PaymentOption {
  id: string;
  method: 'card' | 'bank' | 'wallet' | 'emi';
  label: string;
  processingFee?: number;
  discount?: number;
}

export interface ReminderSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
}

export interface RenewalItem {
  id: string;
  policyId: string;
  policyNumber: string;
  provider: string;
  type: string;
  currentPremium: number;
  newPremium: number;
  renewalDate: Date;
  gracePeriod: number;
  status: RenewalStatus;
  paymentOptions: PaymentOption[];
  reminderSettings: ReminderSettings;
}

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: UploadStatus;
  category?: string;
  ocrStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  uploadTime: Date;
  errors?: string[];
}

export interface UploadSession {
  id: string;
  files: UploadFile[];
  progress: number;
  status: UploadStatus;
  startTime: Date;
  completionTime?: Date;
  errors?: UploadError[];
}

export interface UploadError {
  fileId: string;
  message: string;
  code: string;
}