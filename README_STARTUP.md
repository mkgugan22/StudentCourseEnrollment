# QuickLearn - Angular Development Server Startup Guide

## EPERM Error Resolution

This project includes several methods to resolve the common EPERM (operation not permitted) errors that occur with Angular's cache files on Windows.

## Quick Start Options

### Option 1: Using Batch File (Recommended)
```bash
# Simply double-click or run:
start-clean.bat
```

### Option 2: Using NPM Scripts
```bash
# For clean startup (handles EPERM automatically):
npm run start:clean

# For regular startup:
npm start

# For development with auto-open:
npm run dev:clean
```

### Option 3: Manual Steps
If you encounter EPERM errors, run these commands in order:

```bash
# 1. Kill any existing Node.js processes
taskkill /f /im node.exe

# 2. Remove Angular cache
rmdir /s /q .angular

# 3. Clear npm cache
npm cache clean --force

# 4. Start the server
ng serve --port 4201
```

## Application Features

### Fixed Issues:
1. **Create Course Button**: Now properly toggles the form and scrolls to it
2. **Analytics Chart**: Enhanced with specific course names in each rating category
3. **Course Data**: Added 6 additional courses (total of 9 courses)
4. **EPERM Prevention**: Automatic cache cleanup on startup

### Course Categories in Analytics:
- **Excellent (4.5-5.0)**: Machine Learning Basics, Data Structures & Algorithms, Advanced AI Concepts
- **Very Good (4.0-4.4)**: Web Development Fundamentals, Database Systems, Computer Networks
- **Good (3.5-3.9)**: Software Engineering, Operating Systems
- **Average (3.0-3.4)**: Digital Logic Design
- **Poor (< 3.0)**: None currently

## Project Structure

```
QLearn/
├── src/app/
│   ├── courses/           # Course management component
│   ├── dashboard/         # Teacher dashboard
│   ├── progress/          # Analytics and progress tracking
│   └── ...
├── start-clean.bat        # Windows batch file for clean startup
├── start-dev.ps1         # PowerShell script for clean startup
├── package.json          # Updated with new scripts
└── angular.json          # Configured with port 4201
```

## Accessing the Application

Once started, the application will be available at:
- **Local**: http://localhost:4201/
- **Network**: http://[your-ip]:4201/

## Troubleshooting

### If EPERM errors persist:
1. Run Windows Command Prompt as Administrator
2. Execute the manual steps above
3. Check if any antivirus software is blocking file operations
4. Ensure no other Angular projects are running

### If charts don't load:
1. Refresh the page after initial load
2. Check browser console for any errors
3. Ensure all dependencies are installed: `npm install`

### Performance Issues:
1. Close unnecessary browser tabs
2. Use Chrome/Edge for better performance
3. Clear browser cache if needed

## Development Notes

- **Port**: Application runs on port 4201 (configured to avoid conflicts)
- **Hot Reload**: Enabled for all changes
- **Animations**: AOS animations configured for smooth UI transitions
- **Charts**: Using ngx-echarts for interactive data visualization

## Next Steps for Backend Integration

When ready to integrate with backend:
1. Replace mock data in components with actual API calls
2. Implement authentication service
3. Add file upload functionality to cloud storage
4. Enable real-time updates with WebSocket connections

For any issues, check the browser console and terminal output for detailed error messages.

