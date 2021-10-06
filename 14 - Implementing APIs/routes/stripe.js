const router = require('express').Router();
const path = require('path');
const stripe = require('stripe')("sk_test_51JgRfHSEhwGPg20b4tB1cdt3NlPgona5hqYtQA9XiGO563JkHaQBBEKZKP5zuGVL5oxCQPH40F5wHnhGjRvbvZ1K0092YsD8t3");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/payment.html"));
});

router.post('/payment', async (req, res) => {
    console.log(req.body);
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                amount: req.body.price * 100,
                name: "Shopping",
                currency: "usd",
                quantity: 1
            }],
            payment_method_types: ["card"],
            success_url: `${req.headers.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}?cancelled=true`
        });
        console.log(session);

        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;