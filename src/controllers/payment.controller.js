const Transactions = require("../models/Transactions");
const User = require("../models/User");
const Movie = require("../models/Movie");
const TVShow = require("../models/Tv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { cart: cart } = await User.findById(req.userId)
      .select({
        cart: 1,
      })
      .populate({
        path: "cart.item",
      });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.reduce(
        (acc, item) => item.item && acc + parseInt(item.item?.price) * 100,
        0
      ), // Convert to cents
      currency: "egp",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: req.userId,
        cartMovies: JSON.stringify(
          cart.map((movie) => movie.item && movie.item?._id)
        ),
      },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

const paymentListener = async (req, res) => {
  let event;
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

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
  if (paymentIntent.status !== "succeeded") {
    console.log("PaymentIntent not succeeded:", paymentIntent);
    throw new Error("PaymentIntent not succeeded");
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
    user.owned.push(...user.cart);
    const moviesID = [];
    const tvShowsID = [];
    user.cart.forEach((media) =>
      media.kind === "movies"
        ? moviesID.push(media.item._id)
        : tvShowsID.push(media.item._id)
    );
    await Movie.updateMany(
      { _id: { $in: moviesID } },
      { $inc: { number_of_purchases: 1 } }
    );
    await TVShow.updateMany(
      { _id: { $in: tvShowsID } },
      { $inc: { number_of_purchases: 1 } }
    );

    const newTransaction = new Transactions({
      userId: user._id,
      purchased: user.cart,
      // ?Convert back to original amount
      amount: paymentIntent.amount_received / 100,
      status: "completed",
      paymentMethod: "stripe",
      TransactionId: paymentIntent.id,
    });

    // Clear the cart after successful payment
    user.cart = [];
    await user.save();

    await newTransaction.save();
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

module.exports = {
  createPaymentIntent,
  paymentListener,
};
