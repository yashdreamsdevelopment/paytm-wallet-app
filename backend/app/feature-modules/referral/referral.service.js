const ReferralModel = require("../../models/referral/Referral.model");

const create = (referralData) => {
  //   console.log("## referral Data:", referralData);
  return ReferralModel.create(referralData);
};

const get = (filter) => ReferralModel.findOne(filter);

const update = (filter, updatedData) =>
  ReferralModel.updateOne(filter, updatedData, { new: true });

module.exports = {
  create,
  update,
  get,
};
