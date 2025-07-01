import { Policy } from '../types/policy';

export interface PolicyDetails extends Policy {
  description: string;
  benefits: string[];
  exclusions: string[];
  documents: PolicyDocument[];
  dependents: Dependent[];
  claims: Claim[];
  hospitals: Hospital[];
  endorsements: Endorsement[];
  paymentHistory: PaymentRecord[];
  agent: Agent;
  lastUpdated: string;
}

export interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'certificate' | 'receipt' | 'claim' | 'endorsement';
  url: string;
  uploadDate: string;
  size: string;
}

export interface Dependent {
  id: string;
  name: string;
  relation: string;
  age: number;
  avatar: string;
  coverage: string;
  status: 'active' | 'inactive';
}

export interface Claim {
  id: string;
  claimNumber: string;
  type: string;
  amount: string;
  status: 'approved' | 'pending' | 'rejected' | 'processing';
  dateSubmitted: string;
  dateProcessed?: string;
  description: string;
  documents: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  specialties: string[];
  rating: number;
  distance: string;
  cashless: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Endorsement {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  effectiveDate?: string;
  premium: string;
  documents: string[];
}

export interface PaymentRecord {
  id: string;
  amount: string;
  date: string;
  method: string;
  status: 'paid' | 'pending' | 'failed';
  receiptNumber: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  experience: string;
}

export const mockPolicyDetails: PolicyDetails = {
  id: '1',
  policyNumber: 'HLTH12345',
  provider: 'Star Health Insurance',
  type: 'Health',
  status: 'Active',
  validFrom: '2024-01-15',
  validTo: '2025-01-14',
  sumInsured: '₹10,00,000',
  premium: '₹18,500',
  expiryDays: 234,
  description: 'Comprehensive health insurance plan covering hospitalization, pre and post hospitalization expenses, day care procedures, and annual health checkups.',
  benefits: [
    'Cashless treatment at 9000+ network hospitals',
    'Pre and post hospitalization expenses (30-60 days)',
    'Day care procedures covered',
    'Annual health checkup',
    'Ambulance charges up to ₹2,000',
    'Room rent up to 1% of sum insured per day',
    'ICU charges covered',
    'Organ donor expenses',
    'Emergency overseas treatment',
    'Mental health treatment'
  ],
  exclusions: [
    'Pre-existing diseases (first 2 years)',
    'Cosmetic surgery',
    'Dental treatment (unless due to accident)',
    'Pregnancy expenses (first 2 years)',
    'War and nuclear risks',
    'Self-inflicted injuries',
    'Drug and alcohol abuse',
    'Experimental treatments'
  ],
  documents: [
    {
      id: '1',
      name: 'Policy Certificate',
      type: 'policy',
      url: '/documents/policy-certificate.pdf',
      uploadDate: '2024-01-15',
      size: '2.4 MB'
    },
    {
      id: '2',
      name: 'Premium Receipt',
      type: 'receipt',
      url: '/documents/premium-receipt.pdf',
      uploadDate: '2024-01-15',
      size: '1.2 MB'
    },
    {
      id: '3',
      name: 'Health Card',
      type: 'certificate',
      url: '/documents/health-card.pdf',
      uploadDate: '2024-01-15',
      size: '0.8 MB'
    }
  ],
  dependents: [
    {
      id: '1',
      name: 'Sarah Johnson',
      relation: 'Spouse',
      age: 32,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      coverage: '₹10,00,000',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      relation: 'Son',
      age: 8,
      avatar: 'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      coverage: '₹10,00,000',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Johnson',
      relation: 'Daughter',
      age: 5,
      avatar: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      coverage: '₹10,00,000',
      status: 'active'
    }
  ],
  claims: [
    {
      id: '1',
      claimNumber: 'CLM2024001',
      type: 'Hospitalization',
      amount: '₹45,000',
      status: 'approved',
      dateSubmitted: '2024-03-15',
      dateProcessed: '2024-03-20',
      description: 'Emergency appendectomy at Apollo Hospital',
      documents: ['medical-report.pdf', 'discharge-summary.pdf', 'bills.pdf']
    },
    {
      id: '2',
      claimNumber: 'CLM2024002',
      type: 'Day Care',
      amount: '₹12,000',
      status: 'processing',
      dateSubmitted: '2024-05-10',
      description: 'Cataract surgery for dependent',
      documents: ['pre-auth.pdf', 'medical-report.pdf']
    },
    {
      id: '3',
      claimNumber: 'CLM2024003',
      type: 'Health Checkup',
      amount: '₹3,500',
      status: 'pending',
      dateSubmitted: '2024-05-18',
      description: 'Annual health checkup package',
      documents: ['health-report.pdf']
    }
  ],
  hospitals: [
    {
      id: '1',
      name: 'Apollo Hospital',
      address: '123 Health Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91-22-1234-5678',
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Emergency'],
      rating: 4.8,
      distance: '2.5 km',
      cashless: true,
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: '2',
      name: 'Fortis Hospital',
      address: '456 Medical Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      phone: '+91-22-2345-6789',
      specialties: ['Orthopedics', 'Gastroenterology', 'Pediatrics'],
      rating: 4.6,
      distance: '3.8 km',
      cashless: true,
      coordinates: { lat: 19.0896, lng: 72.8656 }
    },
    {
      id: '3',
      name: 'Lilavati Hospital',
      address: '789 Care Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400003',
      phone: '+91-22-3456-7890',
      specialties: ['Emergency', 'ICU', 'Surgery', 'Radiology'],
      rating: 4.7,
      distance: '5.2 km',
      cashless: true,
      coordinates: { lat: 19.0544, lng: 72.8342 }
    }
  ],
  endorsements: [
    {
      id: '1',
      type: 'Add Dependent',
      description: 'Adding newborn child to the policy',
      status: 'approved',
      requestDate: '2024-02-10',
      effectiveDate: '2024-02-15',
      premium: '₹2,500',
      documents: ['birth-certificate.pdf', 'application-form.pdf']
    },
    {
      id: '2',
      type: 'Sum Insured Increase',
      description: 'Increase sum insured from ₹5,00,000 to ₹10,00,000',
      status: 'pending',
      requestDate: '2024-05-15',
      premium: '₹8,500',
      documents: ['application-form.pdf', 'income-proof.pdf']
    }
  ],
  paymentHistory: [
    {
      id: '1',
      amount: '₹18,500',
      date: '2024-01-15',
      method: 'Credit Card',
      status: 'paid',
      receiptNumber: 'RCP2024001'
    },
    {
      id: '2',
      amount: '₹2,500',
      date: '2024-02-15',
      method: 'Net Banking',
      status: 'paid',
      receiptNumber: 'RCP2024002'
    }
  ],
  agent: {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@starhealth.com',
    phone: '+91-98765-43210',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.9,
    experience: '8 years'
  },
  lastUpdated: '2024-05-20T10:30:00Z'
};

export const mockFAQsDetailed = [
  {
    id: '1',
    question: 'How do I file a claim online?',
    answer: 'You can file a claim online by logging into your account, navigating to the Claims section, and clicking on "File New Claim". Upload the required documents and submit the form. You will receive a claim number for tracking.',
    category: 'Claims'
  },
  {
    id: '2',
    question: 'What is the cashless treatment process?',
    answer: 'For cashless treatment, visit any network hospital with your health card. The hospital will verify your policy and send a pre-authorization request. Once approved, you can receive treatment without paying upfront.',
    category: 'Treatment'
  },
  {
    id: '3',
    question: 'How can I add a dependent to my policy?',
    answer: 'To add a dependent, submit an endorsement request through your online account or contact your agent. Provide the required documents like birth certificate, marriage certificate, etc. Additional premium may apply.',
    category: 'Policy Changes'
  },
  {
    id: '4',
    question: 'What is covered under pre and post hospitalization?',
    answer: 'Pre-hospitalization expenses (30 days before admission) and post-hospitalization expenses (60 days after discharge) related to the same illness are covered. This includes diagnostic tests, medicines, and follow-up consultations.',
    category: 'Coverage'
  },
  {
    id: '5',
    question: 'How do I renew my policy?',
    answer: 'You can renew your policy online through your account, by calling customer service, or through your agent. Renewal should be done before the expiry date to avoid loss of benefits like no-claim bonus.',
    category: 'Renewal'
  }
];