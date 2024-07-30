const mongoose = require("mongoose");
const AccountModel = require("../../models/account/Account.model");
const TransactionModel = require("../../models/account/Transaction.model");
const { ACCOUNT_RESPONSE } = require("./account.response");

const create = (accountDetails) => AccountModel.create(accountDetails);

const recordTransaction = (data) => TransactionModel.create(data);

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
    await session.abortTransaction();
    throw ACCOUNT_RESPONSE.ACCOUNT_NOT_FOUND;
  }

  if (fromAccount.balance < amount) {
    await session.abortTransaction();
    throw ACCOUNT_RESPONSE.INSUFFICIENT_BALANCE;
  }

  try {
    await update({ userId }, { $inc: { balance: -amount } }, session);

    await update({ userId: to }, { $inc: { balance: amount } }, session);

    await recordTransaction({
      to: to,
      from: userId,
      amount: amount,
      type: "DR",
    });

    await session.commitTransaction();
    await session.endSession();

    // return true;
    // return;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw err;
  }
};

module.exports = {
  create,
  get,
  update,
  performTransfer,
};
