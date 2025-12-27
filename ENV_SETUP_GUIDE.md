# How to Update .env Files - Step by Step Guide

## 📝 Quick Guide to Update Environment Variables

### Step 1: Locate the .env Files

You have two `.env` files to configure:
- `backend/.env` - Backend server configuration
- `frontend/.env` - Frontend React app configuration

### Step 2: Open and Edit the Files

You can edit these files using:
- **Notepad** (Windows default)
- **VS Code** (recommended)
- **Any text editor**

---

## 🔐 Backend .env File (`backend/.env`)

### Current Content:
```
MONGODB_URI=mongodb://localhost:27017/mach_lagbe
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### How to Update JWT_SECRET:

1. **Open** `backend/.env` in a text editor
2. **Find** the line: `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`
3. **Replace** with a strong random string, for example:
   ```
   JWT_SECRET=my-super-secret-key-12345-abcdef-67890-xyz
   ```

### 🔑 Generating a Strong JWT Secret

**Option 1: Use an Online Generator**
- Visit: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Keys" (64 characters)
- Use it as your JWT_SECRET

**Option 2: Use PowerShell (Windows)**
```powershell
# Generate a random 64-character string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Option 3: Use Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Other Backend Variables:

- **MONGODB_URI**: 
  - Local MongoDB: `mongodb://localhost:27017/mach_lagbe`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mach_lagbe`
  
- **PORT**: 
  - Default: `5000`
  - Change if port 5000 is already in use

- **NODE_ENV**: 
  - Development: `development`
  - Production: `production`

- **FRONTEND_URL**: 
  - Default: `http://localhost:3000`
  - Change if your frontend runs on a different port

---

## 🌐 Frontend .env File (`frontend/.env`)

### Current Content:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### When to Update:

- **If backend runs on different port**: Change `5000` to your port
- **If using production backend**: Change to your production API URL
  ```
  REACT_APP_API_URL=https://api.yourdomain.com/api
  ```

**Note:** Frontend environment variables must start with `REACT_APP_` to be accessible in React!

---

## ✅ Quick Update Steps

### For JWT_SECRET (Most Important):

1. Open `backend/.env`
2. Find: `JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`
3. Replace with: `JWT_SECRET=your-actual-secret-key-here`
4. Save the file
5. **Restart your backend server** for changes to take effect

### Example of Updated Backend .env:

```
MONGODB_URI=mongodb://localhost:27017/mach_lagbe
PORT=5000
NODE_ENV=development
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
FRONTEND_URL=http://localhost:3000
```

---

## 🚨 Security Notes

1. **Never commit .env files to Git** - They're already in `.gitignore`
2. **Use different JWT_SECRET for production** - Don't use the same key
3. **Keep JWT_SECRET secret** - Don't share it publicly
4. **Use strong random strings** - At least 32 characters, preferably 64+

---

## 🔄 After Making Changes

1. **Backend changes**: Restart the backend server
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   cd backend
   npm run dev
   ```

2. **Frontend changes**: Restart the React app
   ```bash
   # Stop the app (Ctrl+C)
   # Then restart:
   cd frontend
   npm start
   ```

---

## 📋 Checklist

- [ ] Created `backend/.env` file
- [ ] Created `frontend/.env` file
- [ ] Updated `JWT_SECRET` with a strong random string
- [ ] Verified `MONGODB_URI` is correct
- [ ] Verified `REACT_APP_API_URL` matches backend port
- [ ] Restarted servers after changes

---

## 💡 Pro Tip

You can test if your JWT_SECRET is working by:
1. Starting the backend
2. Registering a new user
3. If you get a token back, JWT_SECRET is working! ✅

If you see errors about JWT, check that:
- JWT_SECRET is set in `.env`
- No extra spaces around the `=` sign
- The file is saved correctly

---

Need help? Check the main `SETUP_GUIDE.md` for more details!

