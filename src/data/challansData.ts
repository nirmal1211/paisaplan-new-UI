import { Challan, ChallanSummary } from '../types/challans';

export const mockChallansData: Challan[] = [
  {
    id: '1',
    challanNumber: 'MH01CH240001',
    date: '2024-05-15',
    time: '14:30',
    location: {
      address: 'Bandra-Worli Sea Link, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0330, lng: 72.8147 }
    },
    violationType: 'Over Speeding',
    violationCode: 'SPD001',
    description: 'Vehicle speed recorded at 95 km/h in 80 km/h zone',
    penaltyAmount: 1000,
    fineAmount: 1000,
    courtFee: 0,
    totalAmount: 1000,
    paymentStatus: 'unpaid',
    dueDate: '2024-06-14',
    issuingAuthority: 'Mumbai Traffic Police',
    officerName: 'Constable Sharma',
    vehicleNumber: 'MH01CD5678',
    driverLicense: 'MH01-20230001234',
    severity: 'major',
    points: 4,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Speed Violation Challan',
        url: '/documents/challan-001.pdf',
        uploadDate: '2024-05-15',
        size: '1.2 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 500,
      riskRating: 'medium'
    }
  },
  {
    id: '2',
    challanNumber: 'MH01CH240002',
    date: '2024-04-22',
    time: '09:15',
    location: {
      address: 'Linking Road Signal, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0544, lng: 72.8342 }
    },
    violationType: 'Signal Jumping',
    violationCode: 'SIG001',
    description: 'Vehicle crossed red light signal',
    penaltyAmount: 1000,
    fineAmount: 1000,
    courtFee: 0,
    totalAmount: 1000,
    paymentStatus: 'paid',
    paymentDate: '2024-04-25',
    paymentMethod: 'online',
    receiptNumber: 'RCP240002',
    dueDate: '2024-05-22',
    issuingAuthority: 'Mumbai Traffic Police',
    officerName: 'Sub-Inspector Patel',
    vehicleNumber: 'MH01CD5678',
    driverLicense: 'MH01-20230001234',
    severity: 'major',
    points: 4,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Signal Violation Challan',
        url: '/documents/challan-002.pdf',
        uploadDate: '2024-04-22',
        size: '1.1 MB'
      },
      {
        id: '2',
        type: 'payment_receipt',
        name: 'Payment Receipt',
        url: '/documents/receipt-002.pdf',
        uploadDate: '2024-04-25',
        size: '0.8 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 500,
      riskRating: 'medium'
    }
  },
  {
    id: '3',
    challanNumber: 'MH01CH240003',
    date: '2024-03-10',
    time: '18:45',
    location: {
      address: 'Phoenix Mall Parking, Lower Parel',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    violationType: 'Wrong Parking',
    violationCode: 'PKG001',
    description: 'Vehicle parked in no-parking zone',
    penaltyAmount: 500,
    fineAmount: 500,
    courtFee: 0,
    totalAmount: 500,
    paymentStatus: 'paid',
    paymentDate: '2024-03-12',
    paymentMethod: 'online',
    receiptNumber: 'RCP240003',
    dueDate: '2024-04-09',
    issuingAuthority: 'Mumbai Traffic Police',
    vehicleNumber: 'MH01CD5678',
    severity: 'minor',
    points: 1,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Parking Violation Challan',
        url: '/documents/challan-003.pdf',
        uploadDate: '2024-03-10',
        size: '0.9 MB'
      },
      {
        id: '2',
        type: 'payment_receipt',
        name: 'Payment Receipt',
        url: '/documents/receipt-003.pdf',
        uploadDate: '2024-03-12',
        size: '0.7 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 100,
      riskRating: 'low'
    }
  },
  {
    id: '4',
    challanNumber: 'MH01CH240004',
    date: '2024-02-18',
    time: '11:20',
    location: {
      address: 'Western Express Highway, Andheri',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    violationType: 'No Seat Belt',
    violationCode: 'SAF002',
    description: 'Driver not wearing seat belt',
    penaltyAmount: 1000,
    fineAmount: 1000,
    courtFee: 0,
    totalAmount: 1000,
    paymentStatus: 'paid',
    paymentDate: '2024-02-20',
    paymentMethod: 'online',
    receiptNumber: 'RCP240004',
    dueDate: '2024-03-20',
    issuingAuthority: 'Mumbai Traffic Police',
    vehicleNumber: 'MH01CD5678',
    driverLicense: 'MH01-20230001234',
    severity: 'major',
    points: 3,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Safety Violation Challan',
        url: '/documents/challan-004.pdf',
        uploadDate: '2024-02-18',
        size: '1.0 MB'
      },
      {
        id: '2',
        type: 'payment_receipt',
        name: 'Payment Receipt',
        url: '/documents/receipt-004.pdf',
        uploadDate: '2024-02-20',
        size: '0.8 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 300,
      riskRating: 'medium'
    }
  },
  {
    id: '5',
    challanNumber: 'MH01CH230005',
    date: '2023-12-05',
    time: '16:30',
    location: {
      address: 'Mahim Causeway, Mumbai',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    violationType: 'Wrong Lane',
    violationCode: 'TRF001',
    description: 'Vehicle driving in wrong lane',
    penaltyAmount: 500,
    fineAmount: 500,
    courtFee: 0,
    totalAmount: 500,
    paymentStatus: 'paid',
    paymentDate: '2023-12-08',
    paymentMethod: 'online',
    receiptNumber: 'RCP230005',
    dueDate: '2024-01-04',
    issuingAuthority: 'Mumbai Traffic Police',
    vehicleNumber: 'MH01CD5678',
    driverLicense: 'MH01-20230001234',
    severity: 'minor',
    points: 2,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Lane Violation Challan',
        url: '/documents/challan-005.pdf',
        uploadDate: '2023-12-05',
        size: '1.0 MB'
      },
      {
        id: '2',
        type: 'payment_receipt',
        name: 'Payment Receipt',
        url: '/documents/receipt-005.pdf',
        uploadDate: '2023-12-08',
        size: '0.8 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 200,
      riskRating: 'low'
    }
  },
  {
    id: '6',
    challanNumber: 'MH01CH240006',
    date: '2024-05-20',
    time: '20:15',
    location: {
      address: 'Carter Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    violationType: 'Wrong Parking',
    violationCode: 'PKG001',
    description: 'Vehicle parked blocking traffic',
    penaltyAmount: 500,
    fineAmount: 500,
    courtFee: 0,
    totalAmount: 500,
    paymentStatus: 'unpaid',
    dueDate: '2024-06-19',
    issuingAuthority: 'Mumbai Traffic Police',
    vehicleNumber: 'MH01CD5678',
    severity: 'minor',
    points: 1,
    documents: [
      {
        id: '1',
        type: 'challan_copy',
        name: 'Parking Violation Challan',
        url: '/documents/challan-006.pdf',
        uploadDate: '2024-05-20',
        size: '0.9 MB'
      }
    ],
    impactOnInsurance: {
      premiumIncrease: 100,
      riskRating: 'low'
    }
  }
];

export const calculateChallanSummary = (challans: Challan[]): ChallanSummary => {
  const totalChallans = challans.length;
  const paidChallans = challans.filter(c => c.paymentStatus === 'paid').length;
  const unpaidChallans = challans.filter(c => c.paymentStatus === 'unpaid').length;
  
  const totalPendingAmount = challans
    .filter(c => c.paymentStatus === 'unpaid')
    .reduce((sum, c) => sum + c.totalAmount, 0);
  
  const totalPaidAmount = challans
    .filter(c => c.paymentStatus === 'paid')
    .reduce((sum, c) => sum + c.totalAmount, 0);
  
  // Recent violations in last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentViolations = challans.filter(c => new Date(c.date) > sixMonthsAgo).length;
  
  const premiumImpact = challans.reduce((sum, c) => sum + c.impactOnInsurance.premiumIncrease, 0);
  
  return {
    totalChallans,
    paidChallans,
    unpaidChallans,
    totalPendingAmount,
    totalPaidAmount,
    recentViolations,
    premiumImpact
  };
};