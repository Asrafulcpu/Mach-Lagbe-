const mongoose = require('mongoose');
require('dotenv').config();
const Fish = require('../models/Fish');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mach_lagbe');
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Sample fish data
const sampleFish = [
  {
    name: 'Hilsa (Ilish)',
    pricePerKg: 1200,
    category: 'saltwater',
    stock: 50,
    description: 'The national fish of Bangladesh, known for its unique taste',
    imageUrl: '/image/ilish.png',
    availability: 'available',
    isActive: true
  },
  {
    name: 'Rohu',
    pricePerKg: 300,
    category: 'freshwater',
    stock: 100,
    description: 'Freshwater carp, very popular in Bengali cuisine',
    imageUrl: '/image/rui.png',
    availability: 'available',
    isActive: true
  },
  {
    name: 'Katla',
    pricePerKg: 350,
    category: 'freshwater',
    stock: 80,
    description: 'Indian carp, known for its large size and tasty meat',
    imageUrl: '/image/katla.jpg',
    availability: 'available',
    isActive: true
  },
  {
    name: 'Pangas',
    pricePerKg: 250,
    category: 'freshwater',
    stock: 120,
    description: 'Catfish variety, affordable and widely available',
    imageUrl: '/image/pangash.png',
    availability: 'available',
    isActive: true
  },
  {
    name: 'Tilapia',
    pricePerKg: 280,
    category: 'freshwater',
    stock: 90,
    description: 'Mild-tasting freshwater fish, easy to cook',
    imageUrl: '/image/tilapia.webp',
    availability: 'available',
    isActive: true
  },
  {
    name: 'Shrimp (Chingri)',
    pricePerKg: 800,
    category: 'shellfish',
    stock: 40,
    description: 'Fresh sea shrimp, perfect for curries',
    imageUrl: '/image/chingri.png',
    availability: 'available',
    isActive: true
  }
];

// Seed the database
const seedFish = async () => {
  try {
    await connectDB();
    
    // Clear existing fish (optional - comment out if you want to keep existing data)
    // await Fish.deleteMany({});
    // console.log('🗑️  Cleared existing fish');
    
    // Check if fish already exist
    const existingFish = await Fish.find({});
    if (existingFish.length > 0) {
      console.log(`ℹ️  Found ${existingFish.length} existing fish in database`);
      console.log('   Skipping seed. To re-seed, delete existing fish first.');
      process.exit(0);
    }
    
    // Insert sample fish
    const insertedFish = await Fish.insertMany(sampleFish);
    console.log(`✅ Successfully seeded ${insertedFish.length} fish:`);
    insertedFish.forEach(fish => {
      console.log(`   - ${fish.name} (৳${fish.pricePerKg}/kg)`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding fish:', error);
    process.exit(1);
  }
};

// Run the seed function
seedFish();



