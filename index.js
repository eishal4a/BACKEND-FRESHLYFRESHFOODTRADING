const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(cors({
  origin: [
  "*",
  "https://e-commerce-website-git-main-ash-d0707d97.vercel.app"
],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


const uri = "mongodb+srv://eishal:06GOlwR88yoOn6GP@cluster0.pldez3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const paymentRoutes = require("./routes/Payment");
app.use("/api/payment", paymentRoutes);

const productRoutes = require("./routes/Product");
app.use('/api/products', productRoutes);

/*app.get('/api/test-db', async (req, res) => {
  try {
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    const test = new TestModel({ name: 'MongoDB is working' });
    const saved = await test.save();
    res.json({ message: 'Saved to MongoDB!', data: saved });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB connection failed', details: err.message });
  }
});*/
console.log("✅ index.js started running");

process.on('uncaughtException', (err) => {
  console.error("💥 Uncaught Exception:", err);
});
app.get('/', (req, res) => {
  res.status(200).send('✅ Backend is alive and running!');
});
const PORT = process.env.PORT || 5000;


console.log("⚡ Trying to start server on port", PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
