const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    size: { type: String, required: true }, // e.g., "500ml", "1L", "20L"
    image: String,
    category: { type: String, default: 'water' }, // water, dispenser, accessories
    stock: { type: Number, default: 100 }
});

module.exports = mongoose.model('Product', productSchema);
