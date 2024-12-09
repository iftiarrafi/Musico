import Stripe from 'stripe'
const stripe = Stripe(process.env.stripe_secret_key);


const createCheckoutSession = async (req, res) => {
    const { eventId, price } = req.body;

    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Event Ticket - ${eventId}`,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:3000/user/dashboard/success/${eventId}`,
            cancel_url: "http://localhost:3000/ok/events",
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to create Stripe session" });
    }
};

export default createCheckoutSession