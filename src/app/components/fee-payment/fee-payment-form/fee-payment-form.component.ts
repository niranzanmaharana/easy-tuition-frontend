import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FeePaymentService } from '../../../services/fee-payment.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-fee-payment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './fee-payment-form.component.html',
  styleUrl: './fee-payment-form.component.css'
})
export class FeePaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  students: Student[] = [];
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private feePaymentService: FeePaymentService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      studentId: ['', Validators.required],
      amountPaid: ['', [Validators.required, Validators.min(0.01)]],
      paymentDate: [new Date().toISOString().split('T')[0], Validators.required],
      paymentMonth: ['', Validators.required],
      paymentYear: [new Date().getFullYear(), Validators.required],
      paymentMethod: ['CASH', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getActiveStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.paymentForm.valid) {
      this.loading = true;
      this.feePaymentService.recordPayment(this.paymentForm.value).subscribe({
        next: () => {
          this.router.navigate(['/fees']);
        },
        error: (error) => {
          console.error('Error recording payment:', error);
          alert('Error recording payment: ' + (error.error || error.message));
          this.loading = false;
        }
      });
    }
  }
}
