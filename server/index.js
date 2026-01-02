require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/premium_water';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Active DB:', MONGODB_URI.includes('localhost') || MONGODB_URI.includes('127.0.0.1') ? 'Local (Compass)' : 'Cloud (Atlas)');
  })
  .catch(err => {
    console.warn('MongoDB Connection Failed:', err.message);
    console.warn('Running in disconnected mode. content may be limited.');
  });

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Premium Water API is Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
