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
    amount: amount * 100, 
    currency: "INR",
    receipt: "receipt_order_74394"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); 
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Error creating order" }); 
  }
});

module.exports = router;
