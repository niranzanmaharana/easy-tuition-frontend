export interface PaymentStatusReport {
  studentId: number;
  studentName: string;
  classGrade?: string;
  contactNumber?: string;
  paymentStatus: string;
  amountPaid: number;
  paymentMonth?: string;
}

export interface MonthlyCollectionReport {
  paymentMonth?: string;
  paymentYear?: number;
  totalCollection: number;
  paidCount: number;
  pendingCount: number;
  cashAmount?: number;
  onlineAmount?: number;
  bankTransferAmount?: number;
}
