// app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress/progress.component').then(m => m.ProgressComponent)
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./courses/courses.component').then(m => m.CoursesComponent)
  },
  {
    path: 'status',
    loadComponent: () =>
      import('./status/status.component').then(m => m.StatusComponent)
  }
];
