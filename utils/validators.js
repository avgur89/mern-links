const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter a valid email')
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
    .trim()
    .isLength({ min: 6, max: 56 }),
];

exports.loginValidators = [
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter a valid email')
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
  body('password').custom(async (value, { req }) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!password) {
        return Promise.reject('Enter a password');
      }

      const passwordIsMatch = await bcrypt.compare(password, user.password);

      if (!passwordIsMatch) {
        return Promise.reject('Incorrect password. Please try again');
      }
    } catch (error) {
      console.log(error);
    }
  }),
];
