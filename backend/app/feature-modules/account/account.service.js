const mongoose = require("mongoose");
const AccountModel = require("../../models/account/Account.model");
const { ACCOUNT_RESPONSE } = require("./account.response");

const create = (accountDetails) => AccountModel.create(accountDetails);

const get = (filter) => AccountModel.findOne(filter);

const update = (filter, operation, session) => {
  if (!session) {
    return AccountModel.updateOne(filter, operation);
  }
  return AccountModel.updateOne(filter, operation).session(session);
};

const performTransfer = async (userId, to, amount) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const fromAccount = await get({ userId });
  const toAccount = await get({ userId: to });

  if (!fromAccount || !toAccount) {
    console.log("## Account doesn't exists");
    await session.abortTransaction();
    throw ACCOUNT_RESPONSE.ACCOUNT_NOT_FOUND;
  }

  if (fromAccount.balance < amount) {
    console.log("## Low Balance");
    await session.abortTransaction();
    throw ACCOUNT_RESPONSE.INSUFFICIENT_BALANCE;
  }

  try {
    await update({ userId }, { $inc: { balance: -amount } }, session);
    console.log("## 1ST USER DEBITED...");

    await update({ userId: to }, { $inc: { balance: amount } }, session);
    console.log("## 2ND USER CREDITED...");

    await session.commitTransaction();
    await session.endSession();

    // return;
  } catch (err) {
    console.log("##$$ err:", err);
    await session.abortTransaction();
    await session.endSession();

    throw { ...err, m: "jaa na laude" };
  }
  // finally {
  //   await session.endSession();
  // }
};

module.exports = {
  create,
  get,
  update,
  performTransfer,
};
