
const mongoose = require('mongoose');
const Product = require('./models/products'); // adjust the path as needed

mongoose.connect('your_mongo_connection_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const updates = [
  {
    name: 'Fresh Chicken',
    shortDescription: 'Premium quality farm-raised chicken.',
    longDescription: 'Our farm-raised chicken is cleaned, trimmed, and packed hygienically. Perfect for curries, grilling, or roasting.',
  },
  {
    name: 'Fresh Mutton (Bone-In)',
    shortDescription: 'Juicy, bone-in mutton perfect for curry.',
    longDescription: 'High-quality goat mutton with bones. Rich in flavor, ideal for traditional stews and slow cooking.',
  },
  {
    name: 'Lamb Chops',
    shortDescription: 'Tender cuts ideal for grilling.',
    longDescription: 'Succulent lamb chops perfect for BBQs or pan-searing. Sourced fresh and trimmed for tenderness.',
  },
  // ... Add remaining product descriptions here
];

async function updateProducts() {
  for (let item of updates) {
    await Product.findOneAndUpdate(
      { name: item.name },
      {
        $set: {
          shortDescription: item.shortDescription,
          longDescription: item.longDescription,
        }
      },
      { new: true }
    );
  }

  console.log('✅ Descriptions updated');
  mongoose.disconnect();
}

updateProducts();
