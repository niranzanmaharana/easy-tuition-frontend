import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { FeePaymentService } from '../../../services/fee-payment.service';
import { Student } from '../../../models/student.model';
import { FeePayment } from '../../../models/fee-payment.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  payments: FeePayment[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private feePaymentService: FeePaymentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStudent(+id);
      this.loadPayments(+id);
    }
  }

  loadStudent(id: number): void {
    this.loading = true;
    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.loading = false;
      }
    });
  }

  loadPayments(studentId: number): void {
    this.feePaymentService.getPaymentsByStudentId(studentId).subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
      }
    });
  }
}
