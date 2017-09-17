module.exports = (UserModel) => {
  async function getAll () {
    const users = await UserModel.find({}).lean();
    return users;
  }

  async function getById (id) {
    const user = await UserModel.findById(id).lean();
    return user;
  }

  return {
    getAll,
    getById
  }
}