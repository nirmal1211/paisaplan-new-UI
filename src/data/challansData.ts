import { Challan, ChallanSummary } from '../types/challans';

export const mockChallansData: Challan[] = [
  {
    id: '1',
    challanId: 'MH01CH240001',
    dateOfViolation: '2024-05-15',
    violationType: 'Speed Limit Violation',
    location: 'Mumbai-Pune Highway, Km 45',
    fineAmount: 2000,
    paymentStatus: 'pending',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Inspector Sharma',
    courtDate: '2024-06-15',
    penaltyPoints: 4,
    description: 'Vehicle speed recorded at 95 km/h in 80 km/h zone'
  },
  {
    id: '2',
    challanId: 'MH01CH240002',
    dateOfViolation: '2024-04-22',
    violationType: 'No Parking Zone Violation',
    location: 'Bandra West, Near Station',
    fineAmount: 500,
    paymentStatus: 'paid',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Constable Patil',
    penaltyPoints: 1,
    description: 'Vehicle parked in no-parking zone for 2 hours',
    paymentDate: '2024-04-25',
    receiptNumber: 'RCP240425001'
  },
  {
    id: '3',
    challanId: 'MH01CH240003',
    dateOfViolation: '2024-03-10',
    violationType: 'Signal Jump',
    location: 'Andheri East, Signal No. 12',
    fineAmount: 1000,
    paymentStatus: 'paid',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Inspector Kumar',
    penaltyPoints: 3,
    description: 'Vehicle crossed red signal at 14:30 hrs',
    paymentDate: '2024-03-12',
    receiptNumber: 'RCP240312001'
  },
  {
    id: '4',
    challanId: 'MH01CH240004',
    dateOfViolation: '2024-02-28',
    violationType: 'Lane Violation',
    location: 'Western Express Highway',
    fineAmount: 300,
    paymentStatus: 'overdue',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Constable Singh',
    courtDate: '2024-06-01',
    penaltyPoints: 2,
    description: 'Improper lane changing without indicator'
  },
  {
    id: '5',
    challanId: 'MH01CH240005',
    dateOfViolation: '2024-01-18',
    violationType: 'Mobile Phone Usage',
    location: 'Powai, Main Road',
    fineAmount: 1000,
    paymentStatus: 'disputed',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Inspector Joshi',
    courtDate: '2024-07-10',
    penaltyPoints: 2,
    description: 'Driver using mobile phone while driving'
  },
  {
    id: '6',
    challanId: 'MH01CH230006',
    dateOfViolation: '2023-12-05',
    violationType: 'Seat Belt Violation',
    location: 'Goregaon East, Link Road',
    fineAmount: 1000,
    paymentStatus: 'paid',
    vehicleNumber: 'MH01CD5678',
    officerName: 'Constable Yadav',
    penaltyPoints: 1,
    description: 'Driver not wearing seat belt',
    paymentDate: '2023-12-08',
    receiptNumber: 'RCP231208001'
  }
];

export const calculateChallanSummary = (challans: Challan[]): ChallanSummary => {
  const totalChallans = challans.length;
  const totalFineAmount = challans.reduce((sum, challan) => sum + challan.fineAmount, 0);
  const paidChallans = challans.filter(c => c.paymentStatus === 'paid');
  const paidAmount = paidChallans.reduce((sum, challan) => sum + challan.fineAmount, 0);
  const pendingAmount = totalFineAmount - paidAmount;
  const overdueCount = challans.filter(c => c.paymentStatus === 'overdue').length;
  const penaltyPoints = challans.reduce((sum, challan) => sum + (challan.penaltyPoints || 0), 0);

  return {
    totalChallans,
    totalFineAmount,
    paidAmount,
    pendingAmount,
    overdueCount,
    penaltyPoints
  };
};