export interface FeePayment {
  id?: number;
  studentId: number;
  studentName?: string;
  amountPaid: number;
  paymentDate: string;
  paymentMonth?: string;
  paymentYear?: number;
  paymentMethod?: string;
  receiptNumber?: string;
  notes?: string;
  createdDate?: string;
}
