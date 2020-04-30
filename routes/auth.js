const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { validationResult } = require('express-validator');
const { registerValidators, loginValidators } = require('../utils/validators');
const User = require('../models/User');

// @desc    Create new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidators, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data',
      });
    }

    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidators, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect login data',
      });
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
