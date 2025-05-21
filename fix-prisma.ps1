# Stop any running Node.js processes
Write-Host "Stopping any running Node.js processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null

# Remove Prisma cache and generated files
Write-Host "Cleaning Prisma cache and generated files..." -ForegroundColor Yellow
if (Test-Path -Path "node_modules\.prisma") {
    Remove-Item -Path "node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue
}

# Clean npm cache
Write-Host "Cleaning npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Remove node_modules and reinstall
Write-Host "Removing node_modules..." -ForegroundColor Yellow
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "Reinstalling dependencies..." -ForegroundColor Yellow
npm install --no-audit --no-fund

Write-Host "Done! Try running 'npm run dev' now." -ForegroundColor Green 