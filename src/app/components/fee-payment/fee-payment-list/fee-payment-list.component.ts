import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeePaymentService } from '../../../services/fee-payment.service';
import { FeePayment } from '../../../models/fee-payment.model';

@Component({
  selector: 'app-fee-payment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fee-payment-list.component.html',
  styleUrl: './fee-payment-list.component.css'
})
export class FeePaymentListComponent implements OnInit {
  payments: FeePayment[] = [];
  loading = false;

  constructor(private feePaymentService: FeePaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.feePaymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.loading = false;
      }
    });
  }

  deletePayment(id: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.feePaymentService.deletePayment(id).subscribe({
        next: () => {
          this.loadPayments();
        },
        error: (error) => {
          console.error('Error deleting payment:', error);
          alert('Error deleting payment');
        }
      });
    }
  }
}
