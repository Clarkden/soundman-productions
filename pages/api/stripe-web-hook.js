import { buffer } from "micro";
const Stripe = require('stripe');
import clientPromise from "../../lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};



const handler = async (req, res) => {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
            console.log('stripeEvent', stripeEvent);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ('checkout.session.completed' === stripeEvent.type) {
            const session = stripeEvent.data.object;
            console.log('payment success', session);
            // Do something here on payment success, like update order etc.        }

            let client = await clientPromise;
            const db = client.db("soundmanproductions");
            await db.collection('orders').insertOne(session);

            const purchaser = await db.collection('purchasers').findOne({email: session.metadata.email})
            if(purchaser != undefined){
                await db.collection('purchasers').updateOne({_id: purchaser._id}, {$push :{sounds: session.metadata.sound}})
            }else{
                await db.collection('purchasers').insertOne({email: session.metadata.email, sounds: [session.metadata.sound]})
            }

            res.json({ received: true });
        } else {
            res.setHeader("Allow", "POST");
            res.status(405).end("Method Not Allowed");
        }
    };
}

export default handler