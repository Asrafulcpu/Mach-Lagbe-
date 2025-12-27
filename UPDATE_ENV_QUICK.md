# Quick Guide: How to Update JWT_SECRET

## Method 1: Using Notepad (Easiest)

1. **Navigate to** `backend` folder
2. **Right-click** on `.env` file
3. **Select** "Open with" → "Notepad"
4. **Find** this line:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```
5. **Replace** with a strong secret (see below for generated one)
6. **Save** the file (Ctrl+S)
7. **Close** Notepad

## Method 2: Using VS Code

1. **Open VS Code**
2. **File** → **Open Folder** → Select `backend` folder
3. **Click** on `.env` file in the file explorer
4. **Find** the JWT_SECRET line
5. **Edit** and save (Ctrl+S)

## Method 3: Using PowerShell (Advanced)

```powershell
# Navigate to backend folder
cd C:\EMU8086\MySource\mach-lagbe\backend

# Generate a new secret
$secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})

# Update the .env file (replaces the JWT_SECRET line)
(Get-Content .env) -replace 'JWT_SECRET=.*', "JWT_SECRET=$secret" | Set-Content .env

Write-Host "JWT_SECRET updated successfully!" -ForegroundColor Green
```

## What to Replace

**Find this:**
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Replace with (example):**
```
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F2G3H4
```

**Important:**
- Use a long random string (at least 32 characters, preferably 64+)
- Don't use spaces
- Don't use quotes around the value
- Make sure there's no space before or after the `=` sign

## After Updating

**Restart your backend server:**
1. Stop the server (press Ctrl+C in the terminal)
2. Start it again: `npm run dev`

## Verify It Works

After updating and restarting:
1. Try to register a new user
2. If you get a token back, it's working! ✅

## Need a Secret Right Now?

Run this in PowerShell to generate one:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

Copy the output and paste it after `JWT_SECRET=` in your `.env` file.

