const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Mock Data for fallback
const MOCK_PRODUCTS = [
    {
        _id: '1',
        name: 'Glacial Pure 250ml',
        description: 'Pocket-sized purity. Sourced from Himalayan springs.',
        price: 15,
        size: '250ml',
        image: '/images/glacial_500ml.png',
        category: 'water'
    },
    {
        _id: '4',
        name: 'Pocket Luxury 500ml',
        description: 'The essence of hydration. Perfect for quick refreshment.',
        price: 25,
        size: '500ml',
        image: '/images/pocket_250ml.png',
        category: 'water'
    },
    {
        _id: '2',
        name: 'Crystal Clear 1L',
        description: 'Perfect for your daily hydration needs.',
        price: 35,
        size: '1L',
        image: '/images/crystal_1l.png',
        category: 'water'
    },
    {
        _id: '3',
        name: 'Family Reserve 20L',
        description: 'The standard for household purity. Bisleri-style large jar.',
        price: 90,
        size: '20L',
        image: '/images/family_20l.png',
        category: 'water'
    }
];

const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Middleware helper (simplified version of auth for api.js)
const authParams = (req, res, next) => {
    // Check header first
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'secret_key_change_me');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// GET /api/products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.json(MOCK_PRODUCTS);
        }
        res.json(products);
    } catch (err) {
        // If DB fails, return mock data
        console.log('Serving mock data due to DB error');
        res.json(MOCK_PRODUCTS);
    }
});

// GET /api/orders - Fetch user orders
router.get('/orders', authParams, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/orders (Simulate order placement)
router.post('/orders', authParams, async (req, res) => {
    const { cart, totalAmount, shippingAddress, paymentMethod } = req.body;

    try {
        const newOrder = new Order({
            user: req.user.id,
            items: cart.map(item => ({
                product: item._id, // Assuming cart item has _id
                name: item.name,
                quantity: item.qty || 1, // Handle quantity if present
                price: item.price
            })),
            totalAmount,
            shippingAddress: shippingAddress || { address: 'Default Address' }, // Fallback for now
            paymentMethod: paymentMethod || 'COD'
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
