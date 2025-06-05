# QuickLearn - College Teacher Dashboard

A comprehensive Angular application for college teachers to manage courses, track student progress, and analyze academic performance with interactive charts and data visualization.

## 🚀 Features

### 1. Dashboard Component
- **Real-time Analytics**: Interactive charts showing enrollment trends, department distribution, and semester performance
- **Course Statistics**: Overview of total courses, students, pending approvals, and active semesters
- **Recent Activities**: Live feed of course-related activities and updates
- **Course Overview Cards**: Quick view of teacher's active courses with ratings and student counts

### 2. Courses Management Component
- **Course Creation**: Complete course creation form with validation
- **File Upload System**: Support for PDF and video materials with progress tracking
- **Course Editing**: In-line editing capabilities for existing courses
- **Approval Workflow**: Principal approval system for new courses
- **Course Statistics**: Summary analytics for all courses

### 3. Progress Analytics Component
- **Enrollment Analytics**: Bar charts showing most enrolled courses
- **Performance Metrics**: Stacked bar charts for student performance distribution
- **Rating Analysis**: Pie charts for course rating breakdowns
- **Insights Dashboard**: AI-driven insights and recommendations

## 🏗️ Architecture

### Frontend (Angular 18)
- **Components**: Modular component architecture
- **Services**: Backend integration ready with dependency injection
- **Charts**: ECharts integration for data visualization
- **Responsive Design**: Bootstrap-based responsive UI

### Backend Ready (Node.js + Express + MongoDB)
- **API Endpoints**: Prepared service calls for backend integration
- **Authentication**: Service injection points for auth implementation
- **File Upload**: Ready for cloud storage integration (MongoDB GridFS/AWS S3)
- **Real-time Updates**: WebSocket preparation for live data

## 📁 File Structure and Functionality

### Core Components

#### 1. Dashboard Component (`src/app/dashboard/`)
**Files:**
- `dashboard.component.ts` - Main dashboard logic and chart configurations
- `dashboard.component.html` - Dashboard layout with cards, charts, and activities
- `dashboard.component.css` - Styling for responsive dashboard design

**Functionality:**
- **Chart Management**: Three main charts (enrollment, department, semester)
- **Data Binding**: Angular data binding for real-time updates
- **Responsive Design**: Mobile-first responsive layout
- **Backend Integration Points**: Service injection ready for API calls

#### 2. Courses Component (`src/app/courses/`)
**Files:**
- `courses.component.ts` - Course management logic and CRUD operations
- `courses.component.html` - Course creation forms and course grid display
- `courses.component.css` - Advanced styling with animations and transitions

**Functionality:**
- **CRUD Operations**: Create, Read, Update, Delete courses
- **File Upload**: Multi-file upload with validation and progress tracking
- **Form Validation**: Angular reactive forms with custom validation
- **Course Approval**: Workflow management for principal approval

#### 3. Progress Component (`src/app/progress/`)
**Files:**
- `progress.component.ts` - Analytics logic and chart configurations
- `progress.component.html` - Analytics dashboard layout
- `progress.component.css` - Chart-specific styling and responsive design

**Functionality:**
- **Advanced Analytics**: Multiple chart types for comprehensive analysis
- **Performance Tracking**: Student performance metrics and trends
- **Data Visualization**: Interactive charts with hover effects and animations

### Services

#### Instructor Service (`instructor.service.ts`)
**Functionality:**
- **HTTP Client**: Configured for backend API communication
- **CRUD Methods**: Pre-built methods for course management
- **Error Handling**: Structured error handling for API calls
- **Type Safety**: TypeScript interfaces for data models

### Configuration Files

#### Angular Configuration
- `angular.json` - Angular CLI configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## 🛠️ Installation and Setup

### Prerequisites
```bash
# Check Node.js version (required: 18+)
node --version

# Check npm version
npm --version

# Check Angular CLI
ng version
```

### Installation Steps

1. **Clone the repository:**
```bash
git clone <repository-url>
cd QLearn
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install ECharts for charts:**
```bash
npm install echarts ngx-echarts
```

4. **Install Bootstrap for styling:**
```bash
npm install bootstrap @fortawesome/fontawesome-free
```

### Development Server

1. **Start the development server:**
```bash
ng serve
```

2. **Open browser:**
```bash
# Navigate to:
http://localhost:4200
```

3. **Watch for changes:**
```bash
# The app will automatically reload on file changes
ng serve --open
```

## 📊 Chart Configurations Explained

### Dashboard Charts

#### 1. Enrollment Trends Chart
```typescript
// Bar chart showing current vs previous semester enrollment
setupEnrollmentChart() {
  // Configuration includes:
  // - Responsive design
  // - Tooltip interactions
  // - Animation effects
  // - Color gradients
}
```

#### 2. Department Distribution Chart
```typescript
// Pie chart showing course distribution by department
setupDepartmentChart() {
  // Features:
  // - Interactive legends
  // - Hover effects
  // - Percentage calculations
  // - Color coding
}
```

#### 3. Semester Performance Chart
```typescript
// Dual-axis chart showing ratings and completion rates
setupSemesterChart() {
  // Includes:
  // - Line and bar combination
  // - Dual Y-axis
  // - Smooth line animations
  // - Data point emphasis
}
```

### Progress Analytics Charts

#### 1. Most Enrolled Courses
```typescript
// Bar chart with enrollment numbers
// Features: Gradient colors, rotation labels, responsive grid
```

#### 2. Student Performance Distribution
```typescript
// Stacked bar chart showing performance levels
// Features: Color-coded performance levels, percentage display
```

#### 3. Course Rating Analysis
```typescript
// Donut pie chart with rating distribution
// Features: Interactive legends, emphasis effects, animations
```

## 🔧 Backend Integration Guide

### Service Structure
```typescript
// Example API integration
this.instructorService.getCourses().subscribe({
  next: (data) => {
    this.courses = data;
    console.log('Courses loaded:', data);
  },
  error: (error) => {
    console.error('API Error:', error);
    // Handle error appropriately
  }
});
```

### Required Backend Endpoints

1. **Course Management:**
   - `GET /api/instructor/courses` - Get all courses
   - `POST /api/instructor/courses` - Create new course
   - `PUT /api/instructor/courses/:id` - Update course
   - `DELETE /api/instructor/courses/:id` - Delete course

2. **Analytics:**
   - `GET /api/analytics/dashboard` - Dashboard statistics
   - `GET /api/analytics/enrollment` - Enrollment data
   - `GET /api/analytics/performance` - Performance metrics

3. **File Upload:**
   - `POST /api/upload/course-materials` - Upload course files
   - `GET /api/files/:id` - Download files

### MongoDB Schema Examples

```javascript
// Course Schema
const courseSchema = {
  title: String,
  code: String,
  description: String,
  department: String,
  semester: String,
  credits: Number,
  level: String,
  teacherId: ObjectId,
  students: [ObjectId],
  materials: {
    pdfs: [String],
    videos: [String]
  },
  approvalStatus: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
};
```

## 🎨 Styling and Responsive Design

### CSS Features
- **Bootstrap Integration**: Responsive grid system
- **Custom Animations**: Smooth transitions and hover effects
- **Chart Styling**: Consistent color schemes and typography
- **Mobile Optimization**: Touch-friendly interface

### Key CSS Classes
```css
/* Chart containers for proper EChart rendering */
.chart-container {
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
}

/* Responsive card design */
.card {
  transition: all 0.3s ease;
  border-radius: 12px;
  border: none;
  overflow: hidden;
}

/* Interactive hover effects */
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

## 🧪 Testing Commands

```bash
# Run unit tests
ng test

# Run end-to-end tests
ng e2e

# Build for production
ng build --prod

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/qlearn/stats.json

# Lint code
ng lint
```

## 📱 Responsive Breakpoints

```css
/* Mobile (< 768px) */
@media (max-width: 768px) {
  .chart-container { height: 250px; }
  .stats-card h3 { font-size: 2rem; }
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .col-md-4 { flex: 0 0 50%; }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .chart-card { height: 100%; }
}
```

## 🔄 Data Flow

### Component Communication
```typescript
// Parent to Child
@Input() courseData: Course[];

// Child to Parent
@Output() courseCreated = new EventEmitter<Course>();

// Service Communication
constructor(private courseService: CourseService) {}
```

### State Management
```typescript
// Local component state
private courses: Course[] = [];
private loading = false;
private error: string | null = null;

// Service state
@Injectable({ providedIn: 'root' })
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();
}
```

## 🚀 Performance Optimizations

### Chart Optimization
- **Lazy Loading**: Charts load after view initialization
- **Debounced Updates**: Prevent excessive re-renders
- **Memory Management**: Proper cleanup on component destroy

### Code Optimization
- **Tree Shaking**: Optimized imports
- **Lazy Loading**: Route-based code splitting
- **OnPush Strategy**: Change detection optimization

## 🔐 Security Considerations

### File Upload Security
- **File Type Validation**: Strict MIME type checking
- **File Size Limits**: Configurable size restrictions
- **Virus Scanning**: Integration points for file scanning

### Authentication Integration
```typescript
// Auth guard implementation
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    // Implementation for route protection
    return this.authService.isAuthenticated();
  }
}
```

## 📈 Analytics and Monitoring

### Performance Metrics
- **Load Time Tracking**: Component initialization timing
- **User Interaction**: Click and navigation analytics
- **Error Monitoring**: Comprehensive error logging

### Chart Analytics
```typescript
// Chart interaction tracking
onChartClick(event: any) {
  console.log('Chart clicked:', event);
  // Analytics implementation
}
```

## 🔧 Development Tools

### Debugging
```bash
# Angular DevTools
ng add @angular/devkit-build-angular

# Chrome DevTools
# Enable Angular debugging in browser
```

### Code Quality
```bash
# ESLint configuration
npm install @typescript-eslint/eslint-plugin

# Prettier for code formatting
npm install prettier
```

## 📚 Learning Resources

### Angular Concepts Used
- **Component Architecture**: Modular design patterns
- **Services and Dependency Injection**: Separation of concerns
- **Reactive Forms**: Form handling and validation
- **HTTP Client**: API communication
- **Lifecycle Hooks**: Component lifecycle management

### Chart Library (ECharts)
- **Configuration Objects**: Chart setup and customization
- **Responsive Design**: Auto-resize functionality
- **Animation System**: Smooth transitions and effects
- **Event Handling**: User interaction management

## 🤝 Contributing

### Code Standards
- **TypeScript**: Strict type checking enabled
- **Angular Style Guide**: Official Angular conventions
- **Component Structure**: Consistent file organization
- **Documentation**: Comprehensive inline comments

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-functionality
git commit -m "feat: add new functionality"
git push origin feature/new-functionality
```

## 🐛 Troubleshooting

### Common Issues

1. **Charts not displaying:**
   ```bash
   # Check ECharts installation
   npm list echarts ngx-echarts
   
   # Verify chart container CSS
   # Ensure proper height and width settings
   ```

2. **Bootstrap styles not working:**
   ```bash
   # Check angular.json styles configuration
   # Verify Bootstrap import in styles.css
   ```

3. **Service injection errors:**
   ```typescript
   // Ensure proper provider configuration
   @Injectable({ providedIn: 'root' })
   ```

## 📞 Support

For technical support or questions:
- Check the console for error messages
- Verify all dependencies are installed
- Review the component lifecycle and data flow
- Test API endpoints if backend is connected

---

**Note**: This application is designed for educational purposes and demonstrates modern Angular development practices with comprehensive documentation for easy understanding and explanation.

# QLearn

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
