module.exports = (UserModel) => {
  function _transformUser (user) {
    return {
      "id": user._id,
      "name": user.name,
      "isAdmin": user.isAdmin,
      "created": user.createdAt,
      "updated": user.updatedAt 
    }
  }

  async function getAll () {
    const users = await UserModel.find({}).lean();
    return users.map(this._transformUser);
  }

  async function getById (id) {
    const user = await UserModel.findById(id).lean();
    return this._transformUser(user);
  }

  async function updateById (id, name) {
    const body = { name };
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: id, }, { $set: body }, { new: true }).lean();
    return this._transformUser(updatedUser);
  }

  async function deleteById (id) {
    await UserModel.findByIdAndRemove({ _id: id });
    return { id };
  }

  return {
    _transformUser,
    getAll,
    getById,
    updateById,
    deleteById
  }
}
