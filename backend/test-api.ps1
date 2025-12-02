Write-Host "Testing Mach Lagbe API Connection..." -ForegroundColor Cyan

# 1. Test basic connectivity
Write-Host "`n1. Testing server connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/" -Method Get -ErrorAction Stop
    Write-Host "✅ Server is responding" -ForegroundColor Green
    Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Server is not responding" -ForegroundColor Red
    Write-Host "   Make sure backend is running with 'npm run dev'" -ForegroundColor Red
    exit 1
}

# 2. Test health endpoint
Write-Host "`n2. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -ErrorAction Stop
    Write-Host "✅ Health check passed" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Green
    Write-Host "   Database: $($health.database)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health check failed" -ForegroundColor Red
}

# 3. Test with very simple registration
Write-Host "`n3. Testing user registration..." -ForegroundColor Yellow
$simpleUser = @{
    name = "Diagnostic Test User"
    email = "diagnostic@test.com"
    password = "test123"
} | ConvertTo-Json

Write-Host "Sending registration request..." -ForegroundColor Gray
Write-Host "Request body: $simpleUser" -ForegroundColor Gray

try {
    $regResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
        -Method Post `
        -Body $simpleUser `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ Registration successful!" -ForegroundColor Green
    Write-Host "   User: $($regResponse.user.name)" -ForegroundColor Green
    Write-Host "   Email: $($regResponse.user.email)" -ForegroundColor Green
    Write-Host "   Token received: $($regResponse.token.Substring(0, 20))..." -ForegroundColor Green
    
    # Test login with same credentials
    Write-Host "`n4. Testing login..." -ForegroundColor Yellow
    $loginBody = @{
        email = "diagnostic@test.com"
        password = "test123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
        -Method Post `
        -Body $loginBody `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "   Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Green
    
} catch {
    Write-Host "❌ Registration failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    
    # Try to get more details
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host "`n5. Testing fish endpoint..." -ForegroundColor Yellow
try {
    $fishResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/fish" -Method Get -ErrorAction Stop
    Write-Host "✅ Fish endpoint working" -ForegroundColor Green
    Write-Host "   Number of fish: $($fishResponse.count)" -ForegroundColor Green
} catch {
    Write-Host "❌ Fish endpoint failed: $_" -ForegroundColor Red
}

Write-Host "`n🎉 Diagnostic complete!" -ForegroundColor Magenta
