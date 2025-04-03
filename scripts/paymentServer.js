const express = require('express');
const stripe = require('stripe')('sk_test_YourSecretKey'); // Replace with your Stripe Secret Key
const app = express();

app.use(express.json());
app.use(express.static('.')); // Serve static files like index.html

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents (e.g., 1000 = €10)
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
            transfer_data: {
                destination: 'acct_YourStripeConnectedAccount', // Optional: For direct payout setup later
            },
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));