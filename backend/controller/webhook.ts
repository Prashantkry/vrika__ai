import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import Stripe from "stripe";
require("dotenv").config();

const stripeKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(stripeKey);
const uri = process.env.mongoUrl as string;

interface WebhookEvent {
  type: string;
  data: {
    object: any;
  };
}

// ! Function to create a Stripe checkout session
export const createCheckoutSession = async (req: Request, res: Response) => {
  console.log("createCheckoutSession triggered");
  const { email, plan } = req.body;
  // console.log("email -> ", email, "plan -> ", plan);
  let priceId:string;
  if (plan === 'monthly') {
    priceId = 'price_1Q6ANPSJEnIMxOJps2DlOaHy'; 
  } else {
    priceId = 'price_1Q6AQBSJEnIMxOJpjOikgzjW'; 
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      // client_reference_id: email, 
      customer_email: email,
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    // Respond with the checkout URL to the frontend
    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session", err);
    res.status(500).send("Internal Server Error");
  }
};

// ! Webhook for Stripe
export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  console.log("webhook triggered");

  const WebhookEvent: WebhookEvent = req.body;

  switch (WebhookEvent.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = WebhookEvent.data.object;
      console.log("PaymentIntent was successful!", paymentIntentSucceeded);
      break;

    case "checkout.session.completed":
      console.log("Checkout Session Completed");
      const checkOutCompleteData = WebhookEvent.data.object;
      // console.log("checkOutCompleteData -> ", checkOutCompleteData);
      const checkOutCompleteId = checkOutCompleteData.id;

      // const client_reference_id = checkOutCompleteData.client_reference_id;
      // console.log("client_reference_id -> ", client_reference_id);

      const customer_email = checkOutCompleteData.customer_email;

      const customerId = checkOutCompleteData.customer;
      // console.log("customerId -> ", customerId);

      const subscriptionId = checkOutCompleteData.subscription;
      // console.log("subscriptionId -> ", subscriptionId);

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      // console.log("Subscriptions Details => ", subscription)

      const lineItems = await stripe.checkout.sessions.listLineItems(checkOutCompleteId);
      // console.log("Line Items => ", lineItems)

      const client = new MongoClient(uri);
      await client.connect();

      try {
        const subscriptionCollection = client
          .db("VrikaAI")
          .collection("signUpData")

        const userCollection = client.db("VrikaAI").collection("signUpData");

        const updateFilter = { email: customer_email };
        // console.log("updateFilter", updateFilter);

        const iterationPeriod = lineItems.data[0]?.price?.recurring?.interval;

        // let startDate = subscription.current_period_start;
        let endDate = subscription.current_period_end;
        // const purchaseDate = new Date(startDate * 1000).toISOString();
        const expiryDate = new Date(endDate * 1000).toISOString();
        // let amount = subscription.items.data[0].plan.amount;

        let updateData: any;

        if (iterationPeriod === "month") {
          updateData = {
            $set: {
              plan: lineItems.data[0].description,
              credits: 499,
              customerId: customerId,
              planExpire:expiryDate
            },
          };
        } else if (iterationPeriod === "year") {
          updateData = {
            $set: {
              plan: lineItems.data[0].description,
              credits: 499,
              customerId: customerId,
              planExpire:expiryDate
            },
          };
        } else {
          throw new Error("Invalid iteration period for subscription.");
        }

        if (updateData) {
          const updatedData = await userCollection.updateOne(updateFilter, updateData);
          // console.log("updatedData => ", updatedData);
        } else {
          console.log("No update data available.");
        }


      } finally {
        await client.close();
      }
      break;

    default:
      console.log(`Unhandled event type ${WebhookEvent.type}`);
  }

  res.send();
};
