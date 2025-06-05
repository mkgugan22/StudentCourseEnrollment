import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../instructor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  statusList: any[] = [];           // List of course approval statuses
  filteredStatusList: any[] = [];   // Filtered list based on status filter
  selectedFilter = 'All';           // Current filter (All, Approved, Pending, Rejected)
  
  // Status filter options
  filterOptions = ['All', 'Approved', 'Pending', 'Rejected'];

  // Mock data for college course approval statuses
  mockStatusList = [
    {
      id: '1',
      courseTitle: 'Advanced Database Systems',
      courseCode: 'CS402',
      department: 'Computer Science',
      submissionDate: '2024-05-28',
      reviewDate: '2024-05-30',
      status: 'Pending',
      reviewedBy: '',
      message: 'Course submission received. Under review by academic committee.',
      priority: 'Normal',
      credits: 4
    },
    {
      id: '2',
      courseTitle: 'Data Structures & Algorithms',
      courseCode: 'CS301',
      department: 'Computer Science',
      submissionDate: '2024-05-25',
      reviewDate: '2024-05-27',
      status: 'Approved',
      reviewedBy: 'Dr. Principal Smith',
      message: 'Excellent course structure and comprehensive content. Approved for Fall 2024 semester.',
      priority: 'High',
      credits: 4
    },
    {
      id: '3',
      courseTitle: 'Web Development Fundamentals',
      courseCode: 'CS205',
      department: 'Computer Science',
      submissionDate: '2024-05-20',
      reviewDate: '2024-05-22',
      status: 'Approved',
      reviewedBy: 'Dr. Principal Smith',
      message: 'Good foundational course. Approved with minor suggestions for practical exercises.',
      priority: 'Normal',
      credits: 3
    },
    {
      id: '4',
      courseTitle: 'Advanced JavaScript Frameworks',
      courseCode: 'CS350',
      department: 'Computer Science',
      submissionDate: '2024-05-15',
      reviewDate: '2024-05-18',
      status: 'Rejected',
      reviewedBy: 'Dr. Principal Smith',
      message: 'Course content needs more depth in React and Vue sections. Please revise and resubmit with additional practical projects.',
      priority: 'Low',
      credits: 3
    },
    {
      id: '5',
      courseTitle: 'Machine Learning Applications',
      courseCode: 'CS425',
      department: 'Computer Science',
      submissionDate: '2024-05-10',
      reviewDate: '',
      status: 'Pending',
      reviewedBy: '',
      message: 'Waiting for departmental prerequisites verification.',
      priority: 'High',
      credits: 4
    },
    {
      id: '6',
      courseTitle: 'Advanced Python Programming',
      courseCode: 'CS450',
      department: 'Computer Science',
      submissionDate: '2024-06-01',
      reviewDate: '',
      status: 'Pending',
      reviewedBy: '',
      message: 'Course submitted for review. Awaiting academic committee evaluation.',
      priority: 'Normal',
      credits: 3
    },
    {
      id: '7',
      courseTitle: 'Cloud Computing Basics',
      courseCode: 'CS355',
      department: 'Computer Science',
      submissionDate: '2024-05-30',
      reviewDate: '2024-06-02',
      status: 'Rejected',
      reviewedBy: 'Dr. Principal Smith',
      message: 'Course content lacks practical hands-on exercises. Please add more lab sessions and real-world cloud deployment projects.',
      priority: 'Normal',
      credits: 4
    },
    {
      id: '8',
      courseTitle: 'Mobile App Development',
      courseCode: 'CS380',
      department: 'Computer Science',
      submissionDate: '2024-06-03',
      reviewDate: '',
      status: 'Pending',
      reviewedBy: '',
      message: 'New submission received. Preliminary review in progress.',
      priority: 'High',
      credits: 3
    }
  ];

  constructor(private instructorService: InstructorService) {}

  ngOnInit() {
    this.loadStatusList();
  }

  // Load course approval status list
  loadStatusList() {
    // Use mock data for demo - replace with actual service call when backend is ready
    this.statusList = [...this.mockStatusList];
    this.applyFilter(); // Apply initial filter
    
    console.log('Status list loaded with different statuses for testing:', 
                this.statusList.map(s => ({ title: s.courseTitle, status: s.status })));
    
    // TODO: Uncomment when backend is ready:
    // this.instructorService.getStatus().subscribe({
    //   next: (data) => {
    //     this.statusList = data;
    //     this.applyFilter();
    //   },
    //   error: (error) => console.error('Error loading status:', error)
    // });
  }

  // Apply filter to status list
  applyFilter() {
    if (this.selectedFilter === 'All') {
      this.filteredStatusList = [...this.statusList];
    } else {
      this.filteredStatusList = this.statusList.filter(
        item => item.status === this.selectedFilter
      );
    }
  }

  // Change filter and update displayed list
  onFilterChange() {
    this.applyFilter();
  }

  // Get total count for each status
  getStatusCount(status: string): number {
    if (status === 'All') {
      return this.statusList.length;
    }
    return this.statusList.filter(item => item.status === status).length;
  }

  // Get appropriate icon for status
  getStatusIcon(status: string): string {
    switch(status) {
      case 'Approved': return 'fas fa-check-circle text-success';
      case 'Rejected': return 'fas fa-times-circle text-danger';
      case 'Pending': return 'fas fa-clock text-warning';
      default: return 'fas fa-info-circle text-info';
    }
  }

  // Get badge class for status
  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'Approved': return 'badge bg-success';
      case 'Rejected': return 'badge bg-danger';
      case 'Pending': return 'badge bg-warning';
      default: return 'badge bg-info';
    }
  }
  
  // Get priority badge class
  getPriorityClass(priority: string): string {
    switch(priority) {
      case 'High': return 'text-danger';
      case 'Normal': return 'text-primary';
      case 'Low': return 'text-secondary';
      default: return 'text-muted';
    }
  }
  
  // Calculate days since submission
  getDaysSinceSubmission(submissionDate: string): number {
    const today = new Date();
    const submission = new Date(submissionDate);
    const diffTime = Math.abs(today.getTime() - submission.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
