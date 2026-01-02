const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/premium_water';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to DB...');
        console.log('Clearing Users...');
        await User.deleteMany({});
        console.log('Clearing Products...');
        await Product.deleteMany({});
        console.log('All data cleared successfully!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
