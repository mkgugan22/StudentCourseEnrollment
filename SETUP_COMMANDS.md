# Setup Commands and Development Guide

## 🚀 Initial Setup Commands

### 1. Prerequisites Check
```powershell
# Check Node.js version (required: 18.0 or higher)
node --version
# Expected output: v18.x.x or higher

# Check npm version
npm --version
# Expected output: 8.x.x or higher

# Install Angular CLI globally (if not installed)
npm install -g @angular/cli

# Verify Angular CLI installation
ng version
```

### 2. Project Setup
```powershell
# Navigate to project directory
cd "C:\Users\mkgug\OneDrive - kce.ac.in\Desktop\NOTES\Project\QuickLearn\QuickLearn\QLearn"

# Install all project dependencies
npm install

# Install additional required packages
npm install echarts ngx-echarts
npm install bootstrap @fortawesome/fontawesome-free
npm install @angular/forms
```

### 3. Development Server
```powershell
# Start development server
ng serve

# Start with automatic browser opening
ng serve --open

# Start on specific port
ng serve --port 4200

# Start with live reload
ng serve --live-reload
```

## 🛠️ Development Commands

### Building the Project
```powershell
# Build for development
ng build

# Build for production
ng build --configuration production

# Build with optimization
ng build --prod --aot

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/qlearn/stats.json
```

### Testing Commands
```powershell
# Run unit tests
ng test

# Run tests with code coverage
ng test --code-coverage

# Run tests in watch mode
ng test --watch

# Run end-to-end tests
ng e2e
```

### Code Quality
```powershell
# Lint the code
ng lint

# Fix linting issues automatically
ng lint --fix

# Format code with Prettier (if installed)
npx prettier --write src/**/*.{ts,html,css}
```

## 📁 Project Structure Commands

### Generate New Components
```powershell
# Generate new component
ng generate component component-name

# Generate component with routing
ng generate component component-name --routing

# Generate service
ng generate service services/service-name

# Generate module
ng generate module modules/module-name
```

### File Management
```powershell
# View project file structure
tree /f

# List all TypeScript files
dir *.ts /s

# Find specific files
dir *component* /s
```

## 🔧 Troubleshooting Commands

### Clear Cache and Reinstall
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir node_modules /s /q
del package-lock.json
npm install

# Clear Angular CLI cache
ng cache clean
```

### Fix Common Issues
```powershell
# Update Angular CLI
npm update -g @angular/cli

# Update project dependencies
ng update

# Update specific package
ng update @angular/core @angular/cli

# Fix peer dependency warnings
npm install --legacy-peer-deps
```

## 📊 Chart Development Commands

### ECharts Integration
```powershell
# Install ECharts packages
npm install echarts
npm install ngx-echarts

# Import in module (add to app.module.ts or standalone component)
# import { NgxEchartsModule } from 'ngx-echarts';
```

### Chart Debugging
```powershell
# Check ECharts installation
npm list echarts
npm list ngx-echarts

# Verify chart container styling
# Open browser DevTools (F12)
# Check console for chart-related errors
```

## 🎨 Styling Commands

### Bootstrap Setup
```powershell
# Install Bootstrap
npm install bootstrap

# Install Font Awesome
npm install @fortawesome/fontawesome-free

# Add to angular.json styles array:
# "node_modules/bootstrap/dist/css/bootstrap.min.css"
# "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
```

### CSS Management
```powershell
# Watch for CSS changes during development
# (Angular CLI automatically watches CSS files)

# Compile SCSS if using Sass
ng config schematics.@schematics/angular:component.style scss
```

## 🔄 Backend Integration Commands

### Service Testing
```powershell
# Test API endpoints (using curl)
curl -X GET http://localhost:5000/api/instructor/courses

# Test POST request
curl -X POST http://localhost:5000/api/instructor/courses -H "Content-Type: application/json" -d "{\"title\":\"Test Course\"}"

# Start mock backend server (if using json-server)
npx json-server --watch db.json --port 3000
```

### Environment Configuration
```powershell
# Set environment variables
$env:NODE_ENV="development"

# Configure API base URL in environment files
# Edit src/environments/environment.ts
# Edit src/environments/environment.prod.ts
```

## 📱 Mobile Testing Commands

### Responsive Testing
```powershell
# Serve with network access for mobile testing
ng serve --host 0.0.0.0

# Find your IP address
ipconfig

# Access from mobile device using:
# http://YOUR_IP_ADDRESS:4200
```

## 🚦 Performance Commands

### Performance Analysis
```powershell
# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/qlearn/stats.json

# Check for unused dependencies
npx depcheck

# Audit for security vulnerabilities
npm audit
npm audit fix
```

### Lighthouse Testing
```powershell
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse http://localhost:4200 --output html --output-path ./lighthouse-report.html
```

## 🔍 Debugging Commands

### Browser Debugging
```powershell
# Serve with source maps for debugging
ng serve --source-map

# Open with specific browser
ng serve --open --port 4200

# Enable verbose logging
ng serve --verbose
```

### Component Debugging
```javascript
// Add to component for debugging
console.log('Component data:', this.courses);
console.log('Chart options:', this.enrollmentChartOptions);

// Browser console commands
// ng.getComponent($0) - Get component instance from selected element
// ng.getContext($0) - Get context of selected element
```

## 📦 Deployment Commands

### Production Build
```powershell
# Build for production
ng build --configuration production

# Build with specific base href
ng build --base-href /quicklearn/

# Copy build files to deployment directory
xcopy dist\qlearn\* "C:\inetpub\wwwroot\quicklearn\" /E /Y
```

### Docker Commands (if using Docker)
```powershell
# Build Docker image
docker build -t quicklearn-app .

# Run Docker container
docker run -p 80:80 quicklearn-app
```

## 🔧 Maintenance Commands

### Regular Updates
```powershell
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update Angular specifically
ng update @angular/core @angular/cli

# Update to latest Angular version
ng update @angular/core @angular/cli --next
```

### Health Checks
```powershell
# Check project health
ng doctor

# Verify all imports
ng build --dry-run

# Check TypeScript configuration
ngc --noEmit
```

## 📝 Documentation Commands

### Generate Documentation
```powershell
# Install Compodoc for documentation
npm install -g @compodoc/compodoc

# Generate documentation
compodoc -p tsconfig.json -s

# Generate and serve documentation
compodoc -p tsconfig.json -s -o
```

## 🎯 Quick Development Workflow

### Daily Development Commands
```powershell
# 1. Start development
cd "C:\Users\mkgug\OneDrive - kce.ac.in\Desktop\NOTES\Project\QuickLearn\QuickLearn\QLearn"
ng serve --open

# 2. In another terminal - watch for changes
ng test --watch

# 3. Before committing
ng lint
ng build

# 4. Commit changes
git add .
git commit -m "feat: implement dashboard charts"
git push
```

## 🚨 Emergency Commands

### Quick Fixes
```powershell
# If server won't start
ng serve --poll 2000

# If charts not displaying
# Check browser console for errors
# Verify ECharts imports
# Clear browser cache (Ctrl+Shift+Delete)

# If styles not loading
# Check angular.json styles configuration
# Restart development server

# If TypeScript errors
ng build --skip-lib-check
```

---

## 📞 Getting Help

### Angular CLI Help
```powershell
# General help
ng help

# Specific command help
ng serve --help
ng build --help
ng generate --help
```

### Project-Specific Help
- Check README.md for project overview
- Check COMPONENT_DETAILS.md for component explanations
- Review console errors in browser DevTools
- Check Network tab for API call issues

This comprehensive command guide covers all aspects of development, testing, and deployment for the QuickLearn project.

