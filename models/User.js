const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [
    {
      type: Types.ObjectId,
      ref: 'Link',
    },
  ],
});

module.exports = model('User', userSchema);
