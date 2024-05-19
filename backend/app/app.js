const express = require("express");
const { PORT } = require("./constants/env.constants");
const { connectToMongo } = require("./connections/mongo.connection");
const { registerRoutes } = require("./feature-modules/routes/routes");

const startServer = async () => {
  try {
    const app = express();

    // connect to mongo
    await connectToMongo();

    // registration of routes
    registerRoutes(app);

    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
  } catch (error) {
    console.log("COULD NOT START THE SERVER");
    console.log("ERROR:", error);
  }
};

module.exports = { startServer };
