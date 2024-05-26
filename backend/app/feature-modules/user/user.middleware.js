const {
  signupBodySchema,
  signinBodySchema,
  updateBodySchema,
} = require("./user.validations");
const authService = require("../auth/auth.service");

const ValidateSignupReqFields = (req, res, next) => {
  const validationResp = signupBodySchema.safeParse(req.body);
  const referredByToken = req.query.referredBy || null;

  // console.log("## referredByToken:", referredByToken);

  if (!validationResp.success) {
    const errors = validationResp.error.issues;

    const formattedErrors = errors.map((err) => ({
      message: err.message,
      field: err.path[0],
    }));

    throw { statusCode: 411, formattedErrors };
  }

  if (referredByToken) {
    try {
      const decoded = authService.verifyToken(referredByToken);
      const { referrerUserId } = decoded;
      // console.log("## referrerUserId:", referrerUserId);

      req.referrerUserId = referrerUserId;
      next();
    } catch (err) {
      throw { ...err, message: "Not a valid referrer" };
    }
  } else {
    next();
  }
};

const ValidateSigninReqFields = (req, res, next) => {
  const validationResp = signinBodySchema.safeParse(req.body);

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

const ValidateUpdateReqFields = (req, res, next) => {
  const validationResp = updateBodySchema.safeParse(req.body);

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
  ValidateSignupReqFields,
  ValidateSigninReqFields,
  ValidateUpdateReqFields,
};
