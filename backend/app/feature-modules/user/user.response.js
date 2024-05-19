const USER_RESPONSE = {
  USER_ALREADYEXISTS: {
    statusCode: 409,
    success: false,
    message: "user already registered",
  },
  USER_CREATED: {
    statusCode: 201,
    success: true,
    message: "user created successfully",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    success: false,
    message: "no such user found",
  },
  USER_INVALID: {
    statusCode: 401,
    success: false,
    message: "invalid credentials",
  },
  USER_SIGNEDIN: {
    statusCode: 200,
    success: true,
    message: "user signed in successfully",
  },
  USER_UPDATED: {
    statusCode: 200,
    success: true,
    message: "user information updated successfully",
  },
};

module.exports = {
  USER_RESPONSE,
};
