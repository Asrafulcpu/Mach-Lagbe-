# How to Start MongoDB - Complete Guide

## 🔍 First, Check if MongoDB is Running

Run this command to check:
```powershell
Get-Process -Name mongod -ErrorAction SilentlyContinue
```

If you see output, MongoDB is already running! ✅

---

## 🚀 Method 1: MongoDB as Windows Service (Easiest)

If MongoDB is installed as a Windows service, this is the easiest way:

### Start MongoDB Service:

**Option A: Using PowerShell (Run as Administrator)**
```powershell
# Start MongoDB service
Start-Service MongoDB

# Check status
Get-Service MongoDB
```

**Option B: Using Services Window**
1. Press `Win + R`
2. Type: `services.msc` and press Enter
3. Find **"MongoDB"** in the list
4. Right-click → **Start**
5. (Optional) Right-click → **Properties** → Set "Startup type" to **Automatic** (starts on boot)

**Option C: Using Command Prompt (as Administrator)**
```cmd
net start MongoDB
```

---

## 🛠️ Method 2: Start MongoDB Manually

If MongoDB is installed but not as a service:

### Step 1: Create Data Directory
```powershell
# Create the data directory (if it doesn't exist)
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

### Step 2: Start MongoDB Server
```powershell
# Navigate to MongoDB bin directory (adjust path if different)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
.\mongod.exe
```

**Common MongoDB Installation Paths:**
- `C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe`
- `C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe`
- `C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe`

---

## ☁️ Method 3: Using MongoDB Atlas (Cloud - No Installation Needed)

If you don't have MongoDB installed locally, you can use MongoDB Atlas (free tier available):

1. **Sign up** at: https://www.mongodb.com/cloud/atlas
2. **Create a free cluster**
3. **Get connection string** from Atlas dashboard
4. **Update your `backend/.env`**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mach_lagbe
   ```

**Advantages:**
- No installation needed
- Free tier available
- Accessible from anywhere
- Automatic backups

---

## 📥 Method 4: Install MongoDB (If Not Installed)

### Option A: Install MongoDB Community Edition

1. **Download** from: https://www.mongodb.com/try/download/community
2. **Run installer** and follow the setup wizard
3. **Choose "Install MongoDB as a Service"** during installation
4. **After installation**, MongoDB will start automatically

### Option B: Install via Chocolatey (if you have it)
```powershell
choco install mongodb
```

### Option C: Use MongoDB via Docker
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## ✅ Verify MongoDB is Running

### Check 1: Process Check
```powershell
Get-Process -Name mongod -ErrorAction SilentlyContinue
```

### Check 2: Port Check
```powershell
netstat -an | findstr "27017"
```
If you see `LISTENING` on port 27017, MongoDB is running!

### Check 3: Connect Test
```powershell
# Try to connect (if mongo shell is installed)
mongo --eval "db.version()"
```

Or test from your Node.js app:
```javascript
// This should work if MongoDB is running
mongoose.connect('mongodb://localhost:27017/mach_lagbe')
```

---

## 🔧 Troubleshooting

### Problem: "MongoDB service not found"
**Solution:** MongoDB might not be installed as a service. Use Method 2 (manual start) or install it.

### Problem: "Port 27017 already in use"
**Solution:** Another MongoDB instance might be running. Check:
```powershell
Get-Process -Name mongod
# If found, it's already running!
```

### Problem: "Access denied"
**Solution:** Run PowerShell/Command Prompt as Administrator

### Problem: "Cannot find mongod.exe"
**Solution:** 
1. Find MongoDB installation path
2. Add it to your PATH environment variable
3. Or use full path: `"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"`

### Problem: "Data directory not found"
**Solution:** Create the data directory:
```powershell
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

---

## 🎯 Quick Start Commands

### Start MongoDB Service (if installed as service):
```powershell
Start-Service MongoDB
```

### Start MongoDB Manually:
```powershell
# Adjust path to your MongoDB installation
& "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

### Check if Running:
```powershell
Get-Process -Name mongod -ErrorAction SilentlyContinue
```

### Stop MongoDB:
```powershell
# If running as service
Stop-Service MongoDB

# If running manually
Stop-Process -Name mongod
```

---

## 📋 Recommended Setup

**For Development:**
1. Install MongoDB Community Edition
2. Install as Windows Service
3. Set to start automatically
4. Use default port 27017

**For Quick Testing:**
- Use MongoDB Atlas (cloud) - no installation needed!

---

## 🚀 After Starting MongoDB

1. **Verify it's running** (use commands above)
2. **Start your backend server**:
   ```powershell
   cd backend
   npm run dev
   ```
3. **Check backend logs** - you should see:
   ```
   ✅ MongoDB connected successfully
   ```

If you see that message, everything is working! 🎉

---

## 💡 Pro Tip

Create a batch file to start MongoDB easily:

**Create `start-mongodb.bat`:**
```batch
@echo off
echo Starting MongoDB...
net start MongoDB
echo MongoDB started!
pause
```

Double-click the file to start MongoDB anytime!

---

Need more help? Check MongoDB documentation: https://docs.mongodb.com/manual/installation/



