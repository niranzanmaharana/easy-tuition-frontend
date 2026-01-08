import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentStatusReport, MonthlyCollectionReport } from '../models/report.model';
import { FeePayment } from '../models/fee-payment.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) { }

  getPaymentStatusReport(month?: string, year?: number): Observable<PaymentStatusReport[]> {
    let params = new HttpParams();
    if (month) params = params.set('month', month);
    if (year) params = params.set('year', year.toString());
    return this.http.get<PaymentStatusReport[]>(`${this.apiUrl}/payment-status`, { params });
  }

  getMonthlyCollectionReport(month?: string, year?: number): Observable<MonthlyCollectionReport> {
    let params = new HttpParams();
    if (month) params = params.set('month', month);
    if (year) params = params.set('year', year.toString());
    return this.http.get<MonthlyCollectionReport>(`${this.apiUrl}/monthly-collection`, { params });
  }

  getStudentHistory(studentId: number): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(`${this.apiUrl}/student-history/${studentId}`);
  }

  getFinancialSummary(startDate: string, endDate: string): Observable<MonthlyCollectionReport> {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    return this.http.get<MonthlyCollectionReport>(`${this.apiUrl}/financial-summary`, { params });
  }
}
