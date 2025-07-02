export interface Challan {
  id: string;
  challanNumber: string;
  date: string;
  time: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: { lat: number; lng: number };
  };
  violationType: string;
  violationCode: string;
  description: string;
  penaltyAmount: number;
  fineAmount: number;
  courtFee?: number;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial' | 'disputed';
  paymentDate?: string;
  paymentMethod?: 'online' | 'cash' | 'cheque' | 'dd';
  receiptNumber?: string;
  dueDate: string;
  issuingAuthority: string;
  officerName?: string;
  vehicleNumber: string;
  driverLicense?: string;
  severity: 'minor' | 'major' | 'serious';
  points?: number; // penalty points on license
  courtDate?: string;
  documents: ChallanDocument[];
  appealStatus?: 'none' | 'filed' | 'under_review' | 'accepted' | 'rejected';
  impactOnInsurance: {
    premiumIncrease: number;
    riskRating: 'low' | 'medium' | 'high';
  };
}

export interface ChallanDocument {
  id: string;
  type: 'challan_copy' | 'payment_receipt' | 'court_notice' | 'appeal_document';
  name: string;
  url: string;
  uploadDate: string;
  size: string;
}

export interface ChallanSummary {
  totalChallans: number;
  paidChallans: number;
  unpaidChallans: number;
  totalPendingAmount: number;
  totalPaidAmount: number;
  recentViolations: number; // last 6 months
  premiumImpact: number;
}

export interface ViolationType {
  code: string;
  name: string;
  category: 'traffic' | 'parking' | 'documentation' | 'safety' | 'environmental';
  baseFine: number;
  description: string;
  severity: 'minor' | 'major' | 'serious';
  points: number;
}

export const VIOLATION_TYPES: ViolationType[] = [
  {
    code: 'SPD001',
    name: 'Over Speeding',
    category: 'traffic',
    baseFine: 1000,
    description: 'Exceeding prescribed speed limit',
    severity: 'major',
    points: 4
  },
  {
    code: 'SIG001',
    name: 'Signal Jumping',
    category: 'traffic',
    baseFine: 1000,
    description: 'Crossing red light signal',
    severity: 'major',
    points: 4
  },
  {
    code: 'PKG001',
    name: 'Wrong Parking',
    category: 'parking',
    baseFine: 500,
    description: 'Parking in no-parking zone',
    severity: 'minor',
    points: 1
  },
  {
    code: 'DOC001',
    name: 'No Valid License',
    category: 'documentation',
    baseFine: 5000,
    description: 'Driving without valid license',
    severity: 'serious',
    points: 8
  },
  {
    code: 'DOC002',
    name: 'No Insurance',
    category: 'documentation',
    baseFine: 2000,
    description: 'Driving without valid insurance',
    severity: 'serious',
    points: 6
  },
  {
    code: 'SAF001',
    name: 'No Helmet',
    category: 'safety',
    baseFine: 1000,
    description: 'Riding without helmet (two-wheeler)',
    severity: 'major',
    points: 3
  },
  {
    code: 'SAF002',
    name: 'No Seat Belt',
    category: 'safety',
    baseFine: 1000,
    description: 'Driving without seat belt',
    severity: 'major',
    points: 3
  },
  {
    code: 'TRF001',
    name: 'Wrong Lane',
    category: 'traffic',
    baseFine: 500,
    description: 'Driving in wrong lane',
    severity: 'minor',
    points: 2
  },
  {
    code: 'TRF002',
    name: 'Overtaking Violation',
    category: 'traffic',
    baseFine: 1000,
    description: 'Dangerous overtaking',
    severity: 'major',
    points: 4
  },
  {
    code: 'ENV001',
    name: 'Pollution Violation',
    category: 'environmental',
    baseFine: 10000,
    description: 'Vehicle exceeding pollution norms',
    severity: 'serious',
    points: 5
  }
];