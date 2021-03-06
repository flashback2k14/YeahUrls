module.exports = (UserModel, CryptoHelper) => {
  function _transformUser(user) {
    return {
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      created: user.createdAt,
      updated: user.updatedAt
    };
  }

  async function getAll() {
    const users = await UserModel.find({}).lean();
    return users.map(this._transformUser);
  }

  async function getById(id) {
    const user = await UserModel.findById(id).lean();
    return this._transformUser(user);
  }

  async function updateById(id, name) {
    const body = { name };
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, { $set: body }, { new: true }).lean();
    return this._transformUser(updatedUser);
  }

  async function changePasswordById(id, body) {
    const { oldPassword, newPassword } = body;
    const foundUser = await UserModel.findById(id);
    if (!foundUser) throw new Error(`No User found for ID: ${id}`);
    if (oldPassword !== CryptoHelper.decrypt(foundUser.passwordHash)) throw new Error("Old Password mismatch.");
    foundUser.passwordHash = CryptoHelper.encrypt(newPassword);
    const updatedUser = await foundUser.save();
    return this._transformUser(updatedUser);
  }

  async function deleteById(id) {
    await UserModel.findByIdAndRemove({ _id: id });
    return { id };
  }

  return {
    _transformUser,
    getAll,
    getById,
    updateById,
    changePasswordById,
    deleteById
  };
};
