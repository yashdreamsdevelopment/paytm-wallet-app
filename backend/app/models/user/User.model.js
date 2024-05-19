const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");

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
