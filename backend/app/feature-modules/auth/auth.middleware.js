const { AUTH_RESPONSE } = require("./auth.response");
const authService = require("./auth.service");

const authMiddleware = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken || !authToken.startsWith("Bearer")) {
    throw AUTH_RESPONSE.TOKEN_MISSING;
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = authService.verifyToken(token);
    req.userId = decoded.userId;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authMiddleware,
};
