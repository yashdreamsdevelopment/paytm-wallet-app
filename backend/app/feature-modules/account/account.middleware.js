const { transferBodySchema } = require("./account.validations");

const ValidateTransferReq = (req, res, next) => {
  const validationResp = transferBodySchema.safeParse(req.body);

  if (!validationResp.success) {
    const errors = validationResp.error.issues;

    const formattedErrors = errors.map((err) => ({
      message: err.message,
      field: err.path[0],
    }));

    throw { statusCode: 411, formattedErrors };
  }

  next();
};

module.exports = {
  ValidateTransferReq,
};
