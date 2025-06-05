@echo off
echo Starting Angular Development Server with Clean Setup...
echo.

echo Killing existing Node.js processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Cleaning Angular cache...
if exist ".angular" rmdir /s /q ".angular" 2>nul

echo Clearing npm cache...
npm cache clean --force 2>nul

echo.
echo Starting development server on port 4201...
ng serve --port 4201 --host localhost

