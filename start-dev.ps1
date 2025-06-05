# QuickLearn Development Startup Script
# This script ensures a clean development environment for the Angular application

Write-Host "🚀 Starting QuickLearn Development Environment..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Change to project directory
Set-Location $PSScriptRoot

# Function to stop all Node.js processes
function Stop-NodeProcesses {
    Write-Host "⏹️  Stopping existing Node.js processes..." -ForegroundColor Yellow
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Node.js processes stopped" -ForegroundColor Green
}

# Function to clear Angular cache
function Clear-AngularCache {
    Write-Host "🗑️  Clearing Angular cache..." -ForegroundColor Yellow
    
    # Remove .angular cache directory
    if (Test-Path ".angular") {
        Remove-Item ".angular" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Angular cache cleared" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  No Angular cache found" -ForegroundColor Cyan
    }
    
    # Clear npm cache
    npm cache clean --force 2>$null
    Write-Host "✅ NPM cache cleared" -ForegroundColor Green
}

# Function to check and fix dependencies
function Check-Dependencies {
    Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
    
    if (!(Test-Path "node_modules")) {
        Write-Host "⚠️  node_modules not found, installing dependencies..." -ForegroundColor Yellow
        npm install --legacy-peer-deps
    } else {
        Write-Host "✅ Dependencies are available" -ForegroundColor Green
    }
}

# Function to start development server
function Start-DevServer {
    Write-Host "🌐 Starting Angular development server..." -ForegroundColor Yellow
    Write-Host "📍 Server will be available at: http://localhost:4201" -ForegroundColor Cyan
    Write-Host "" 
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
    Write-Host "=================================================" -ForegroundColor Green
    
    # Start the development server
    ng serve --host localhost --port 4201 --open
}

# Main execution
try {
    # Step 1: Stop existing processes
    Stop-NodeProcesses
    Start-Sleep -Seconds 2
    
    # Step 2: Clear caches
    Clear-AngularCache
    
    # Step 3: Check dependencies
    Check-Dependencies
    
    # Step 4: Start development server
    Start-DevServer
    
} catch {
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "" 
    Write-Host "Manual steps to try:" -ForegroundColor Yellow
    Write-Host "1. Run: npm install --legacy-peer-deps" -ForegroundColor Cyan
    Write-Host "2. Run: ng serve --port 4201" -ForegroundColor Cyan
    Write-Host "" 
    Read-Host "Press Enter to exit"
}

# Angular Development Server Startup Script
# This script handles EPERM issues and starts the dev server cleanly

Write-Host "Starting Angular Development Server..." -ForegroundColor Green

# Kill any existing Node.js processes that might be holding locks
Write-Host "Checking for existing Node.js processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Terminating existing Node.js processes..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Remove Angular cache to prevent file locks
Write-Host "Cleaning Angular cache..." -ForegroundColor Yellow
if (Test-Path ".angular") {
    Remove-Item -Path ".angular" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Angular cache cleared." -ForegroundColor Green
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null

# Start the development server
Write-Host "Starting Angular development server on port 4201..." -ForegroundColor Green
ng serve --port 4201 --host localhost

