const UserModel = require("../../models/user/User.model");

const create = (user) => UserModel.create(user);

const createHash = (plainTextPassword) =>
  UserModel().hashPassword(plainTextPassword);

const get = (filter) => UserModel.findOne(filter);

const getReferredUsers = (filter) =>
  UserModel.findOne(filter).populate("referredUsers");

const update = (filter, updateData) => UserModel.updateOne(filter, updateData);

const search = (filter) =>
  UserModel.find(
    {
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    },
    { password: false }
  );

module.exports = {
  create,
  createHash,
  get,
  update,
  search,
  getReferredUsers,
};
