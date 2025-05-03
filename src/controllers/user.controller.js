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

module.exports = {
  getAllUsersData,
  getUserDataById,
  updateProfile,
  deleteUser,
  makeAdmin,
};
