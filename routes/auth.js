const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { validationResult } = require('express-validator');
const { registerValidators, loginValidators } = require('../utils/validators');
const User = require('../models/User');

// @desc    Create new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidators, async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidators, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
