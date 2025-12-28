# Mach Lagbe - Setup Guide

## ✅ Completed Steps

All critical integration steps have been completed:

1. ✅ Environment variables setup (.env.example files created)
2. ✅ Backend middleware implemented (auth.js)
3. ✅ Backend controllers implemented (fishController.js)
4. ✅ Server.js refactored to use route files
5. ✅ API service layer created (api.js, authService.js, fishService.js)
6. ✅ Frontend AuthContext connected to backend
7. ✅ FishMarket connected to backend API
8. ✅ Data consistency fixed (id vs _id, image vs imageUrl)

## 🚀 Next Steps to Run the Application

### Step 1: Create Environment Files

**Backend (.env file):**
1. Navigate to `backend/` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   copy .env.example .env
   ```
3. Edit `.env` and update the values:
   ```
   MONGODB_URI=mongodb://localhost:27017/mach_lagbe
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   ```

**Frontend (.env file):**
1. Navigate to `frontend/` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cd frontend
   copy .env.example .env
   ```
3. The default value should work, but you can update if needed:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:
- If using local MongoDB: `mongod` (or start MongoDB service)
- If using MongoDB Atlas: Update `MONGODB_URI` in `.env` with your connection string

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```

The server should start on `http://localhost:5000`

### Step 5: Start the Frontend

Open a new terminal:
```bash
cd frontend
npm start
```

The frontend should start on `http://localhost:3000`

## 🧪 Testing the Integration

### Test Backend API

1. **Health Check:**
   - Visit: `http://localhost:5000/api/health`
   - Should return: `{"status":"OK",...}`

2. **Register a User:**
   - POST to: `http://localhost:5000/api/auth/register`
   - Body:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - First user will be admin automatically!

3. **Login:**
   - POST to: `http://localhost:5000/api/auth/login`
   - Body:
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

4. **Get Fish:**
   - GET: `http://localhost:5000/api/fish`
   - Should return empty array initially (no fish in database)

### Test Frontend

1. **Register/Login:**
   - Go to `http://localhost:3000/register`
   - Create an account
   - Should redirect and show you're logged in

2. **Fish Market:**
   - Go to `http://localhost:3000/market`
   - Should show loading, then empty state (no fish yet)
   - To add fish, you need to use the admin API or create an admin panel

## 📝 Adding Fish Data

Since there's no admin panel yet, you can add fish using the API:

**Using curl or Postman:**
1. First, login as admin to get a token
2. POST to `http://localhost:5000/api/fish` with:
   ```json
   {
     "name": "Hilsa (Ilish)",
     "pricePerKg": 1200,
     "category": "saltwater",
     "stock": 50,
     "description": "The national fish of Bangladesh",
     "imageUrl": "/image/ilish.png",
     "availability": "available"
   }
   ```
3. Include header: `Authorization: Bearer YOUR_TOKEN`

**Or use MongoDB directly:**
```javascript
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

## 🔧 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Check if MongoDB is running
   - Verify `MONGODB_URI` in `.env`
   - Check MongoDB logs

2. **Port Already in Use:**
   - Change `PORT` in `.env`
   - Or kill the process using port 5000

3. **JWT Secret Error:**
   - Make sure `JWT_SECRET` is set in `.env`
   - Don't use the default "secret" in production!

### Frontend Issues

1. **API Connection Error:**
   - Check if backend is running
   - Verify `REACT_APP_API_URL` in `.env`
   - Check browser console for CORS errors

2. **CORS Errors:**
   - Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
   - Restart backend after changing `.env`

3. **Token Issues:**
   - Clear localStorage: `localStorage.clear()`
   - Try logging in again

## 📚 What Was Changed

### Backend Changes:
- ✅ Created `middleware/auth.js` with `protect` and `authorize` functions
- ✅ Implemented `controllers/fishController.js` with all CRUD operations
- ✅ Created `routes/auth.js` to use authController
- ✅ Refactored `server.js` to use route files instead of inline routes
- ✅ Updated CORS to use environment variable
- ✅ Fixed token generation to use `userId` consistently

### Frontend Changes:
- ✅ Created `services/api.js` with axios instance and interceptors
- ✅ Created `services/authService.js` for authentication
- ✅ Created `services/fishService.js` for fish operations
- ✅ Updated `AuthContext.jsx` to use real API instead of mocks
- ✅ Updated `FishMarket.js` to fetch from API
- ✅ Added loading and error states
- ✅ Created `LoadingSpinner` component
- ✅ Fixed data consistency (id vs _id, image vs imageUrl)

## 🎯 Next Features to Implement

1. **Admin Panel:**
   - Create/Edit/Delete fish from UI
   - View orders
   - Manage users

2. **Order System:**
   - Create Order model
   - Implement checkout flow
   - Order history

3. **Search & Filters:**
   - Search by name
   - Filter by category
   - Sort by price

4. **Image Upload:**
   - File upload for fish images
   - Image storage (local or cloud)

5. **User Profile:**
   - Edit profile
   - Change password
   - View order history

## 📞 Support

If you encounter any issues:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running
4. Check that both frontend and backend are running

Good luck with your Mach Lagbe project! 🐟



