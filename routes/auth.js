const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // your Mongoose User model

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // ← This is where it goes!

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword, // store hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
