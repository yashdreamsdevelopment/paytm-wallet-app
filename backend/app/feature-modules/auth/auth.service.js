const jwt = require("jsonwebtoken");

// const { JWT_SECRET } = require("../../constants/env.constants");
const userService = require("../user/user.service");
const { USER_RESPONSE } = require("../user/user.response");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const register = async (user) => {
  const existingUser = await userService.get({ userName: user.userName });
  if (existingUser) {
    throw USER_RESPONSE.USER_ALREADYEXISTS;
  }

  const hashedPassword = await userService.createHash(user.password);

  user.password = hashedPassword;

  const createdUser = await userService.create(user);

  const token = generateToken({ userId: createdUser._id });

  return { ...USER_RESPONSE.USER_CREATED, token, userId: createdUser._id };
};

const signin = async (user) => {
  const existingUser = await userService.get({ userName: user.userName });

  if (!existingUser) {
    throw USER_RESPONSE.USER_INVALID;
  }

  const isPasswordValid = await existingUser.validatePassword(user.password);

  if (!isPasswordValid) {
    throw USER_RESPONSE.USER_INVALID;
  }

  const token = generateToken({ userId: existingUser._id });

  return { ...USER_RESPONSE.USER_SIGNEDIN, token };
};

module.exports = {
  register,
  signin,
  verifyToken,
  generateToken,
};
