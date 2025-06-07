import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: any = null;
  selectedModule: any = null;
  selectedModuleIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get course data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['course']) {
      this.course = navigation.extras.state['course'];
    } else {
      // If no course data, redirect back to courses
      this.router.navigate(['/courses']);
    }

    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Select module for detailed view
   */
  selectModule(module: any, index: number) {
    this.selectedModule = module;
    this.selectedModuleIndex = index;
  }

  /**
   * Close module detail view
   */
  closeModuleDetail() {
    this.selectedModule = null;
    this.selectedModuleIndex = -1;
  }

  /**
   * Go back to courses list
   */
  goBack() {
    this.router.navigate(['/courses']);
  }

  /**
   * Get module progress
   */
  getModuleProgress(): number {
    if (!this.course?.modules || this.course.modules.length === 0) return 0;
    const completed = this.course.modules.filter((m: any) => m.isCompleted).length;
    return Math.round((completed / this.course.modules.length) * 100);
  }

  /**
   * Toggle module completion
   */
  toggleModuleCompletion(module: any) {
    module.isCompleted = !module.isCompleted;
    // In a real app, this would sync with backend
    console.log(`Module ${module.title} marked as ${module.isCompleted ? 'completed' : 'incomplete'}`);
  }

  /**
   * View PDF content
   */
  viewPdf(pdfName: string) {
    alert(`📄 PDF Viewer\n\nOpening: ${pdfName}\n\nThis will open the PDF in a viewer component.`);
    console.log('Opening PDF:', pdfName);
  }

  /**
   * View video content
   */
  viewVideo(videoName: string) {
    alert(`🎥 Video Player\n\nPlaying: ${videoName}\n\nThis will open the video in a player component.`);
    console.log('Playing video:', videoName);
  }

  /**
   * Get level badge class
   */
  getLevelBadgeClass(level: string): string {
    switch(level) {
      case 'Beginner': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  /**
   * Get approval status class
   */
  getApprovalStatusClass(status: string): string {
    switch(status) {
      case 'Approved': return 'badge bg-success';
      case 'Pending': return 'badge bg-warning';
      case 'Rejected': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}
