const express = require("express");
const cors = require("cors");
const routes = require("./routes.data");
const { ResponseHandler } = require("../../utility/response-handler");

const registerRoutes = (app) => {
  app.use(cors());
  app.use(express.json());

  const API_VERSION_PREFIX = "/api/v1";

  for (let route of routes) {
    app.use(API_VERSION_PREFIX + route.path, route.router);
  }

  app.use((errs, req, res, next) => {
    const err = structuredClone(errs);
    let statusCode = err.statusCode || 500;

    if (err.success) {
      delete err.success;
    }

    if (err.statusCode) {
      delete err.statusCode;
    }

    res
      .status(statusCode || 500)
      .send({ success: false, ...new ResponseHandler(null, err) });
  });
};

module.exports = {
  registerRoutes,
};
