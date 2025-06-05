import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
import { InstructorService } from '../../../instructor.service';
// import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';
import * as AOS from 'aos';

/**
 * CoursesComponent - College Course Management
 * 
 * This component handles course creation, editing, and management for college teachers.
 * It includes file upload functionality for course materials and approval workflows.
 * 
 * BACKEND INTEGRATION NOTES:
 * - Replace mock data with actual API calls to Node.js/Express backend
 * - Implement file upload to cloud storage (MongoDB GridFS or AWS S3)
 * - Add authentication and authorization checks
 * - Implement real-time updates for course approval status
 * - Add error handling and user feedback mechanisms
 */
@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit, AfterViewInit {
  courses: any[] = []; // TODO: Replace with proper interface/model
  // Course form model (TODO: Replace with proper interface/model)
  newCourse = { 
    title: '',                      // Course title
    description: '',                // Course description
    code: '',                      // Course code (e.g., CS301)
    credits: 3,                    // Credit hours
    department: 'Computer Science', // Department
    semester: 'Fall 2024',        // Semester
    duration: '16 weeks',          // Course duration
    level: 'Beginner',             // Difficulty level
    prerequisites: '',             // Prerequisites for the course
    approvalStatus: 'Pending',     // New courses default to pending status
    materials: {                   // Course materials
      pdfs: [],                    // PDF files
      videos: []                   // Video files
    }
  };
  editingCourse: any = null;        // Course currently being edited
  showAddForm = false;               // Show/hide add course form
  
  // File upload related properties
  selectedPdfFiles: File[] = [];     // Selected PDF files for upload
  selectedVideoFiles: File[] = [];   // Selected video files for upload
  uploadProgress = 0;                // Upload progress percentage
  isUploading = false;               // Upload in progress flag
  
  // Mock data for college courses (TODO: Replace with backend API)
  // Extended with 6 additional courses as requested
  mockCourses = [
    {
      id: '1',
      title: 'Data Structures & Algorithms',
      code: 'CS301',
      description: 'Comprehensive study of data structures and algorithmic thinking',
      credits: 4,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Programming Fundamentals',
      students: 52,
      rating: 4.8,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['data-structures-notes.pdf', 'algorithms-handbook.pdf'],
        videos: ['intro-to-algorithms.mp4', 'sorting-algorithms.mp4']
      }
    },
    {
      id: '2', 
      title: 'Web Development Fundamentals',
      code: 'CS205',
      description: 'Learn modern web development with HTML, CSS, JavaScript, and frameworks',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Beginner',
      prerequisites: 'Basic Programming',
      students: 48,
      rating: 4.2,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['html-css-guide.pdf', 'javascript-basics.pdf'],
        videos: ['web-dev-intro.mp4', 'responsive-design.mp4']
      }
    },
    {
      id: '3',
      title: 'Machine Learning Basics',
      code: 'CS401',
      description: 'Introduction to machine learning concepts and practical applications',
      credits: 4,
      department: 'Computer Science',
      semester: 'Spring 2024',
      duration: '16 weeks',
      level: 'Advanced',
      prerequisites: 'Statistics, Linear Algebra',
      students: 38,
      rating: 4.9,
      status: 'Completed',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['ml-fundamentals.pdf', 'python-for-ml.pdf'],
        videos: ['ml-introduction.mp4', 'supervised-learning.mp4']
      }
    },
    {
      id: '4',
      title: 'Database Systems',
      code: 'CS302',
      description: 'Comprehensive study of database design, SQL, and database management systems',
      credits: 4,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Data Structures',
      students: 41,
      rating: 4.3,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['database-design.pdf', 'sql-handbook.pdf', 'normalization-guide.pdf'],
        videos: ['intro-to-databases.mp4', 'sql-queries.mp4', 'database-optimization.mp4']
      }
    },
    {
      id: '5',
      title: 'Computer Networks',
      code: 'CS303',
      description: 'Study of network protocols, architecture, and communication systems',
      credits: 3,
      department: 'Computer Science',
      semester: 'Spring 2024',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Operating Systems',
      students: 35,
      rating: 4.1,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['network-protocols.pdf', 'tcp-ip-guide.pdf'],
        videos: ['network-basics.mp4', 'routing-protocols.mp4']
      }
    },
    {
      id: '6',
      title: 'Software Engineering',
      code: 'CS304',
      description: 'Principles and practices of software development lifecycle and project management',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Object-Oriented Programming',
      students: 29,
      rating: 3.8,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['software-lifecycle.pdf', 'agile-methodology.pdf'],
        videos: ['project-management.mp4', 'testing-strategies.mp4']
      }
    },
    {
      id: '7',
      title: 'Operating Systems',
      code: 'CS305',
      description: 'Study of operating system concepts, process management, and system calls',
      credits: 4,
      department: 'Computer Science',
      semester: 'Spring 2024',
      duration: '16 weeks',
      level: 'Advanced',
      prerequisites: 'Computer Architecture, C Programming',
      students: 33,
      rating: 3.7,
      status: 'Completed',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['os-concepts.pdf', 'process-management.pdf', 'memory-management.pdf'],
        videos: ['os-introduction.mp4', 'scheduling-algorithms.mp4']
      }
    },
    {
      id: '8',
      title: 'Advanced AI Concepts',
      code: 'CS402',
      description: 'Deep dive into artificial intelligence, neural networks, and advanced ML algorithms',
      credits: 4,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Advanced',
      prerequisites: 'Machine Learning Basics, Advanced Mathematics',
      students: 25,
      rating: 4.7,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['deep-learning.pdf', 'neural-networks.pdf', 'ai-algorithms.pdf'],
        videos: ['advanced-ai.mp4', 'deep-learning-intro.mp4', 'neural-network-implementation.mp4']
      }
    },
    {
      id: '9',
      title: 'Digital Logic Design',
      code: 'EE201',
      description: 'Fundamentals of digital circuits, Boolean algebra, and logic gate design',
      credits: 3,
      department: 'Electronics',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Beginner',
      prerequisites: 'Basic Mathematics',
      students: 42,
      rating: 3.2,
      status: 'Active',
      approvalStatus: 'Approved',
      materials: {
        pdfs: ['digital-logic.pdf', 'boolean-algebra.pdf'],
        videos: ['logic-gates.mp4', 'circuit-design.mp4']
      }
    },
    {
      id: '10',
      title: 'Advanced Python Programming',
      code: 'CS450',
      description: 'Advanced concepts in Python including decorators, generators, and async programming',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Advanced',
      prerequisites: 'Python Fundamentals, Object-Oriented Programming',
      students: 0,
      rating: 0,
      status: 'Draft',
      approvalStatus: 'Pending',
      materials: {
        pdfs: ['advanced-python.pdf', 'async-programming.pdf'],
        videos: ['decorators-explained.mp4', 'generators-tutorial.mp4']
      }
    },
    {
      id: '11',
      title: 'Cloud Computing Basics',
      code: 'CS355',
      description: 'Introduction to cloud computing concepts, AWS, and containerization',
      credits: 4,
      department: 'Computer Science',
      semester: 'Spring 2025',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Computer Networks, Operating Systems',
      students: 0,
      rating: 0,
      status: 'Draft',
      approvalStatus: 'Rejected',
      materials: {
        pdfs: ['cloud-fundamentals.pdf'],
        videos: ['aws-introduction.mp4']
      }
    },
    {
      id: '12',
      title: 'Mobile App Development',
      code: 'CS380',
      description: 'Cross-platform mobile development using React Native and Flutter',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks',
      level: 'Intermediate',
      prerequisites: 'Web Development Fundamentals, JavaScript',
      students: 0,
      rating: 0,
      status: 'Draft',
      approvalStatus: 'Pending',
      materials: {
        pdfs: ['react-native-guide.pdf', 'flutter-basics.pdf'],
        videos: ['mobile-dev-intro.mp4', 'cross-platform-development.mp4']
      }
    }
  ];

  constructor(
    private service: InstructorService,
    private router: Router
    // private dialog: MatDialog  // TODO: Uncomment when Material UI is properly configured
    // TODO: Add other services when backend is ready
    // private authService: AuthService,
    // private fileUploadService: FileUploadService,
    // private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Initialize component and load courses
    this.loadCourses();
    
    // TODO: Add authentication check
    // this.checkUserAuthentication();
  }

  ngAfterViewInit() {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    });
  }

  /**
   * Load courses from backend API
   * TODO: Replace mock data with actual API calls
   */
  loadCourses() {
    // Use mock data for demo - replace with actual service call when backend is ready
    // Show all courses including rejected ones for testing edit/delete functionality
    this.courses = [...this.mockCourses];
    
    // TODO: Uncomment when backend is ready:
    // this.service.getCourses().subscribe({
    //   next: (data) => {
    //     this.courses = data;
    //     console.log('Courses loaded from backend:', data);
    //   },
    //   error: (error) => {
    //     console.error('Error loading courses:', error);
    //     // TODO: Show user-friendly error message
    //     // this.notificationService.showError('Failed to load courses');
    //   }
    // });
    
    console.log('Using mock data - replace with backend API calls');
    console.log('Loaded courses with different statuses for testing:', this.courses.map(c => ({ title: c.title, status: c.approvalStatus })));
  }

  /**
   * Add new college course with file uploads
   * TODO: Implement backend API integration for course creation
   */
  addCourse() {
    if (this.newCourse.title && this.newCourse.description && this.newCourse.code) {
      const course = {
        ...this.newCourse,
        id: Date.now().toString(), // TODO: Let backend generate unique IDs
        students: 0,
        rating: 0,
        status: 'Draft',
        approvalStatus: 'Pending',  // All new courses need principal approval
        materials: {
          pdfs: this.selectedPdfFiles.map(file => file.name),
          videos: this.selectedVideoFiles.map(file => file.name)
        },
        createdAt: new Date().toISOString(), // For backend integration
        teacherId: 'current-teacher-id' // TODO: Get from auth service
      };
      
      // Simulate file upload process
      if (this.selectedPdfFiles.length > 0 || this.selectedVideoFiles.length > 0) {
        this.uploadFiles().then(() => {
          this.courses.push(course);
          this.resetForm();
          this.showAddForm = false;
          
          // Enhanced success message with file upload info
          const fileInfo = `Files uploaded: ${this.selectedPdfFiles.length} PDFs, ${this.selectedVideoFiles.length} videos`;
          const successMessage = `✅ Course Created Successfully!\n\nTitle: ${course.title}\nCode: ${course.code}\nDepartment: ${course.department}\nCredits: ${course.credits}\n${fileInfo}\n\nYour course has been submitted for principal approval.`;
          alert(successMessage);
          
          // Refresh animations for new course card
          setTimeout(() => this.refreshAnimations(), 200);
          
          // TODO: Replace with proper notification
          // this.notificationService.showSuccess('Course created successfully!');
        }).catch(error => {
          console.error('File upload failed:', error);
          // TODO: Show error message to user
        });
      } else {
        this.courses.push(course);
        this.resetForm();
        this.showAddForm = false;
        
        // Enhanced success message
        const successMessage = `✅ Course Created Successfully!\n\nTitle: ${course.title}\nCode: ${course.code}\nDepartment: ${course.department}\nCredits: ${course.credits}\n\nYour course has been submitted for principal approval.`;
        alert(successMessage);
        
        // Refresh animations for new course card
        setTimeout(() => this.refreshAnimations(), 200);
      }
      
      // TODO: Uncomment when backend is ready:
      // this.service.addCourse(course).subscribe({
      //   next: (response) => {
      //     this.loadCourses();
      //     this.resetForm();
      //     this.notificationService.showSuccess('Course created successfully!');
      //   },
      //   error: (error) => {
      //     console.error('Error adding course:', error);
      //     this.notificationService.showError('Failed to create course');
      //   }
      // });
    } else {
      alert('Please fill in all required fields');
      // TODO: Replace with proper validation feedback
    }
  }




  /**
   * Reset the course form and clear file selections
   * Used when canceling form or after successful submission
   */
  resetForm() {
    this.newCourse = { 
      title: '', 
      description: '', 
      code: '',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks', 
      level: 'Beginner',
      prerequisites: '',
      approvalStatus: 'Pending',
      materials: {
        pdfs: [],
        videos: []
      }
    };
    this.selectedPdfFiles = [];
    this.selectedVideoFiles = [];
    this.uploadProgress = 0;
    this.isUploading = false;
    
    // Clear any form validation errors
    const form = document.querySelector('form');
    if (form) {
      form.classList.remove('was-validated');
    }
  }


  /**
   * Cancel add course form
   * Closes the form and resets data
   */
  cancelAdd() {
    this.showAddForm = false;
    this.resetFormData();
  }

  /**
   * Toggle add course form visibility
   * Fixed to properly handle form state
   */
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editingCourse = null;
    
    if (this.showAddForm) {
      // Reset form data when opening but preserve showAddForm state
      this.resetFormData();
      // Scroll to form for better UX
      setTimeout(() => {
        const formElement = document.querySelector('.card');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    
    // Refresh animations after DOM changes
    setTimeout(() => {
      this.refreshAnimations();
    }, 200);
  }

  /**
   * Reset only form data without affecting form visibility
   * Used when opening the form to clear data but keep it visible
   */
  resetFormData() {
    this.newCourse = { 
      title: '', 
      description: '', 
      code: '',
      credits: 3,
      department: 'Computer Science',
      semester: 'Fall 2024',
      duration: '16 weeks', 
      level: 'Beginner',
      prerequisites: '',
      approvalStatus: 'Pending',
      materials: {
        pdfs: [],
        videos: []
      }
    };
    this.selectedPdfFiles = [];
    this.selectedVideoFiles = [];
    this.uploadProgress = 0;
    this.isUploading = false;
    
    // Clear any form validation errors
    const form = document.querySelector('form');
    if (form) {
      form.classList.remove('was-validated');
    }
  }

  /**
   * Get badge class for course level
   * Returns appropriate Bootstrap badge class based on course difficulty
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
   * Get badge class for approval status
   * Returns appropriate Bootstrap badge class based on approval status
   */
  getApprovalStatusClass(status: string): string {
    switch(status) {
      case 'Approved': return 'badge bg-success';
      case 'Pending': return 'badge bg-warning';
      case 'Rejected': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
  
  /**
   * Handle PDF file selection with validation
   * TODO: Implement proper file validation and preview
   */
  onPdfFileSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedPdfFiles = files.filter(file => 
      file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024 // 10MB limit
    );
    
    if (files.length !== this.selectedPdfFiles.length) {
      alert('Some files were not selected. Please ensure all files are PDFs under 10MB.');
      // TODO: Replace with proper validation feedback
      // this.notificationService.showWarning('Some files were rejected due to size or format');
    }
    
    console.log('Selected PDF files:', this.selectedPdfFiles.length);
  }
  
  /**
   * Handle video file selection with validation
   * TODO: Implement proper file validation and preview
   */
  onVideoFileSelect(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedVideoFiles = files.filter(file => 
      file.type.startsWith('video/') && file.size <= 100 * 1024 * 1024 // 100MB limit
    );
    
    if (files.length !== this.selectedVideoFiles.length) {
      alert('Some files were not selected. Please ensure all files are videos under 100MB.');
      // TODO: Replace with proper validation feedback
    }
    
    console.log('Selected video files:', this.selectedVideoFiles.length);
  }
  
  /**
   * Simulate file upload process
   * TODO: Replace with actual file upload to backend/cloud storage
   */
  async uploadFiles(): Promise<void> {
    this.isUploading = true;
    this.uploadProgress = 0;
    
    try {
      // TODO: Implement actual file upload to backend
      // const formData = new FormData();
      // this.selectedPdfFiles.forEach(file => formData.append('pdfs', file));
      // this.selectedVideoFiles.forEach(file => formData.append('videos', file));
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        this.uploadProgress = i;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log('Files uploaded successfully (simulated)');
      
      // TODO: Actual upload implementation
      // const response = await this.fileUploadService.uploadCourseFiles(formData).toPromise();
      // return response;
      
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    } finally {
      this.isUploading = false;
      this.uploadProgress = 0;
    }
  }
  
  /**
   * Remove selected PDF file from upload list
   */
  removePdfFile(index: number) {
    this.selectedPdfFiles.splice(index, 1);
    console.log('PDF file removed, remaining:', this.selectedPdfFiles.length);
  }
  
  /**
   * Remove selected video file from upload list
   */
  removeVideoFile(index: number) {
    this.selectedVideoFiles.splice(index, 1);
    console.log('Video file removed, remaining:', this.selectedVideoFiles.length);
  }
  
  /**
   * Get file size in readable format
   * Converts bytes to human-readable format (KB, MB, GB)
   */
  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  /**
   * Calculate total students across all courses
   * Used for summary statistics display
   */
  getTotalStudents(): number {
    return this.courses.reduce((total, course) => total + (course.students || 0), 0);
  }
  
  /**
   * Calculate overall rating across all courses
   * Returns average rating as a formatted string
   */
  getOverallRating(): string {
    if (this.courses.length === 0) return '0.0';
    const totalRating = this.courses.reduce((total, course) => total + (course.rating || 0), 0);
    return (totalRating / this.courses.length).toFixed(1);
  }
  
  /**
   * Get count of approved courses
   * Used for summary statistics display
   */
  getApprovedCoursesCount(): number {
    return this.courses.filter(course => course.approvalStatus === 'Approved').length;
  }
  
  /**
   * View course details
   * Navigate to detailed course view or show modal
   * TODO: Implement proper navigation to course details page
   */
  viewCourseDetails(course: any): void {
    // For now, show an enhanced alert with course details
    // TODO: Implement the Material UI dialog once all dependencies are properly configured
    const courseDetails = `
🎓 COURSE DETAILS

📚 Title: ${course.title}
🔢 Code: ${course.code}
🏛️ Department: ${course.department}
📅 Semester: ${course.semester}
👥 Students: ${course.students}
⭐ Rating: ${course.rating}/5
📊 Status: ${course.approvalStatus}
⏱️ Duration: ${course.duration}

📖 Description:
${course.description}

📋 Prerequisites:
${course.prerequisites || 'None'}

📂 Materials:
• PDFs: ${course.materials?.pdfs?.length || 0} files
• Videos: ${course.materials?.videos?.length || 0} files
    `;
    
    alert(courseDetails);
    
    // TODO: Uncomment when Material UI dialog is ready
    /*
    const dialogRef = this.dialog.open(CourseDetailsDialogComponent, {
      width: '90vw',
      maxWidth: '900px',
      maxHeight: '90vh',
      data: course,
      panelClass: 'course-details-dialog-panel',
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.editCourse(course);
      } else if (result === 'enrolled') {
        console.log('User enrolled in course:', course.title);
        // TODO: Handle enrollment logic
      }
    });
    */
  }
  
  
  /**
   * Get pending courses count
   * Used for notifications and status display
   */
  getPendingCoursesCount(): number {
    return this.courses.filter(course => course.approvalStatus === 'Pending').length;
  }
  
  /**
   * Refresh AOS animations
   * Call this when new content is added dynamically
   */
  refreshAnimations(): void {
    AOS.refresh();
  }

  /**
   * Enhanced delete course with better confirmation dialog
   * Shows course details in confirmation
   */
  confirmDeleteCourse(course: any): void {
    const courseInfo = `Course: ${course.title} (${course.code})\nDepartment: ${course.department}\nStudents: ${course.students || 0}\nStatus: ${course.approvalStatus}`;
    
    if (confirm(`⚠️ DELETE COURSE CONFIRMATION\n\n${courseInfo}\n\nThis action cannot be undone. Are you sure you want to delete this course?`)) {
      this.deleteCourse(course.id);
    }
  }

  /**
   * Enhanced update course method with better feedback
   */
  updateCourse() {
    if (this.editingCourse && this.editingCourse.title && this.editingCourse.description && this.editingCourse.code) {
      const index = this.courses.findIndex(c => c.id === this.editingCourse.id);
      if (index !== -1) {
        // Update course with modification timestamp
        this.courses[index] = { 
          ...this.editingCourse,
          updatedAt: new Date().toISOString(),
          lastModifiedBy: 'current-teacher-id' // TODO: Get from auth service
        };
        
        const updatedCourse = this.courses[index];
        this.editingCourse = null;
        
        // Show success message with course details
        const successMessage = `✅ Course Updated Successfully!\n\nTitle: ${updatedCourse.title}\nCode: ${updatedCourse.code}\nDepartment: ${updatedCourse.department}\nCredits: ${updatedCourse.credits}`;
        alert(successMessage);
        
        // Refresh animations after DOM update
        setTimeout(() => this.refreshAnimations(), 200);
      }
      
      // TODO: Uncomment when backend is ready:
      // this.service.updateCourse(this.editingCourse.id, this.editingCourse).subscribe({
      //   next: (response) => {
      //     this.loadCourses();
      //     this.editingCourse = null;
      //     this.notificationService.showSuccess('Course updated successfully!');
      //   },
      //   error: (error) => {
      //     console.error('Error updating course:', error);
      //     this.notificationService.showError('Failed to update course');
      //   }
      // });
    } else {
      alert('❌ Please fill in all required fields (Title, Code, Description)');
    }
  }

  /**
   * Enhanced delete course with better success feedback
   */
  deleteCourse(id: string) {
    const courseToDelete = this.courses.find(c => c.id === id);
    
    if (courseToDelete) {
      // Check if course can be deleted (business logic)
      if (courseToDelete.approvalStatus === 'Approved' && courseToDelete.students > 0) {
        alert('⚠️ Cannot delete this course: It is approved and has enrolled students.');
        return;
      }
      
      this.courses = this.courses.filter(c => c.id !== id);
      
      const successMessage = `🗑️ Course Deleted Successfully!\n\nDeleted: ${courseToDelete.title} (${courseToDelete.code})`;
      alert(successMessage);
      
      // Refresh animations after DOM update
      setTimeout(() => this.refreshAnimations(), 200);
      
      // TODO: Uncomment when backend is ready:
      // this.service.deleteCourse(id).subscribe({
      //   next: () => {
      //     this.loadCourses();
      //     this.notificationService.showSuccess('Course deleted successfully!');
      //   },
      //   error: (error) => {
      //     console.error('Error deleting course:', error);
      //     this.notificationService.showError('Failed to delete course');
      //   }
      // });
    }
  }

  /**
   * Duplicate course functionality
   * Creates a copy of existing course with new ID
   */
  duplicateCourse(course: any): void {
    const duplicatedCourse = {
      ...course,
      id: Date.now().toString(), // Generate new ID
      title: `${course.title} (Copy)`,
      code: `${course.code}_COPY`,
      students: 0, // Reset student count
      rating: 0, // Reset rating
      approvalStatus: 'Pending', // Reset approval status
      status: 'Draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      teacherId: 'current-teacher-id' // TODO: Get from auth service
    };
    
    this.courses.push(duplicatedCourse);
    
    const successMessage = `📋 Course Duplicated Successfully!\n\nOriginal: ${course.title}\nCopy: ${duplicatedCourse.title}\n\nThe duplicated course is in draft status and pending approval.`;
    alert(successMessage);
    
    // Refresh animations for new course card
    setTimeout(() => this.refreshAnimations(), 200);
  }

  /**
   * Remove material from course during editing
   * Supports both PDF and video materials
   */
  removeMaterial(type: 'pdf' | 'video', fileName: string): void {
    if (this.editingCourse && this.editingCourse.materials) {
      if (type === 'pdf' && this.editingCourse.materials.pdfs) {
        this.editingCourse.materials.pdfs = this.editingCourse.materials.pdfs.filter((pdf: string) => pdf !== fileName);
      } else if (type === 'video' && this.editingCourse.materials.videos) {
        this.editingCourse.materials.videos = this.editingCourse.materials.videos.filter((video: string) => video !== fileName);
      }
      
      console.log(`${type.toUpperCase()} material removed:`, fileName);
    }
  }

  /**
   * Format date for display
   * Returns user-friendly date format
   */
  getFormattedDate(dateString: string): string {
    if (!dateString) return 'Never';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }

  /**
   * Enhanced course editing with better initialization
   */
  editCourse(course: any) {
    // Close add form if open
    this.showAddForm = false;
    
    // Deep clone the course to avoid reference issues
    this.editingCourse = {
      ...course,
      materials: {
        pdfs: [...(course.materials?.pdfs || [])],
        videos: [...(course.materials?.videos || [])]
      }
    };
    
    console.log('Editing course:', course.id, course.title);
    
    // Scroll to edit form
    setTimeout(() => {
      const editForm = document.querySelector('.card .bg-warning')?.closest('.card');
      if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  /**
   * Enhanced cancel edit with confirmation
   */
  cancelEdit() {
    if (this.hasUnsavedChanges()) {
      if (confirm('⚠️ You have unsaved changes. Are you sure you want to cancel editing?')) {
        this.editingCourse = null;
      }
    } else {
      this.editingCourse = null;
    }
  }

  /**
   * Check if there are unsaved changes in edit form
   */
  private hasUnsavedChanges(): boolean {
    if (!this.editingCourse) return false;
    
    const originalCourse = this.courses.find(c => c.id === this.editingCourse.id);
    if (!originalCourse) return false;
    
    // Check for changes in key fields
    return (
      originalCourse.title !== this.editingCourse.title ||
      originalCourse.description !== this.editingCourse.description ||
      originalCourse.code !== this.editingCourse.code ||
      originalCourse.credits !== this.editingCourse.credits ||
      originalCourse.department !== this.editingCourse.department ||
      originalCourse.semester !== this.editingCourse.semester ||
      originalCourse.duration !== this.editingCourse.duration ||
      originalCourse.level !== this.editingCourse.level ||
      originalCourse.prerequisites !== this.editingCourse.prerequisites
    );
  }

  /**
   * Enhanced canEditCourse with more comprehensive checks
   */
  canEditCourse(course: any): boolean {
    // Cannot edit if course is approved and has students
    if (course.approvalStatus === 'Approved' && course.students > 0) {
      return false;
    }
    
    // Cannot edit rejected courses (they should be recreated)
    if (course.approvalStatus === 'Rejected') {
      return false;
    }
    
    // Can edit pending and draft courses
    return course.approvalStatus === 'Pending' || course.status === 'Draft';
  }

  /**
   * Enhanced canDeleteCourse with comprehensive checks
   */
  canDeleteCourse(course: any): boolean {
    // Cannot delete if course is approved and has students
    if (course.approvalStatus === 'Approved' && course.students > 0) {
      return false;
    }
    
    // Can delete pending, draft, or approved courses with no students
    return course.approvalStatus !== 'Approved' || course.students === 0;
  }

  /**
   * Get course status indicator color
   */
  getStatusIndicatorClass(course: any): string {
    if (course.approvalStatus === 'Approved') {
      return 'text-success';
    } else if (course.approvalStatus === 'Pending') {
      return 'text-warning';
    } else if (course.approvalStatus === 'Rejected') {
      return 'text-danger';
    }
    return 'text-muted';
  }

  /**
   * Get action button states for each course
   */
  getCourseActionStates(course: any): any {
    return {
      canEdit: this.canEditCourse(course),
      canDelete: course.approvalStatus !== 'Approved' || course.students === 0,
      canDuplicate: true,
      editTooltip: this.canEditCourse(course) ? 'Edit this course' : 'Cannot edit approved course with students',
      deleteTooltip: (course.approvalStatus !== 'Approved' || course.students === 0) ? 'Delete this course' : 'Cannot delete approved course with students'
    };
  }
}

