const { Schema, model } = require("mongoose");

const referralSchema = new Schema({
  referrerUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referredUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  referralCode: {
    type: String,
  },
});

const ReferralModel = model("Referral", referralSchema);

module.exports = ReferralModel;
