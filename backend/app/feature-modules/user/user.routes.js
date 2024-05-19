const { Router } = require("express");
const { Route } = require("../routes/routes.types");
const {
  ValidateSignupReqFields,
  ValidateSigninReqFields,
  ValidateUpdateReqFields,
} = require("./user.middleware");
const authService = require("../auth/auth.service");
const userService = require("./user.service");
const accountService = require("../account/account.service");
const referralService = require("../referral/referral.service");
const { ResponseHandler } = require("../../utility/response-handler");
const { authMiddleware } = require("../auth/auth.middleware");
const { USER_RESPONSE } = require("./user.response");

const router = Router();

router.get("/health", (req, res, next) => {
  res.status(200).send({ success: true, message: "User Route Health OK" });
});

router.post("/signup", ValidateSignupReqFields, async (req, res, next) => {
  try {
    const user = req.body;
    const referrerUserId = req.referrerUserId;

    let referrerUser = undefined;

    if (referrerUserId) {
      referrerUser = await userService.get({ _id: referrerUserId });

      if (!referrerUser) {
        throw {
          ...USER_RESPONSE.USER_NOT_FOUND,
          message: "not a valid referrer",
        };
      }
    }

    const result = await authService.register(user);

    // creating new account
    const accountDetails = {
      userId: result.userId,
      balance: !referrerUser ? 50 : 100,
    };

    await accountService.create(accountDetails);

    // update the referral db
    if (referrerUser) {
      await referralService.update(
        { referrerUserId: referrerUserId },
        { referredUserId: result.userId }
      );
    }

    res
      .status(result.statusCode)
      .send({ success: true, ...new ResponseHandler(result) });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", ValidateSigninReqFields, async (req, res, next) => {
  try {
    const user = req.body;
    const result = await authService.signin(user);

    res
      .status(result.statusCode)
      .send({ success: true, ...new ResponseHandler(result) });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/",
  ValidateUpdateReqFields,
  authMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.userId;
      const updateData = req.body;

      if (updateData.password) {
        const hashedPassword = await userService.createHash(
          updateData.password
        );
        updateData.password = hashedPassword;
      }

      const result = await userService.update({ _id: userId }, updateData);

      if (result.acknowledged) {
        res.status(USER_RESPONSE.USER_UPDATED.statusCode).send({
          success: true,
          ...new ResponseHandler(USER_RESPONSE.USER_UPDATED),
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get("/bulk", authMiddleware, async (req, res, next) => {
  const filter = req.query.filter || "";

  const users = await userService.search(filter);

  if (!users) {
    throw USER_RESPONSE.USER_NOT_FOUND;
  }

  res.status(200).send({
    success: true,
    results: users.length,
    ...new ResponseHandler(users),
  });
});

router.get("/generateReferral", authMiddleware, async (req, res, next) => {
  // console.log("## GENERATING REFFERRAL ROUTE");
  try {
    const referrerUserId = req.userId;
    // console.log("## referrerUserId:", referrerUserId);

    const referralCode = authService.generateToken({
      referrerUserId: referrerUserId,
    });
    // console.log("## referralCode:", referralCode);

    const referralDetails = {
      referrerUserId,
      referralCode,
    };
    // console.log("## referralDetails:", referralDetails);

    const result = await referralService.create(referralDetails);

    // console.log("## result:", result);
    const referralLink = `http://localhost:3000/api/v1/user/signin?referredBy=${referralCode}`;
    res.status(200).send({
      success: true,
      message: "Referral router ok",
      referralCode,
      link: referralLink,
    });
  } catch (err) {
    // console.log("## FOUND AN ERROR");
    next(err);
  }

  // console.log(first);
});

const userRouter = new Route("/user", router);

module.exports = userRouter;