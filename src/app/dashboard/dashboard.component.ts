import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Router } from '@angular/router';
import * as AOS from 'aos';
// TODO: Import backend service when ready
// import { DashboardService } from '../services/dashboard.service';

/**
 * DashboardComponent - College Teacher Dashboard
 * 
 * This component serves as the main dashboard for college teachers,
 * displaying course analytics, enrollment statistics, and activities.
 * 
 * BACKEND INTEGRATION NOTES:
 * - Replace mock data with actual API calls to Node.js/Express backend
 * - Integrate with MongoDB for data storage
 * - Add authentication checks
 * - Implement real-time updates for statistics
 */
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  // Chart configuration objects for ECharts
  enrollmentChartOptions: any;
  departmentChartOptions: any;
  semesterChartOptions: any;
  
  // College course statistics (TODO: Replace with backend API data)
  stats = {
    totalCourses: 9,        // Total courses taught by this teacher
    totalStudents: 343,     // Total students enrolled in teacher's courses  
    pendingApprovals: 0,    // Courses pending principal approval
    activeSemesters: 3      // Number of active semesters
  };
  
  // Recent course activities (TODO: Replace with backend API data)
  recentActivities = [
    { 
      type: 'enrollment', 
      message: 'New student enrolled in "Data Structures"', 
      time: '2 hours ago',
      id: 1 // For backend integration
    },
    { 
      type: 'approval', 
      message: 'Course "Machine Learning" got approved by Principal', 
      time: '5 hours ago',
      id: 2
    },
    { 
      type: 'submission', 
      message: 'Assignment submitted for "Web Development"', 
      time: '1 day ago',
      id: 3
    },
    { 
      type: 'course', 
      message: 'New course "AI Fundamentals" submitted for approval', 
      time: '2 days ago',
      id: 4
    }
  ];
  
  // Teacher's courses overview (TODO: Replace with backend API data)
  myCourses = [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      code: 'CS301',
      department: 'Computer Science',
      semester: 'Fall 2024',
      students: 52,
      status: 'Active',
      rating: 4.8,
      description: 'Comprehensive study of data structures and algorithms',
      approvalStatus: 'Approved'
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      code: 'CS205',
      department: 'Computer Science',
      semester: 'Fall 2024',
      students: 48,
      status: 'Active',
      rating: 4.2,
      description: 'Learn modern web development technologies',
      approvalStatus: 'Approved'
    },
    {
      id: 3,
      title: 'Machine Learning Basics',
      code: 'CS401',
      department: 'Computer Science',
      semester: 'Spring 2024',
      students: 38,
      status: 'Completed',
      rating: 4.9,
      description: 'Introduction to machine learning concepts',
      approvalStatus: 'Approved'
    },
    {
      id: 4,
      title: 'Database Systems',
      code: 'CS302',
      department: 'Computer Science',
      semester: 'Fall 2024',
      students: 41,
      status: 'Active',
      rating: 4.3,
      description: 'Comprehensive study of database design and SQL',
      approvalStatus: 'Approved'
    },
    {
      id: 5,
      title: 'Advanced AI Concepts',
      code: 'CS402',
      department: 'Computer Science',
      semester: 'Fall 2024',
      students: 25,
      status: 'Active',
      rating: 4.7,
      description: 'Deep dive into AI and neural networks',
      approvalStatus: 'Approved'
    },
    {
      id: 6,
      title: 'Computer Networks',
      code: 'CS303',
      department: 'Computer Science',
      semester: 'Spring 2024',
      students: 35,
      status: 'Active',
      rating: 4.1,
      description: 'Study of network protocols and architecture',
      approvalStatus: 'Approved'
    }
  ];

  constructor(
    private router: Router
    // TODO: Inject backend services when ready
    // private dashboardService: DashboardService,
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize dashboard data
    this.loadDashboardData();
    
    // Setup all chart configurations
    this.setupEnrollmentChart();
    this.setupDepartmentChart();
    this.setupSemesterChart();
  }
  
  ngAfterViewInit(): void {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    });
    
    // Ensure charts are properly rendered after view initialization
    setTimeout(() => {
      this.refreshCharts();
      // Trigger AOS refresh after charts are loaded
      setTimeout(() => {
        AOS.refresh();
      }, 200);
    }, 300);
  }
  
  /**
   * Load dashboard data from backend API
   * TODO: Replace with actual API calls when backend is ready
   */
  loadDashboardData(): void {
    // TODO: Implement backend API call
    // this.dashboardService.getDashboardStats().subscribe({
    //   next: (data) => {
    //     this.stats = data.stats;
    //     this.myCourses = data.courses;
    //     this.recentActivities = data.activities;
    //   },
    //   error: (error) => console.error('Error loading dashboard data:', error)
    // });
    
    // Using mock data for demonstration
    console.log('Using mock data - replace with backend API calls');
  }
  
  /**
   * Refresh all charts to ensure proper rendering
   */
  refreshCharts(): void {
    // Force chart refresh for proper display with delay to ensure DOM is ready
    setTimeout(() => {
      this.setupEnrollmentChart();
    }, 50);
    setTimeout(() => {
      this.setupDepartmentChart();
    }, 100);
    setTimeout(() => {
      this.setupSemesterChart();
    }, 150);
  }

  /**
   * Setup enrollment trends chart with proper responsive configuration
   * TODO: Replace mock data with backend API data
   */
  setupEnrollmentChart() {
    this.enrollmentChartOptions = {
      title: { 
        text: 'Student Enrollment Trends', 
        left: 'center', 
        top: '8px',
        textStyle: { color: '#495057', fontSize: 14, fontWeight: 'bold' }
      },
      tooltip: { 
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: { color: '#fff' },
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Current Semester', 'Previous Semester'],
        bottom: '8px',
        textStyle: { fontSize: 11 },
        itemGap: 15
      },
      grid: {
        left: '12%',
        right: '8%',
        bottom: '18%',
        top: '18%',
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: ['Data Structures', 'Web Dev', 'ML Basics', 'Database', 'Networks', 'Software Eng', 'Operating Sys', 'Advanced AI', 'Digital Logic'],
        axisLabel: {
          rotate: 25,
          fontSize: 10,
          margin: 8,
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      yAxis: { 
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      series: [
        {
          name: 'Current Semester',
          type: 'bar',
        data: [52, 48, 38, 41, 35, 29, 33, 25, 42],
          barWidth: '30%',
          itemStyle: { 
            color: '#007bff',
            borderRadius: [3, 3, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#0056b3',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 123, 255, 0.5)'
            }
          }
        },
        {
          name: 'Previous Semester',
          type: 'bar',
        data: [48, 45, 35, 38, 32, 27, 30, 0, 39],
          barWidth: '30%',
          itemStyle: { 
            color: '#6c757d',
            borderRadius: [3, 3, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#5a6268',
              shadowBlur: 10,
              shadowColor: 'rgba(108, 117, 125, 0.5)'
            }
          }
        }
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    };
  }

  /**
   * Setup department-wise course distribution pie chart
   * TODO: Replace mock data with backend API data
   */
  setupDepartmentChart() {
    this.departmentChartOptions = {
      title: { 
        text: 'Course Distribution by Department', 
        left: 'center', 
        textStyle: { color: '#495057', fontSize: 14 }
      },
      tooltip: { 
        trigger: 'item', 
        formatter: '{a} <br/>{b}: {c} courses ({d}%)',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: { color: '#fff' }
      },
      legend: {
        orient: 'horizontal',
        bottom: '5%',
        textStyle: { fontSize: 10 }
      },
      series: [{
        name: 'Courses',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '45%'],
        data: [
          { 
            value: 5, 
            name: 'Computer Science', 
            itemStyle: { color: '#007bff' }
          },
          { 
            value: 2, 
            name: 'Information Technology', 
            itemStyle: { color: '#28a745' }
          },
          { 
            value: 1, 
            name: 'Electronics', 
            itemStyle: { color: '#ffc107' }
          }
        ],
        label: { 
          show: true, 
          position: 'outside',
          fontSize: 10,
          formatter: '{b}: {c}'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }],
      responsive: true
    };
  }

  /**
   * Setup semester-wise performance chart with dual axis
   * TODO: Replace mock data with backend API data
   */
  setupSemesterChart() {
    this.semesterChartOptions = {
      title: { 
        text: 'Semester-wise Course Performance', 
        left: 'center', 
        textStyle: { color: '#495057', fontSize: 14 }
      },
      tooltip: { 
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: { color: '#fff' }
      },
      legend: {
        data: ['Average Rating', 'Completion Rate %'],
        bottom: '5%',
        textStyle: { fontSize: 12 }
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Spring 2023', 'Fall 2023', 'Spring 2024', 'Fall 2024'],
        axisLabel: {
          rotate: 30,
          fontSize: 10
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Rating',
          min: 0,
          max: 5,
          position: 'left',
          axisLabel: { 
            formatter: '{value}',
            fontSize: 10
          },
          nameTextStyle: {
            fontSize: 10
          }
        },
        {
          type: 'value',
          name: 'Completion %',
          min: 0,
          max: 100,
          position: 'right',
          axisLabel: { 
            formatter: '{value}%',
            fontSize: 10
          },
          nameTextStyle: {
            fontSize: 10
          }
        }
      ],
      series: [
        {
          name: 'Average Rating',
          type: 'line',
          data: [4.2, 4.5, 4.7, 4.6],
          itemStyle: { color: '#28a745' },
          lineStyle: { width: 3 },
          smooth: true,
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Completion Rate %',
          type: 'bar',
          yAxisIndex: 1,
          data: [85, 88, 92, 89],
          itemStyle: { 
            color: '#007bff',
            borderRadius: [2, 2, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: '#0056b3'
            }
          }
        }
      ],
      responsive: true
    };
  }

  /**
   * Get appropriate icon for activity type
   * Used for displaying recent activities with visual indicators
   */
  getActivityIcon(type: string): string {
    switch(type) {
      case 'enrollment': return 'fas fa-user-plus text-primary';
      case 'approval': return 'fas fa-check-circle text-success';
      case 'submission': return 'fas fa-file-upload text-info';
      case 'course': return 'fas fa-book text-warning';
      default: return 'fas fa-info-circle text-secondary';
    }
  }
  
  /**
   * Get status badge class for courses
   * Returns appropriate Bootstrap badge class based on course status
   */
  getStatusClass(status: string): string {
    switch(status) {
      case 'Active': return 'badge bg-success';
      case 'Completed': return 'badge bg-primary';
      case 'Pending': return 'badge bg-warning';
      case 'Inactive': return 'badge bg-secondary';
      default: return 'badge bg-info';
    }
  }
  
  /**
   * Navigate to course details page
   * TODO: Implement proper routing when course detail component is ready
   */
  viewCourseDetails(courseId: number): void {
    // TODO: Navigate to course details page
    // this.router.navigate(['/courses', courseId]);
    console.log('Navigate to course details:', courseId);
  }
  
  /**
   * Refresh dashboard data
   * Can be called manually or on timer for real-time updates
   */
  refreshDashboard(): void {
    this.loadDashboardData();
    this.refreshCharts();
  }

  /**
   * Refresh AOS animations
   * Call this when new content is added dynamically
   */
  refreshAnimations(): void {
    AOS.refresh();
  }
}
