import { getSession } from 'next-auth/react';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {

  const activeSession = await getSession({ req })

  if (activeSession) {

    const { item } = req.body;

    const redirectURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://soundman-productions.vercel.app/';

    const transformedItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          images: [item.image],
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      description: item.description,
      quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [transformedItem],
      mode: 'payment',
      success_url: redirectURL + '?status=success',
      cancel_url: redirectURL + '?status=cancel',
      metadata: {
        name: activeSession.user.name,
        email: activeSession.user.email,
        sound: item.id
      },
      client_reference_id: activeSession.user.email
    });
    
    res.json({ id: session.id });
  }
  else
    res.status(401).json({message: "Not signed in"})
}

export default CreateStripeSession;