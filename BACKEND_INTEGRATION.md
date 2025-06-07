# Backend Integration Guide

## 🏗️ Architecture Overview

This Angular application is designed to work with a Node.js + Express.js backend using MongoDB for data storage. All components are prepared for seamless backend integration.

## 📡 API Endpoints Structure

### Base URL Configuration
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api'
};
```

### Required Backend Endpoints

#### 1. Authentication Endpoints
```javascript
// POST /api/auth/login
{
  "email": "teacher@college.edu",
  "password": "password123"
}

// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "password123",
  "department": "Computer Science"
}

// GET /api/auth/profile
// Headers: { "Authorization": "Bearer <token>" }
```

#### 2. Course Management Endpoints
```javascript
// GET /api/instructor/courses
// Returns: Array of courses for authenticated teacher

// POST /api/instructor/courses
{
  "title": "Data Structures",
  "code": "CS301",
  "description": "Course description",
  "department": "Computer Science",
  "semester": "Fall 2024",
  "credits": 3,
  "level": "Intermediate",
  "prerequisites": "Programming Fundamentals"
}

// PUT /api/instructor/courses/:id
// Same structure as POST

// DELETE /api/instructor/courses/:id
// Returns: { "message": "Course deleted successfully" }
```

#### 3. Analytics Endpoints
```javascript
// GET /api/analytics/dashboard
// Returns: Dashboard statistics
{
  "stats": {
    "totalCourses": 8,
    "totalStudents": 245,
    "pendingApprovals": 2,
    "activeSemesters": 3
  },
  "recentActivities": [...],
  "myCourses": [...]
}

// GET /api/analytics/enrollment
// Returns: Enrollment data for charts

// GET /api/analytics/performance
// Returns: Student performance metrics
```

#### 4. File Upload Endpoints
```javascript
// POST /api/upload/course-materials
// Content-Type: multipart/form-data
// Form fields: pdfs[], videos[], courseId

// GET /api/files/:fileId
// Returns: File stream for download

// DELETE /api/files/:fileId
// Returns: { "message": "File deleted successfully" }
```

## 🗄️ MongoDB Schema Definitions

### User Schema
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['teacher', 'principal', 'admin'],
    default: 'teacher'
  },
  department: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
```

### Course Schema
```javascript
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  prerequisites: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  materials: {
    pdfs: [{
      filename: String,
      originalName: String,
      fileId: mongoose.Schema.Types.ObjectId, // GridFS file ID
      uploadDate: Date
    }],
    videos: [{
      filename: String,
      originalName: String,
      fileId: mongoose.Schema.Types.ObjectId,
      uploadDate: Date
    }]
  },
  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Completed', 'Inactive'],
    default: 'Draft'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update enrollmentCount when students array changes
courseSchema.pre('save', function() {
  this.enrollmentCount = this.students.length;
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Course', courseSchema);
```

### Analytics Schema
```javascript
const analyticsSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  metrics: {
    enrollmentTrend: [{
      date: Date,
      count: Number
    }],
    performanceData: {
      excellent: Number, // 90-100%
      good: Number,      // 80-89%
      average: Number,   // 70-79%
      poor: Number       // Below 70%
    },
    ratingHistory: [{
      date: Date,
      rating: Number,
      reviewCount: Number
    }]
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
```

## 🔧 Service Implementation

### Updated Instructor Service
```typescript
// src/app/services/instructor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Course {
  _id?: string;
  title: string;
  code: string;
  description: string;
  department: string;
  semester: string;
  credits: number;
  level: string;
  prerequisites?: string;
  approvalStatus: string;
  status: string;
  rating: number;
  enrollmentCount: number;
  materials?: {
    pdfs: any[];
    videos: any[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({ providedIn: 'root' })
export class InstructorService {
  private apiUrl = environment.apiUrl + '/instructor';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Course Management
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`, this.getHttpOptions())
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // File Upload
  uploadCourseFiles(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(`${environment.apiUrl}/upload/course-materials`, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

### Analytics Service
```typescript
// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardStats {
  stats: {
    totalCourses: number;
    totalStudents: number;
    pendingApprovals: number;
    activeSemesters: number;
  };
  recentActivities: any[];
  myCourses: any[];
}

export interface EnrollmentData {
  courses: string[];
  currentSemester: number[];
  previousSemester: number[];
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiUrl = environment.apiUrl + '/analytics';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`);
  }

  getEnrollmentData(): Observable<EnrollmentData> {
    return this.http.get<EnrollmentData>(`${this.apiUrl}/enrollment`);
  }

  getPerformanceData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/performance`);
  }

  getCourseRatings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ratings`);
  }
}
```

### Authentication Service
```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          // Store user and token
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('authToken', response.token);
          this.currentUserSubject.next(response.user);
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
```

## 🔒 Authentication Guard
```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

## 🚀 Backend Server Setup (Node.js)

### Package.json Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "multer-gridfs-storage": "^5.0.2",
    "gridfs-stream": "^1.1.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1"
  }
}
```

### Server Configuration
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quicklearn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/instructor', require('./routes/instructor'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/upload', require('./routes/upload'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 📝 Environment Variables
```bash
# .env file
MONGODB_URI=mongodb://localhost:27017/quicklearn
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:4200
PORT=5000
FILE_UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

## 🔄 Data Flow Integration

### Component Integration Example
```typescript
// dashboard.component.ts (Updated)
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService, DashboardStats } from '../services/analytics.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: any = {};
  recentActivities: any[] = [];
  myCourses: any[] = [];
  loading = true;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private analyticsService: AnalyticsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupCharts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadDashboardData(): void {
    this.loading = true;
    
    const dashboardSub = this.analyticsService.getDashboardStats().subscribe({
      next: (data: DashboardStats) => {
        this.stats = data.stats;
        this.recentActivities = data.recentActivities;
        this.myCourses = data.myCourses;
        this.loading = false;
        this.updateChartsWithRealData();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
    
    this.subscriptions.push(dashboardSub);
  }

  private updateChartsWithRealData(): void {
    // Update chart configurations with real data
    this.setupEnrollmentChart();
    this.setupDepartmentChart();
    this.setupSemesterChart();
  }
}
```

## 🧪 Testing Backend Integration

### API Testing Commands
```bash
# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher@college.edu","password":"password123"}'

# Test protected route
curl -X GET http://localhost:5000/api/instructor/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test course creation
curl -X POST http://localhost:5000/api/instructor/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Course","code":"TEST101","description":"Test","department":"Computer Science","semester":"Fall 2024","credits":3,"level":"Beginner"}'
```

## 🔧 Deployment Configuration

### Environment-Specific Builds
```bash
# Development build
ng build --configuration development

# Production build with environment
ng build --configuration production

# Custom environment
ng build --configuration staging
```

### Nginx Configuration for Production
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/quicklearn/dist/qlearn;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

This comprehensive backend integration guide provides everything needed to connect the Angular frontend with a robust Node.js backend using MongoDB for data persistence.

