const { body } = require('express-validator');
const User = require('../models/User');

exports.registerValidators = [
  body('email')
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
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('firstname')
    .isLength({ min: 2 })
    .withMessage('Firstname must be at least 2 characters long')
    .trim(),
  body('lastname')
    .isLength({ min: 2 })
    .withMessage('Firstname must be at least 2 characters long')
    .trim(),
];

exports.loginValidators = [
  body('email')
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
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
];
