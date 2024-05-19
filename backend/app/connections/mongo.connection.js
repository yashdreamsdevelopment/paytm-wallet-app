const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants/env.constants");

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("CONNECTED TO MONGO");
    return true;
  } catch (error) {
    throw { message: "COULD NOT CONNECT TO MONGO" };
  }
};

module.exports = { connectToMongo };
