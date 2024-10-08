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
const mongoose = require("mongoose");

const router = Router();

router.get("/health", (req, res, next) => {
  res.status(200).send({ success: true, message: "User Route Health OK" });
});

router.post("/signup", ValidateSignupReqFields, async (req, res, next) => {
  try {
    const user = req.body;
    const referrerUserId = req.referrerUserId;
    // const referralId = req.referralId;

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
      referrerUser.referredUsers.push(result.userId);

      await referrerUser.save();

      await accountService.update(
        { userId: referrerUserId },
        { $inc: { balance: 100 } }
      );

      result["message"] =
        "Your Referral amount credited to your account successfully";
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
  const userId = req.userId;

  const users = await userService.search(filter);

  if (!users) {
    throw USER_RESPONSE.USER_NOT_FOUND;
  }

  const filteredUsers = users.filter((user) => {
    if (!user._id.equals(userId)) {
      return user;
    }
  });

  res.status(200).send({
    success: true,
    results: users.length,
    ...new ResponseHandler(filteredUsers),
  });
});

router.get("/generateReferral", authMiddleware, async (req, res, next) => {
  try {
    const referrerUserId = req.userId;

    const referralCode = authService.generateToken({
      referrerUserId: referrerUserId,
    });

    const referralDetails = {
      referrerUserId,
      referralCode,
    };

    const result = await referralService.create(referralDetails);

    const referralLink = `http://localhost:3000/api/v1/user/signin?referredBy=${referralCode}&referralId=${result._id}`;
    res.status(200).send({
      success: true,
      message: "Referral router ok",
      referralCode,
      referralId: result._id,
      link: referralLink,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/referrals", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await userService.getReferredUsers({ _id: userId });

    res.status(200).send({
      success: true,
      ...new ResponseHandler(result),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", authMiddleware, async (req, res, next) => {
  const userId = req.params.userId || "";

  try {
    const result = await userService.get({ _id: userId });

    if (!result) {
      throw USER_RESPONSE.USER_INVALID;
    }

    res.status(200).send({ success: true, ...new ResponseHandler(result) });
  } catch (err) {
    next(err);
  }
});

const userRouter = new Route("/user", router);

module.exports = userRouter;
