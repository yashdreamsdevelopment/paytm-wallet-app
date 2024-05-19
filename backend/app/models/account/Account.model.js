const { Schema, model } = require("mongoose");

const accountSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const AccountModel = model("Account", accountSchema);

module.exports = AccountModel;
