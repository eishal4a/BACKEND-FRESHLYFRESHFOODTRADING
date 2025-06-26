// scripts/seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample product data
const products = [
  {
    name: 'Fresh Apple',
    price: 3.5,
    category: 'fruits',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Chicken Breast',
    price: 7.0,
    category: 'meat',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Carrot',
    price: 2.0,
    category: 'vegetables',
    image: 'https://via.placeholder.com/150',
  },
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Product data seeded!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

seed();
