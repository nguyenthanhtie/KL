const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add COOP headers to prevent popup blocking
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  next();
});

// Database connection: use env URI if provided, otherwise fallback.
const rawUri = process.env.MONGODB_URI;
let MONGODB_URI = rawUri || defaultUri;

// If an env URI is provided but lacks a DB name, insert '/doan' before any query string.
if (rawUri && !/mongodb\.net\/[^\/?]+/.test(rawUri)) {
  MONGODB_URI = rawUri.replace(/(mongodb:\/\/[^\/]+|mongodb\+srv:\/\/[^\/]+)(?:\/?)([^?]*)(\?.*)?/, (m, host, path, query) => {
    return `${host}/doan${query || ''}`;
  });
}

// Set mongoose options
mongoose.set('strictQuery', false);
mongoose.set('bufferTimeoutMS', 30000); // Increase buffer timeout to 30 seconds

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of default 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => {
    console.log('✓ Connected to MongoDB');
    console.log('✓ Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('⚠️  Please check:');
    console.error('   1. Your IP is whitelisted in MongoDB Atlas Network Access');
    console.error('   2. Your credentials are correct');
    console.error('   3. Your cluster is running');
    process.exit(1); // Exit if cannot connect to database
  });

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Routes
app.use('/api/auth', require('./routes/auth.cjs'));
app.use('/api/users', require('./routes/users.cjs'));
app.use('/api/lessons', require('./routes/lessons.cjs'));
app.use('/api/challenges', require('./routes/challenges.cjs'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
