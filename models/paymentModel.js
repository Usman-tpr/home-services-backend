// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'usd',
  },
  description: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
