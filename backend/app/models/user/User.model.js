const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");
const { v4: uuidV4 } = require("uuid");
// const { generateToken } = require("../../feature-modules/auth/auth.service");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  referralCode: {
    type: String,
  },
  referredUsers: [{ type: Schema.ObjectId, ref: "User" }],
});

// userSchema.pre("save", function (next) {
//   if (!this.referralCode) {
//     this.referralCode = uuidV4();
//   }
//   next();
// });

userSchema.post("save", function (res, next) {
  const referralCodeToken = jwt.sign({ referrerUserId: res._id }, JWT_SECRET);
  this.referralCode = referralCodeToken;
  this.save();
  next();
});

userSchema.methods.hashPassword = async (plainTextPassword) => {
  const saltRounds = 10;

  const salt = await genSalt(saltRounds);

  return await hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

const UserModel = model("User", userSchema);

module.exports = UserModel;
