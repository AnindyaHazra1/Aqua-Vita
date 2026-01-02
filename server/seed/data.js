const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/premium_water';

const products = [
    {
        name: 'Glacial Pure 500ml',
        description: 'Pocket-sized purity. Sourced from Himalayan springs.',
        price: 20,
        size: '500ml',
        image: 'https://images.unsplash.com/photo-1616118132534-381148898bb8?auto=format&fit=crop&q=80&w=1000',
        category: 'water'
    },
    {
        name: 'Crystal Clear 1L',
        description: 'Perfect for your daily hydration needs.',
        price: 35,
        size: '1L',
        image: 'https://images.unsplash.com/photo-1602143407151-11115cdbf6e0?auto=format&fit=crop&q=80&w=1000',
        category: 'water'
    },
    {
        name: 'Family Reserve 20L',
        description: 'The standard for household purity. Bisleri-style large jar.',
        price: 90,
        size: '20L',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000',
        category: 'water'
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to DB...');
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Data seeded!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
