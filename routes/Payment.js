const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});

router.post("/orders", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paisa
    currency: "INR",
    receipt: "receipt_order_74394"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // ✅ valid JSON
  } catch (err) {
    console.error("Error creating order:", err); // helpful for debugging
    res.status(500).json({ error: "Error creating order" }); // ✅ fixed
  }
});

module.exports = router;
