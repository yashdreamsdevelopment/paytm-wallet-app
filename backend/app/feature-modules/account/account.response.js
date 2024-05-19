const ACCOUNT_RESPONSE = {
  BALANCE_FETCHED_SUCCESSFULLY: {
    statusCode: 200,
    success: true,
    message: "account balance fetched successfully",
  },
  TRANSFER_SUCCESSFUL: {
    statusCode: 200,
    success: true,
    message: "transfer successful",
  },
  INSUFFICIENT_BALANCE: {
    statusCode: 400,
    success: true,
    message: "insufficient balance",
  },
  ACCOUNT_NOT_FOUND: {
    statusCode: 400,
    success: true,
    message: "invalid account",
  },
};

module.exports = {
  ACCOUNT_RESPONSE,
};
