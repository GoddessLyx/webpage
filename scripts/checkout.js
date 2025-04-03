const stripe = Stripe('pk_test_YourPublishableKey'); // Replace with your Stripe Publishable Key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) })
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
    });

    if (result.error) {
        document.getElementById('error-message').textContent = result.error.message;
    } else {
        alert('Thank you for your gift to Goddess Lyx!');
    }
});