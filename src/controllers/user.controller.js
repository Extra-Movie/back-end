const User = require("../models/User");

const getAllUsersData = async (req, res) => {
  const allUsersData = await User.find().select(
    "-password -__v -createdAt -updatedAt"
  );
  if (!allUsersData) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json({ usersData: allUsersData });
};

const getUserDataById = async (req, res) => {
  const { id } = req.params;
  const userData = await User.findById(id).select(
    "-password -__v -createdAt -updatedAt"
  );
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ userData });
};

const updateProfile = async (req, res) => {
  const tokenId = req.userId;
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (tokenId !== id) {
    return res.status(403).json({ message: "You are not authorized" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  const tokenId = req.userId;
  const { id } = req.params;
  const isAdmin = req.isAdmin;
  //user can delete his own account
  //admin can delete any normal account
  //admin can not delete any admin account
  if (tokenId === id) {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  }
  if (isAdmin) {
    const deletedUser = await User.findById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (deletedUser.isAdmin === true) {
      return res.status(403).json({ message: "You are not authorized" });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  }
  return res.status(403).json({ message: "You are not authorized" });
};

const makeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { isAdmin: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
};
const addToWatchlist = async (req, res) => {
  const userId = req.userId;
  const { itemId, kind } = req.body; // item -->kind (tvshows,movies)

  if (!["movies", "tvShows"].includes(kind)) {
    return res.status(400).json({ message: "Invalid kind try enter tvShows or movies" });
  }

  try {
    const user = await User.findById(userId);
    const existsInWatchList = user.watchlist.some(
      (data) => data.item.toString() === itemId && data.kind === kind);

    if (existsInWatchList) {
      return res.status(400).json({ message: "It's in watchlist" });
    }

    // user.watchlist.push({ item: itemId, kind });
    user.watchlist.push({
      item: req.body.item,
      kind: req.body.kind,
    });
    await user.save();

    res.status(200).json({ message: "Added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const getWatchlist = async (req, res) => {
  const userId = req.userId;
  console.log("id of user ",req.userId);
  try {
    const user = await User.findById(userId).populate('watchlist.item');
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getCardsItems = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate('cart.item');
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const addToCart = async (req, res) => {
  const userId = req.userId;
  const { itemId, kind } = req.body; // item -->kind (tvShows,movies)

  if (!["movies", "tvShows"].includes(kind)) {
    return res.status(400).json({ message: "Invalid kind try enter tvShows or movies" });
  }

  try {
    const user = await User.findById(userId);
    const existsInCart = user.cart.some(
      (data) => data.item.toString() === itemId && data.kind === kind);

    if (existsInCart) {
      return res.status(400).json({ message: "It's in Cart" });
    }

    // user.cart.push({ item: itemId, kind });
    user.cart.push({
      item: req.body.item,
      kind: req.body.kind,
    });
    await user.save();

    res.status(200).json({ message: "Added to Cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const getOwned = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).populate('owned.item');
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ owned: user.owned });
  } catch (error) {
    console.error("Error in getOwned:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const addToOwned = async (req, res) => {
  const userId = req.userId;
  const { itemId, kind } = req.body; // item -->kind (tvShows,movies)

  if (!["movies", "tvShows"].includes(kind)) {
    return res.status(400).json({ message: "Invalid kind try enter tvShows or movies" });
  }

  try {
    const user = await User.findById(userId);
    const existsInOwned = user.owned.some(
      (data) => data.item.toString() === itemId && data.kind === kind);

    if (existsInOwned) {
      return res.status(400).json({ message: "It's in Owned" });
    }

    // user.owned.push({ item: itemId,kind: kind });
    user.owned.push({
      item: req.body.item,
      kind: req.body.kind,
    });
    console.log("Adding owned item:", req.body);
    console.log("Owned array after push:", user.owned);
    await user.save();

    res.status(200).json({ message: "Added to Owned", owned: user.owned });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  getAllUsersData,
  getUserDataById,
  updateProfile,
  deleteUser,
  makeAdmin,
  addToWatchlist,
  getWatchlist,
  getCardsItems,
  addToCart,
  getOwned,
  addToOwned
};
