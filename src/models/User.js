const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      match: /^[a-zA-Z-_.]{3,}$/,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z][a-zA-Z0-9_.]{3,}@[a-zA-Z]{3,}.[a-zA-Z]{3,}$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    favoriteMovies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "movies",
      default: [],
    },
    ownedMovies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "movies",
      default: [],
    },
    cartMovies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "movies",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET is not defined" });
  }
  console.log(this);
  const token = jwt.sign(
    { id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return token;
};
const RegisteredUserModel = mongoose.model("Users", UserSchema);

module.exports = RegisteredUserModel;
