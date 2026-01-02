const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mobile: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', ''],
        default: ''
    },
    addresses: [{
        name: String,
        mobile: String,
        pincode: String,
        locality: String,
        address: String,
        city: String,
        state: String,
        landmark: String,
        alternateMobile: String,
        addressType: { type: String, enum: ['Home', 'Work'] }
    }],
    savedCards: [{
        cardNumber: String, // Masked or encrypted in real app
        holderName: String,
        expiry: String,
        cardType: String // e.g., 'Visa', 'MasterCard'
    }],
    upiIds: [{
        vpa: String, // Virtual Payment Address
        bankName: String
    }],
    giftCards: [{
        code: String,
        pin: String,
        balance: Number,
        expiry: Date
    }],
    coupons: [{
        code: String,
        description: String,
        discountAmount: Number,
        expiry: Date,
        isActive: { type: Boolean, default: true }
    }],
    reviews: [{
        productId: String,
        productName: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    notifications: [{
        title: String,
        message: String,
        date: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false }
    }],
    wishlist: [{
        productId: String,
        name: String,
        price: Number,
        image: String
    }],
    cart: [{
        productId: String, // Renamed from _id to avoid conflicts
        name: String,
        price: Number,
        image: String,
        size: String,
        quantity: { type: Number, default: 1 }
    }]
});

module.exports = mongoose.model('User', UserSchema);
