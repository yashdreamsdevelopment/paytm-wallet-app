const zod = require("zod");
const { Schema } = require("mongoose");

const transferBodySchema = zod
  .object({
    amount: zod.number(),
    to: zod.string().regex(/^[0-9a-fA-F]{24}$/),
  })
  .required();

module.exports = {
  transferBodySchema,
};
