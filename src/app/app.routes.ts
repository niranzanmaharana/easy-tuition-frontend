import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    loadComponent: () => import('./components/student/student-list/student-list.component').then(m => m.StudentListComponent)
  },
  {
    path: 'students/new',
    loadComponent: () => import('./components/student/student-form/student-form.component').then(m => m.StudentFormComponent)
  },
  {
    path: 'students/:id',
    loadComponent: () => import('./components/student/student-detail/student-detail.component').then(m => m.StudentDetailComponent)
  },
  {
    path: 'fees',
    loadComponent: () => import('./components/fee-payment/fee-payment-list/fee-payment-list.component').then(m => m.FeePaymentListComponent)
  },
  {
    path: 'fees/new',
    loadComponent: () => import('./components/fee-payment/fee-payment-form/fee-payment-form.component').then(m => m.FeePaymentFormComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('./components/reports/reports-dashboard/reports-dashboard.component').then(m => m.ReportsDashboardComponent)
  }
];
