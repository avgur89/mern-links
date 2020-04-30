const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
  body('email', 'Enter a valid email')
    .normalizeEmail()
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject('Email is already exists');
        }
      } catch (error) {
        console.log(error);
      }
    }),
  body('password', 'Password must be at least 6 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('firstname', 'First name must be at least 2 characters long')
    .isLength({ min: 2 })
    .trim(),
  body('lastname', 'Last name must be at least 2 characters long')
    .isLength({ min: 2 })
    .trim(),
];

exports.loginValidators = [
  body('email', 'Enter a valid email')
    .normalizeEmail()
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("User with this email doesn't exists");
        }
      } catch (error) {
        console.log(error);
      }
    }),
  body('password', 'Enter a password')
    .isAlphanumeric()
    .trim()
    .exists()
    .custom(async (value, { req }) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const passwordIsMatch = await bcrypt.compare(password, user.password);

        if (!passwordIsMatch) {
          return Promise.reject('Incorrect password. Please try again');
        }
      } catch (error) {
        console.log(error);
      }
    }),
];
