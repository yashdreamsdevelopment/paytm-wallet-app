const { Router } = require("express");
const { Route } = require("../routes/routes.types");
const { authMiddleware } = require("../auth/auth.middleware");
const { ValidateTransferReq } = require("./account.middleware");
const accountService = require("./account.service");
const { ACCOUNT_RESPONSE } = require("./account.response");
const { ResponseHandler } = require("../../utility/response-handler");

const router = Router();

let transactionNo = 1;

router.get("/health", authMiddleware, (req, res) => {
  res.status(200).send({ message: "Account router health OK" });
});

router.get("/balance", authMiddleware, async (req, res, next) => {
  try {
    const result = await accountService.get({ userId: req.userId });

    res.status(ACCOUNT_RESPONSE.BALANCE_FETCHED_SUCCESSFULLY.statusCode).send({
      success: true,
      ...new ResponseHandler({
        ...ACCOUNT_RESPONSE.BALANCE_FETCHED_SUCCESSFULLY,
        balance: result.balance,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/transfer",
  authMiddleware,
  ValidateTransferReq,
  async (req, res, next) => {
    console.log("## Transfer initiated...");
    try {
      const userId = req.userId;
      const { to, amount } = req.body;

      // const account = await accountService.get({ userId });

      // if (!account || account.balance < amount) {
      //   throw ACCOUNT_RESPONSE.INSUFFICIENT_BALANCE;
      // }

      // const toAccount = await accountService.get({ userId: to });

      // if (!toAccount) {
      //   throw { ...ACCOUNT_RESPONSE.ACCOUNT_NOT_FOUND };
      // }
      console.log("-----------------------------");
      console.log("## TRANSACTION NO:", transactionNo++);

      const result = await accountService.performTransfer(userId, to, amount);

      // console.log("## result:", result);
      console.log("-----------------------------");

      // // performing transfer
      // await accountService.update({ userId }, { $inc: { balance: -amount } });
      // await accountService.update(
      //   { userId: to },
      //   { $inc: { balance: amount } }
      // );

      res.status(ACCOUNT_RESPONSE.TRANSFER_SUCCESSFUL.statusCode).send({
        success: true,
        ...new ResponseHandler(ACCOUNT_RESPONSE.TRANSFER_SUCCESSFUL),
      });
    } catch (err) {
      // TODO: FIXME: transaction is successfull still error
      console.log("## error: ", err);
      next(err);
    } finally {
      console.log("## Transfer ended...");
    }
  }
);

const accountRouter = new Route("/account", router);

module.exports = accountRouter;
