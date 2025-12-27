# Troubleshooting Guide

## Issue 1: Registration Failing

### Possible Causes:

1. **Backend server not running**
   - Check if backend is running on port 5000
   - Start it: `cd backend && npm run dev`

2. **CORS issues**
   - Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
   - Default should be: `http://localhost:3000`

3. **MongoDB not connected**
   - Check MongoDB is running
   - Verify `MONGODB_URI` in `backend/.env`

4. **Network error**
   - Check browser console for errors
   - Verify `REACT_APP_API_URL` in `frontend/.env` is correct

### How to Debug:

1. **Open browser console** (F12)
2. **Check Network tab** when registering
3. **Look for the request to** `/api/auth/register`
4. **Check the response** - it will show the actual error

### Common Errors:

- **"Network Error"**: Backend not running or wrong API URL
- **"User already exists"**: Email already registered
- **"Validation error"**: Missing required fields or invalid data
- **"CORS error"**: Frontend URL mismatch in backend config

---

## Issue 2: No Fish Showing

### Possible Causes:

1. **Database is empty** (most likely)
   - No fish data has been added yet
   - Solution: Run the seed script

2. **Backend not running**
   - Fish API can't be reached
   - Start backend: `cd backend && npm run dev`

3. **API connection error**
   - Check `REACT_APP_API_URL` in `frontend/.env`
   - Check browser console for errors

### Solution: Add Sample Fish Data

**Option 1: Using Seed Script (Recommended)**
```bash
cd backend
npm run seed
```

**Option 2: Using MongoDB Shell**
```javascript
// Connect to MongoDB
use mach_lagbe

// Insert sample fish
db.fishes.insertMany([
  {
    name: "Hilsa (Ilish)",
    pricePerKg: 1200,
    category: "saltwater",
    stock: 50,
    description: "The national fish of Bangladesh",
    imageUrl: "/image/ilish.png",
    availability: "available",
    isActive: true
  },
  {
    name: "Rohu",
    pricePerKg: 300,
    category: "freshwater",
    stock: 100,
    description: "Freshwater carp",
    imageUrl: "/image/rui.png",
    availability: "available",
    isActive: true
  }
])
```

**Option 3: Using API (if you're logged in as admin)**
```bash
# First, get your token from login
# Then use it to create fish:
curl -X POST http://localhost:5000/api/fish \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hilsa (Ilish)",
    "pricePerKg": 1200,
    "category": "saltwater",
    "stock": 50,
    "description": "The national fish of Bangladesh",
    "imageUrl": "/image/ilish.png",
    "availability": "available"
  }'
```

---

## Quick Fixes

### 1. Check Backend is Running
```powershell
# Test backend health
Invoke-RestMethod -Uri "http://localhost:5000/api/health"
```

### 2. Check Frontend API URL
```powershell
# Verify frontend .env
Get-Content frontend\.env
# Should show: REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Check Browser Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for red error messages
- Go to Network tab to see API requests

### 4. Restart Everything
```powershell
# Stop backend (Ctrl+C)
# Stop frontend (Ctrl+C)

# Restart backend
cd backend
npm run dev

# Restart frontend (new terminal)
cd frontend
npm start
```

---

## Step-by-Step Debugging

### For Registration Issue:

1. **Check backend logs** when you try to register
   - Look for error messages in the terminal where backend is running

2. **Check browser console**
   - Open DevTools (F12)
   - Look for network errors or console errors

3. **Test API directly**
   ```powershell
   $body = @{
       name = "Test User"
       email = "test@example.com"
       password = "password123"
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
       -Method Post `
       -Body $body `
       -ContentType "application/json"
   ```

### For Fish Market Issue:

1. **Check if backend is running**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/fish"
   ```
   - Should return: `{"success":true,"count":0,"data":[]}` if empty
   - Should return fish array if data exists

2. **Add fish data**
   ```bash
   cd backend
   npm run seed
   ```

3. **Check browser console**
   - Look for API errors
   - Check Network tab for `/api/fish` request

---

## Still Having Issues?

1. **Clear browser cache and localStorage**
   ```javascript
   // In browser console
   localStorage.clear()
   location.reload()
   ```

2. **Check all environment variables**
   - Backend `.env` has all required variables
   - Frontend `.env` has `REACT_APP_API_URL`

3. **Verify MongoDB is running**
   ```powershell
   Get-Service MongoDB
   ```

4. **Check for port conflicts**
   - Backend: port 5000
   - Frontend: port 3000
   - MongoDB: port 27017

---

## Need More Help?

Check the error messages:
- **Backend terminal**: Shows server-side errors
- **Browser console**: Shows client-side errors
- **Network tab**: Shows API request/response details

