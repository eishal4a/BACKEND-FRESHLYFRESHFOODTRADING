const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const app = express();
app.use('/api/products', productRoutes);

const uri = "mongodb+srv://eishal:06GOlwR88yoOn6GP@cluster0.pldez3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('🚀 Backend is running and ready!');
});

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use('/api/products', productRoutes);

// ✅ Test Route to Confirm MongoDB is Working
const TestSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model('Test', TestSchema);

app.get('/api/test-db', async (req, res) => {
  try {
    const test = new TestModel({ name: 'MongoDB is working' });
    const saved = await test.save();
    res.json({ message: 'Saved to MongoDB!', data: saved });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB connection failed', details: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
