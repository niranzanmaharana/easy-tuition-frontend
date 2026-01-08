import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from '../../../services/report.service';
import { PaymentStatusReport, MonthlyCollectionReport } from '../../../models/report.model';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reports-dashboard.component.html',
  styleUrl: './reports-dashboard.component.css'
})
export class ReportsDashboardComponent implements OnInit {
  paymentStatusReport: PaymentStatusReport[] = [];
  monthlyCollectionReport: MonthlyCollectionReport | null = null;
  loading = false;
  selectedReport = 'payment-status';
  
  filterForm: FormGroup;

  constructor(
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7);
    
    this.filterForm = this.fb.group({
      month: [currentMonth],
      year: [currentDate.getFullYear()],
      startDate: [''],
      endDate: [''],
      reportType: ['payment-status']
    });
    
    this.filterForm.get('reportType')?.valueChanges.subscribe(value => {
      this.selectedReport = value;
      this.onReportChange();
    });
  }

  ngOnInit(): void {
    this.loadPaymentStatusReport();
  }

  onReportChange(): void {
    if (this.selectedReport === 'payment-status') {
      this.loadPaymentStatusReport();
    } else if (this.selectedReport === 'monthly-collection') {
      this.loadMonthlyCollectionReport();
    }
  }

  loadPaymentStatusReport(): void {
    this.loading = true;
    const month = this.filterForm.get('month')?.value;
    const year = this.filterForm.get('year')?.value;
    
    this.reportService.getPaymentStatusReport(month, year).subscribe({
      next: (data) => {
        this.paymentStatusReport = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading payment status report:', error);
        this.loading = false;
      }
    });
  }

  loadMonthlyCollectionReport(): void {
    this.loading = true;
    const month = this.filterForm.get('month')?.value;
    const year = this.filterForm.get('year')?.value;
    
    this.reportService.getMonthlyCollectionReport(month, year).subscribe({
      next: (data) => {
        this.monthlyCollectionReport = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading monthly collection report:', error);
        this.loading = false;
      }
    });
  }
}
