const mongoose = require("mongoose");

const connectToMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("CONNECTED TO MONGO");
    return true;
  } catch (error) {
    throw { message: "COULD NOT CONNECT TO MONGO" };
  }
};

module.exports = { connectToMongo };
