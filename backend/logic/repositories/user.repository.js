module.exports = (UserModel) => {
  getAll = async () => {
    const users = await UserModel.find({});
    return users;
  }

  getById = async (id) => {
    const user = await UserModel.findById(id);
    return user;
  }

  return {
    getAll,
    getById
  }
}