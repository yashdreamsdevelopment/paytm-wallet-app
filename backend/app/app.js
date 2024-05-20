const express = require("express");
// const { PORT } = require("./constants/env.constants");
const { connectToMongo } = require("./connections/mongo.connection");
const { registerRoutes } = require("./feature-modules/routes/routes");

const startServer = async () => {
  try {
    const app = express();
    const PORT = process.env.PORT;

    // connect to mongo
    await connectToMongo(process.env.MONGO_URI);

    // registration of routes
    registerRoutes(app);

    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
  } catch (error) {
    console.log("COULD NOT START THE SERVER");
    console.log("ERROR:", error);
  }
};

module.exports = { startServer };
