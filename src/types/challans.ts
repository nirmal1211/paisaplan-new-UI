export interface Challan {
  id: string;
  challanId: string;
  dateOfViolation: string;
  violationType: string;
  location: string;
  fineAmount: number;
  paymentStatus: 'paid' | 'pending' | 'overdue' | 'disputed';
  vehicleNumber: string;
  officerName?: string;
  courtDate?: string;
  penaltyPoints?: number;
  description?: string;
  paymentDate?: string;
  receiptNumber?: string;
}

export interface ChallanSummary {
  totalChallans: number;
  totalFineAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueCount: number;
  penaltyPoints: number;
}