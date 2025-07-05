// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String, required: true }, // URL or relative path
  description: { type: String, required: true },
  category: { type: String, enum: ['meat', 'fruit'], required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
