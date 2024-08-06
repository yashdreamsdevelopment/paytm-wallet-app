const ReferralModel = require("../../models/referral/Referral.model");

const create = (referralData) => {
  return ReferralModel.create(referralData);
};

const get = (filter) => ReferralModel.findOne(filter);

const getAll = (filter) => ReferralModel.find(filter);

const update = (filter, updatedData) =>
  ReferralModel.updateOne(filter, updatedData, { new: true });

const getUserReferrals = (filter) =>
  ReferralModel.find(filter).populate("referredUserId", "firstName lastName");

module.exports = {
  create,
  update,
  get,
  getAll,
  getUserReferrals,
};
