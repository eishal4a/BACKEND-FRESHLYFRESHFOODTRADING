const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware FIRST
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes NEXT
const productRoutes = require("./routes/Product");
app.use('/api/products', productRoutes);

// MongoDB connect
const uri = "mongodb+srv://eishal:06GOlwR88yoOn6GP@cluster0.pldez3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get('/api/test-db', async (req, res) => {
  try {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    const test = new TestModel({ name: 'MongoDB is working' });
    const saved = await test.save();
    res.json({ message: 'Saved to MongoDB!', data: saved });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB connection failed', details: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running and ready!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
