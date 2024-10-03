// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment', async (req, res) => {
  try {
    const { amount, description } = req.body;

    // Create a PaymentIntent with the given amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description,
      payment_method_types: ['card'],
    });

    // Save payment info in the database (optional)
    const payment = new Payment({
      amount,
      currency: 'usd',
      description,
      paymentIntentId: paymentIntent.id,
      status: 'pending',
    });
    await payment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;
