
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const fishRoutes = require("./routes/fish");

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mach_lagbe");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Continue without database in development
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

// ==================== ROUTES ====================

// 1. Health Check
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to Mach Lagbe API!",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      auth_register: "POST /api/auth/register",
      auth_login: "POST /api/auth/login",
      fish: "GET /api/fish",
      fish_create: "POST /api/fish (admin)"
    }
  });
});

app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  
  res.json({ 
    status: "OK", 
    message: "Mach Lagbe API is running",
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Mount route files
app.use("/api/auth", authRoutes);
app.use("/api/fish", fishRoutes);

// ==================== ERROR HANDLING ====================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: "Route not found" 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
    console.log(`🔐 Auth endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/auth/register`);
    console.log(`   POST http://localhost:${PORT}/api/auth/login`);
    console.log(`🐟 Fish endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/fish`);
    console.log(`   POST http://localhost:${PORT}/api/fish (admin)`);
  });
};

startServer();
