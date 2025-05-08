const Transactions = require("../models/Transactions");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  console.log(" createPaymentIntent called by", req.userId);
  try {
    const { cartMovies: cart } = await User.findById(req.userId)
      .select({
        cartMovies: 1,
      })
      .populate({
        path: "cartMovies",
        select: "title price poster_path",
      });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.reduce((acc, movie) => acc + movie.price * 100, 0), // Convert to cents
      currency: "egp",
      automatic_payment_methods: { enabled: true },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

const paymentListener = async (req, res) => {
  console.log("paymentListener called");
  let event;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET.trim();

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(` Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    default:
      // handle other event types
      console.log(`Unhandled event type ${event.type}.`);
      break;
  }

  res.send(200);
};

const handlePaymentIntentSucceeded = async (paymentIntent) => {
  // Handle the successful payment intent here
  console.log("PaymentIntent succeeded:", paymentIntent);
  if (paymentIntent.status !== "succeeded") {
    console.log("PaymentIntent not succeeded:", paymentIntent);
    return;
  }
  // !? Get the userId from the metadata of the payment intent
  // ! make sure to set the userId in the metadata when creating the payment intent
  const userId = paymentIntent.metadata.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return;
    }
    // update the purchased movies in the user model
    // ! Needed to be changed after changing the schema of user model for the owned and cart
    user.ownedMovies.push(...user.cartMovies); // Assuming you have an ownedMovies field in the User model

    Transactions.create({
      userId: user._id,
      // ! needed to be changed to check for the movies and series
      purchased: {
        movies: user.cartMovies,
      },
      // ?Convert back to original amount
      amount: paymentIntent.amount_received / 100,
      status: "completed",
      paymentMethod: "stripe",
      TransactionId: paymentIntent.id,
    });

    // Clear the cart after successful payment
    user.cartMovies = [];
    await user.save();
    console.log("Cart cleared for user:", userId);

    await Transactions.create;
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

module.exports = {
  createPaymentIntent,
  paymentListener,
};
