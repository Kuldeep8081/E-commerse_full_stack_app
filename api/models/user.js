const mongoose = require('mongoose');

// Address sub-schema for better structure
const addressSchema = new mongoose.Schema({
  name: { type: String },
  mobileNo: { type: String },
  houseNo: { type: String },
  street: { type: String },
  landmark: { type: String },
  city: { type: String },
  country: { type: String },
  postalCode: { type: String }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: { type: String },
  addresses: [addressSchema], // Use the sub-schema for addresses
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
