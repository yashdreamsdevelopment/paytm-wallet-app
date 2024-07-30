const Mongoose = require("mongoose");

const referralSchema = new Mongoose.Schema({
  referrerUserId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referredUserId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
  },
  referralCode: {
    type: String,
  },
});

const ReferralModel = Mongoose.model("Referral", referralSchema);

module.exports = ReferralModel;
