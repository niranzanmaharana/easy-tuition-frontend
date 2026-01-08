import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeePayment } from '../models/fee-payment.model';

@Injectable({
  providedIn: 'root'
})
export class FeePaymentService {
  private apiUrl = 'http://localhost:8080/api/fees';

  constructor(private http: HttpClient) { }

  recordPayment(payment: FeePayment): Observable<FeePayment> {
    return this.http.post<FeePayment>(this.apiUrl, payment);
  }

  getAllPayments(): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(this.apiUrl);
  }

  getPaymentsByStudentId(studentId: number): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getPaymentById(id: number): Observable<FeePayment> {
    return this.http.get<FeePayment>(`${this.apiUrl}/${id}`);
  }

  updatePayment(id: number, payment: FeePayment): Observable<FeePayment> {
    return this.http.put<FeePayment>(`${this.apiUrl}/${id}`, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
