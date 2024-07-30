const { Router } = require("express");
const { Route } = require("../routes/routes.types");
const { authMiddleware } = require("../auth/auth.middleware");
const { ValidateTransferReq } = require("./account.middleware");
const accountService = require("./account.service");
const { ACCOUNT_RESPONSE } = require("./account.response");
const { ResponseHandler } = require("../../utility/response-handler");

const router = Router();

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
    try {
      const userId = req.userId;
      const { to, amount } = req.body;

      const result = await accountService.performTransfer(userId, to, amount);

      res.status(ACCOUNT_RESPONSE.TRANSFER_SUCCESSFUL.statusCode).send({
        success: true,
        ...new ResponseHandler(ACCOUNT_RESPONSE.TRANSFER_SUCCESSFUL),
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/transactions-history", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId;

    const transactionsListResult = await accountService
      .getTransactions(userId)
      .populate("to", "firstName lastName");

    res.status(ACCOUNT_RESPONSE.TRANSFER_SUCCESSFUL.statusCode).send({
      success: true,
      data: transactionsListResult,
    });
  } catch (err) {
    next(err);
  }
});

const accountRouter = new Route("/account", router);

module.exports = accountRouter;
