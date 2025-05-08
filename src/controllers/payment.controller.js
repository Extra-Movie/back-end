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

module.exports = {
  createPaymentIntent,
  addToCart,
};
