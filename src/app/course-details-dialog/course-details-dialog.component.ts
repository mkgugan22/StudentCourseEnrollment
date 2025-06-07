import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import * as AOS from 'aos';

@Component({
  selector: 'app-course-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatCardModule,
    MatTabsModule
  ],
  templateUrl: './course-details-dialog.component.html',
  styleUrls: ['./course-details-dialog.component.css']
})
export class CourseDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CourseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: any
  ) {}

  ngOnInit() {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getLevelColor(level: string): string {
    switch(level) {
      case 'Beginner': return 'primary';
      case 'Intermediate': return 'accent';
      case 'Advanced': return 'warn';
      default: return 'primary';
    }
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'Approved': return '#4caf50';
      case 'Pending': return '#ff9800';
      case 'Rejected': return '#f44336';
      default: return '#2196f3';
    }
  }

  downloadMaterial(materialName: string, type: string): void {
    // TODO: Implement actual download functionality
    console.log(`Downloading ${type}: ${materialName}`);
    // In a real app, this would trigger a file download
  }

  enrollInCourse(): void {
    // TODO: Implement enrollment functionality
    console.log('Enrolling in course:', this.course.title);
    this.dialogRef.close('enrolled');
  }

  editCourse(): void {
    this.dialogRef.close('edit');
  }
}

